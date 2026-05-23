import React, { useState, useEffect } from "react";
import { useCart } from "../components/cart/cart";
import { useNavigate } from "react-router-dom";
import "../styles/checkout.css";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Receipt from "../components/receipt/Receipt";
import { useAuth } from "../components/authModel/auth";
import { supabase } from "../supabaseClient";

export default function Checkout() {
  const { cart, totalPrice, updateQuantity, removeItem } = useCart();
  const { user, openAuthModel } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // 從 Supabase 抓商品資料，用來對照 cart 裡的 product_id
  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase.from("products").select("*");
      if (data) setProducts(data);
    }
    fetchProducts();
  }, []);

  // 把 cart 的 id 對照到完整商品資料
  const cartWithDetails = cart.map((item) => {
    const product = products.find((p) => p.id === item.id);
    return {
      ...item,
      name: product?.name ?? "載入中...",
      price: product?.price ?? 0,
      image: product?.image ?? "",
    };
  });

  const computedTotalPrice = cartWithDetails.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  const handleDecrease = (item) => {
    if (item.quantity - 1 === 0) {
      const confirmed = window.confirm(`確定要移除「${item.name}」嗎？`);
      if (confirmed) removeItem(item.id);
    } else {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleDownloadReceipt = () => {
    if (!user) {
      openAuthModel(generatePDF);
      return;
    }
    generatePDF();
  };

  const generatePDF = async () => {
    const orderNumber = `GL-${Date.now()}`;
    document.getElementById("receiptOrderNum").innerText = `訂單編號：${orderNumber}`;
    const target = document.getElementById("receiptTarget");
    const canvas = await html2canvas(target, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgWidth = 170;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 20, 20, imgWidth, imgHeight);
    pdf.save(`古林萃室_訂單_${orderNumber}.pdf`);
  };

  return (
    <div id="BG_checkout" className="normalPageContainer BG_normalPage tab-page container-fluid p-0">
      <div style={{ textAlign: "center" }}><h3>購買總覽<hr /></h3></div>
      <div id="cartList">
        {cartWithDetails.length === 0 ? (
          <div className="d-flex flex-column align-items-center gap-1">
            <p>尚無商品</p>
            <button className="btn_cko" onClick={() => navigate("/products")}>繼續選購</button>
            <button className="btn_cko" onClick={() => navigate("/home")}>回到首頁</button>
          </div>
        ) : (
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
                    <button onClick={() => handleDecrease(item)}>
                      <i className="bi bi-dash"></i>
                    </button>
                    {item.quantity}
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
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
      <div className="cartTotal">
        <span>合計：{computedTotalPrice} 元</span>
      </div>
      {cartWithDetails.length > 0 && (
        <button className="btn_cko" style={{ marginTop: "1rem" }} onClick={handleDownloadReceipt}>
          下載收據
        </button>
      )}
      <Receipt cart={cartWithDetails} totalPrice={computedTotalPrice} />
    </div>
  );
}