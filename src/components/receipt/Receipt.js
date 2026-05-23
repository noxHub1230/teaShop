import React from "react";
import logo from "../../material/logo.png";

export default function Receipt({ cart, totalPrice ,user}) {
  return (
    <div id="receiptTarget"
      style={{
        position: "fixed",
        left: "-9999px",
        top: 0,
        background: "white",
        padding: "2rem",
        width: "600px",
        fontFamily: "LXGW WenKai TC",
      }}>

      <img
        src={logo}
        alt="古林萃室"
        style={{
            display: "block",
            margin: "0 auto 0.5rem auto",
            filter: "grayscale(100%)",
            width: "200px",       // 視 logo.png 的比例調整
            objectFit: "contain",
        }}
        />
      <hr />
      <p id="receiptOrderNum" style={{ fontSize: "0.9rem" }}></p>
        {user && (
          <>
            <p style={{ fontSize: "0.9rem" }}>
              帳戶名稱：{user.user_metadata?.display_name ?? "未設定"}
            </p>
            <p style={{ fontSize: "0.9rem" }}>
              帳號：{user.email}
            </p>
          </>
        )}
      <p style={{ fontSize: "0.9rem" }}>
        訂購日期：{new Date().toLocaleDateString("zh-TW")}
      </p>
      <hr />

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid black" }}>
            <th style={{ textAlign: "left", padding: "0.5rem" }}>品名</th>
            <th style={{ textAlign: "right", padding: "0.5rem" }}>單價</th>
            <th style={{ textAlign: "center", padding: "0.5rem" }}>數量</th>
            <th style={{ textAlign: "right", padding: "0.5rem" }}>小計</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "0.5rem" }}>{item.name}</td>
              <td style={{ textAlign: "right", padding: "0.5rem" }}>{item.price}</td>
              <td style={{ textAlign: "center", padding: "0.5rem" }}>{item.quantity}</td>
              <td style={{ textAlign: "right", padding: "0.5rem" }}>{item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr style={{ marginTop: "1rem" }} />
      <p style={{ textAlign: "right", fontSize: "1.1rem", fontWeight: "bold" }}>
        合計：{totalPrice} 元
      </p>
    </div>
  );
}