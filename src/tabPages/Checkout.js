import React, { useState, useEffect } from "react";
import { useCart } from "../components/cart/cart";
import { useNavigate } from "react-router-dom";
import "../styles/checkout.css";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Receipt from "../components/receipt/Receipt";
import { useAuth } from "../components/authModel/auth";
import { supabase } from "../supabaseClient";
import { insertOrderHistory } from "../components/order/orderAPI";

export default function Checkout() {
  // ── 取得購物車相關操作方法 ──────────────────────────────────────────────────
  const { cart, updateQuantity, removeItem, clearCartAll } = useCart();

  // ── 取得登入使用者資訊與 Token ──────────────────────────────────────────────
  const { user, openAuthModel, accessToken } = useAuth();

  // ── React Router 導頁工具 ───────────────────────────────────────────────────
  const navigate = useNavigate();

  // ── 從 Supabase 取得的完整商品列表 ────────────────────────────────────────
  const [products, setProducts] = useState([]);

  // ── 訂單送出流程的狀態管理 ────────────────────────────────────────────────
  // orderSuccess：是否已成功送出訂單（控制顯示成功畫面）
  // orderNumber：本次訂單編號，送出後保留供下載收據使用
  // isSubmitting：防止使用者重複點擊送出
  // confirmRemove：要求確認刪除的商品（取代 window.confirm）
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(null);

  // ── 訂單明細快照：在清空購物車前先保存，供成功畫面顯示用 ────────────────
  const [orderSnapshot, setOrderSnapshot] = useState([]);
  const [snapshotTotal, setSnapshotTotal] = useState(0);

  // ── 頁面載入時從 Supabase 抓取所有商品資料 ────────────────────────────────
  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase.from("products").select("*");
      if (data) setProducts(data);
    }
    fetchProducts();
  }, []);

  // ── 將購物車 id 對照到完整商品資料（名稱、價格、圖片） ──────────────────
  const cartWithDetails = cart.map((item) => {
    const product = products.find((p) => p.id === item.id);
    return {
      ...item,
      name: product?.name ?? "載入中...",
      price: product?.price ?? 0,
      image: product?.image ?? "",
    };
  });

  // ── 計算購物車所有品項的合計金額 ──────────────────────────────────────────
  const computedTotalPrice = cartWithDetails.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ── 處理數量減少：若減到 0 則改用自訂 Modal 確認是否移除 ──────────────────
  // 原本使用 window.confirm，在 iOS Safari / WKWebView 中可能被靜默攔截，
  // 改用 React state 控制的確認對話框，相容性更佳。
  const handleDecrease = (item) => {
    if (item.quantity - 1 === 0) {
      // 記錄要確認移除的商品，觸發 Modal 顯示
      setConfirmRemove(item);
    } else {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  // ── 確認移除商品（Modal 確認按鈕觸發） ───────────────────────────────────
  const handleConfirmRemove = () => {
    if (confirmRemove) {
      removeItem(confirmRemove.id);
      setConfirmRemove(null);
    }
  };

  // ── 步驟一：送出訂單 ──────────────────────────────────────────────────────
  // 職責：驗證登入、寫入 Supabase、清空購物車、記錄訂單編號
  // 刻意不在此處產生或下載 PDF，避免非同步操作後觸發下載被 Safari 攔截。
  const handleSubmitOrder = async () => {
    // 未登入時先開啟登入 Modal，登入成功後再重新呼叫此函式
    if (!user) {
      openAuthModel(handleSubmitOrder);
      return;
    }

    // 防止重複送出
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // 產生唯一訂單編號
      const newOrderNumber = `GL-${Date.now()}`;

      // 整理要寫入 Supabase 的訂單明細
      const orderItems = cartWithDetails.map((item) => ({
        product_id: item.id,
        product_name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      // 將訂單紀錄寫入 Supabase
      await insertOrderHistory(
        accessToken,
        user.id,
        newOrderNumber,
        computedTotalPrice,
        orderItems
      );

      // 在切換畫面前先將購物車明細與合計快照起來，
      // 確保成功畫面的訂單明細表格有資料可以顯示
      setOrderSnapshot([...cartWithDetails]);
      setSnapshotTotal(computedTotalPrice);

      // 保存訂單編號以便後續下載收據時使用
      setOrderNumber(newOrderNumber);

      // 切換到「訂單成功」畫面（購物車尚未清空，Receipt 元件仍可截圖）
      setOrderSuccess(true);
      // clearCartAll() 改由下方 useEffect 在成功畫面渲染完後執行
    } catch (error) {
      // 寫入失敗時提示使用者，不影響下載邏輯
      console.error("訂單送出失敗：", error);
      alert("訂單送出失敗，請稍後再試。");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── 訂單成功畫面渲染完成後，才清空購物車 ────────────────────────────────
  // 時間點：orderSuccess 變為 true → React 重新渲染成功畫面（含明細快照）→
  // useEffect 執行 → clearCartAll()
  // 這樣可確保訂單明細輸出完畢後購物車才被清空，
  // Receipt 元件在此之前也仍持有原始 cart 資料可供截圖。
  useEffect(() => {
    if (orderSuccess) {
      clearCartAll();
    }
  }, [orderSuccess]);

  // ── 步驟二：下載收據 PDF ──────────────────────────────────────────────────
  // 此函式由使用者「直接點擊按鈕」觸發，屬於 synchronous user gesture，
  // Safari 不會攔截此時發起的下載行為。
  // html2canvas 仍是非同步，但因為 iOS 14+ 對 async click handler 已改善，
  // 加上這是獨立按鈕（非夾在其他非同步操作之後），相容性大幅提升。
  const handleDownloadReceipt = async () => {
    // 更新收據上顯示的訂單編號
    const receiptNumEl = document.getElementById("receiptOrderNum");
    if (receiptNumEl) {
      receiptNumEl.innerText = `訂單編號：${orderNumber}`;
    }

    // 將收據 DOM 元素截圖轉換為 canvas（scale: 2 提高解析度）
    const target = document.getElementById("receiptTarget");
    const canvas = await html2canvas(target, { scale: 2 });

    // 將 canvas 轉為 PNG base64 圖片資料
    const imgData = canvas.toDataURL("image/png");

    // 建立 PDF 並將收據圖片放入
    const pdf = new jsPDF();
    const imgWidth = 170;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 20, 20, imgWidth, imgHeight);

    // 觸發 PDF 下載
    pdf.save(`古林萃室_訂單_${orderNumber}.pdf`);
  };

  // ── 訂單送出成功後顯示的畫面 ─────────────────────────────────────────────
  if (orderSuccess) {
    return (
      <div
        id="BG_checkout"
        className="normalPageContainer BG_normalPage tab-page container-fluid p-0"
      >
        {/* 成功提示區塊 */}
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h3>訂單已送出</h3>
          <p>訂單編號：{orderNumber}</p>
          {/* 訂單內容明細：使用快照資料，不受後續購物車清空影響 */}
          <div style={{ margin: "1rem 0", textAlign: "center", display: "inline-block", minWidth: "260px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ borderBottom: "1px solid #ccc", padding: "4px 8px" }}>品名</th>
                  <th style={{ borderBottom: "1px solid #ccc", padding: "4px 8px" }}>數量</th>
                  <th style={{ borderBottom: "1px solid #ccc", padding: "4px 8px" }}>小計</th>
                </tr>
              </thead>
              <tbody>
                {orderSnapshot.map((item) => (
                  <tr key={item.id}>
                    <td style={{ padding: "4px 8px" }}>{item.name}</td>
                    <td style={{ padding: "4px 8px", textAlign: "center" }}>{item.quantity}</td>
                    <td style={{ padding: "4px 8px", textAlign: "right" }}>{item.price * item.quantity} 元</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2} style={{ borderTop: "1px solid #ccc", padding: "6px 8px", fontWeight: "bold" }}>合計</td>
                  <td style={{ borderTop: "1px solid #ccc", padding: "6px 8px", textAlign: "right", fontWeight: "bold" }}>{snapshotTotal} 元</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div style={{display:"flex",flexDirection:"column"}}>
          {/* 步驟二按鈕：使用者主動點擊觸發下載，符合 Safari User Gesture 要求 */}
          <button className="btn_cko" onClick={handleDownloadReceipt}>
            下載收據 PDF
          </button>

          {/* 導回首頁 */}
          <button
            className="btn_cko"
            style={{ marginTop: "0.5rem" }}
            onClick={() => navigate("/home")}
          >
            回到首頁
          </button>
          </div>
        </div>

        {/* Receipt 元件仍需渲染在 DOM 中，html2canvas 才能截圖 */}
        <Receipt
          cart={cartWithDetails}
          totalPrice={computedTotalPrice}
          user={user}
        />
      </div>
    );
  }

  // ── 主要購物車畫面 ────────────────────────────────────────────────────────
  return (
    <div
      id="BG_checkout"
      className="normalPageContainer BG_normalPage tab-page container-fluid p-0"
    >
      {/* 頁面標題 */}
      <div style={{ textAlign: "center" }}>
        <h3>
          購買總覽<hr />
        </h3>
      </div>

      {/* ── 自訂確認移除 Modal（取代 window.confirm） ── */}
      {confirmRemove && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "8px",
              padding: "1.5rem 2rem",
              textAlign: "center",
              minWidth: "260px",
            }}
          >
            <p>確定要移除「{confirmRemove.name}」嗎？</p>
            <button className="btn_cko" onClick={handleConfirmRemove}>
              確定移除
            </button>
            <button
              className="btn_cko"
              style={{ marginLeft: "0.5rem" }}
              onClick={() => setConfirmRemove(null)}
            >
              取消
            </button>
          </div>
        </div>
      )}

      {/* ── 購物車內容區 ── */}
      <div id="cartList">
        {cartWithDetails.length === 0 ? (
          // 購物車為空時顯示導覽按鈕
          <div className="d-flex flex-column align-items-center gap-1">
            <p>尚無商品</p>
            <button className="btn_cko" onClick={() => navigate("/products")}>
              繼續選購
            </button>
            <button className="btn_cko" onClick={() => navigate("/home")}>
              回到首頁
            </button>
          </div>
        ) : (
          // 購物車商品列表
          <table id="cartTable">
            <thead>
              <tr>
                <th>品名</th>
                <th>單價</th>
                <th>數量</th>
                <th>總額</th>
              </tr>
            </thead>
            <tbody>
              {cartWithDetails.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td className="qtyCell">
                    {/* 數量減少按鈕：減到 0 時觸發自訂確認 Modal */}
                    <button onClick={() => handleDecrease(item)}>
                      <i className="bi bi-dash"></i>
                    </button>
                    {item.quantity}
                    {/* 數量增加按鈕 */}
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </td>
                  <td>{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 合計金額顯示 */}
      <div className="cartTotal">
        <span>合計：{computedTotalPrice} 元</span>
      </div>

      {/* 步驟一按鈕：送出訂單（不下載 PDF） */}
      {cartWithDetails.length > 0 && (
        <button
          className="btn_cko"
          style={{ marginTop: "1rem" }}
          onClick={handleSubmitOrder}
          disabled={isSubmitting}
        >
          {isSubmitting ? "送出中..." : "送出訂單"}
        </button>
      )}

      {/* Receipt 元件：平時隱藏在 DOM 中，供 html2canvas 截圖使用 */}
      <Receipt
        cart={cartWithDetails}
        totalPrice={computedTotalPrice}
        user={user}
      />
    </div>
  );
}