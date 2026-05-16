import React from "react";
import { useCart } from "../components/cart/cart";
import { Link } from "react-router-dom";
import "../styles/checkout.css"

export default function Cart() {
  const { cart, totalPrice } = useCart();


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
            {cart.map(item => (
            <div key={item.id} className="cartItem">
                <span>{item.name}</span>
                <span>x{item.quantity}</span>
                <span>{item.price * item.quantity} 元</span>
            </div>
            ))}
        </>
        )}
        <div className="cartTotal">
            合計：{totalPrice} 元
        </div>
      </div>
    </div>
  );
}