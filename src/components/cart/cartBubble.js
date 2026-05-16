import React from "react";
import "./cartBubble.css";
import {useCart} from "./cart";
import {useNavigate} from "react-router-dom";

export default function CartBubble(){
  const {cart}=useCart();
  const navigate=useNavigate();
  const totalItems=cart.reduce((sum,item)=>sum+item.quantity,0);
 
return(
      <button id="cartBubble"
      onClick={()=>{navigate("/checkout")}}
      style={totalItems===0?{display:"hidden"}:{display:"inline-block"}}
      >
        <i className="bi bi-cart4"></i>
        {totalItems>0&&(<span id="cartCount">{totalItems}</span>)}
      </button>);
};