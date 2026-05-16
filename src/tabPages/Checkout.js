import React from "react";
import { useCart } from "../components/cart/cart";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="tab-page container-fluid p-0">
        <p>購物車是空的</p>
        <Link to="/products">繼續選購</Link>
      </div>
    );
  }

  return (
    <div className="tab-page container-fluid p-0">
      <div id="content_cart">
        {cart.map(item => (
          <div key={item.id} className="cartItem">
            <img src={item.image} alt={item.name} />
            <span>{item.name}</span>
            <span>x{item.quantity}</span>
            <span>{item.price * item.quantity} 元</span>
          </div>
        ))}
        <div className="cartTotal">
          合計：{totalPrice} 元
        </div>
      </div>
    </div>
  );
}