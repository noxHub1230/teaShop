import React, { useEffect, useState } from 'react';
import "../styles/productDetail.css";
import { useParams } from 'react-router-dom';
import { products } from"../data/data_products";


export default function ProductDetail() {
  const [quantity,setQuantity]=useState(1);
  const {id}=useParams();
  
  const product=products.find((item)=>item.id===Number(id));
  const productImages=product?[product.image,...product.detailImages]:[];
  const [pickedImage,setPickedImage]=useState(null);
  
  const currentIndex = productImages.indexOf(pickedImage); 
  const pickPreviousImage = () => {
    const previousIndex =
      currentIndex === 0 ? productImages.length - 1 : currentIndex - 1;
    setPickedImage(productImages[previousIndex]);
  };
  const pickNextImage = () => {
    const nextIndex =
      currentIndex === productImages.length - 1 ? 0 : currentIndex + 1;
    setPickedImage(productImages[nextIndex]);
  };
  
  useEffect(()=>{
    setPickedImage(productImages[0]);
  },[product]);

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
            <div id="nav_productCarousel">
              <button className="carouselArrow_pD"
               type="button"
               onClick={pickPreviousImage}>↑</button>
              <div className="thumbList_pD">
                {productImages.map((image,index)=>(
                  <button key={image}
                  type="button"
                  className={`thumb_pD ${image === pickedImage ? "thumb_pD_active" : ""}`}
                  onClick={()=>setPickedImage(image)}
                  style={{backgroundImage:`url(${image})`}}
                  aria-label={`查看商品圖片 ${index + 1}`}>
                  </button>
                ))}
              </div>
              <button className="carouselArrow_pD"
               type="button"
               onClick={pickNextImage}>↓</button>
            </div>
            <div id="pickedImg_productCarousel"
            style={{backgroundImage:`url(${pickedImage})`}}></div>
          </div>
          <div id="productInfo">
            <h1>{product.name}</h1>
            <p>{product.subtitle}</p>
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
