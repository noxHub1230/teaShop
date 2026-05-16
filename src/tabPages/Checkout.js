import React from "react";
import { useCart } from "../components/cart/cart";
import { Link } from "react-router-dom";
import "../styles/checkout.css"

export default function Cart() {
  const { cart, totalPrice,updateQuantity,removeItem } = useCart();

    const handleDecrease = (item) => {
    if (item.quantity - 1 === 0) {
      const confirmed = window.confirm(`確定要移除「${item.name}」嗎？`);
      if (confirmed) removeItem(item.id);
    } else {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div id="BG_checkout" className="tab-page container-fluid p-0">
        <div style={{textAlign:"center"}}><h3>購買總覽<hr/></h3></div>
        <div id="cartList">
            {cart.length === 0 ? (
            <>
                <p>購物車是空的</p>
                <Link to="/products">繼續選購</Link>
            </>
            ) : (
            <>
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
                {cart.map((item) => (
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
            </>
            )}
        </div>
        <div className="cartTotal">
            合計：{totalPrice} 元
        </div>
    </div>
  );
}