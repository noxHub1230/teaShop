import React, { useState } from 'react';
import "../styles/productDetail.css";
import { useParams } from 'react-router-dom';
import { products } from"../data/data_products";


export default function ProductDetail() {
  const [quantity,setQuantity]=useState(1);
  const {id}=useParams();
  const product=products.find((item)=>item.id===Number(id));
  if (!product) {
  return (
    <div className="tab-page container-fluid p-0">
      <div id="BG_productDetail" className="py-4">
        <p>找不到商品</p>
      </div>
    </div>
  );
  }
  return (
    <div className="tab-page container-fluid p-0">
      <div id="BG_productDetail" className='py-4'>
        <div id="content_productDetail">
          <div id="productCarousel">
            <img src={product.image} alt={product.name}/>
          </div>
          <div id="productInfo">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <span>{product.price}</span>
            <div className="productActions">
              <div className="quantityCtrl">
                <button onClick={()=>setQuantity((q)=>Math.max(1,q-1))}>-</button>
                <p>
                {quantity}
                </p>
                <button onClick={()=>setQuantity(q=>q+1)}>+</button>
              </div>
              <button>加入購物車</button>
              {/* 購物車的懸浮泡泡預計會寫在App.js裡 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
