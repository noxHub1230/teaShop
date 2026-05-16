import React, { useEffect, useState } from 'react';
import "../styles/productDetail.css";
import { Link,useParams } from 'react-router-dom';
import ReactMarkdown from "react-markdown";
import { products } from"../data/data_products";
import { gsap, ScrollTrigger } from "./gsapSetup";
import { navItems } from "../data/data_basic";
import {useCart} from "../components/cart/cart";


export default function ProductDetail() {
  const{addToCart}=useCart();

  const productsPage=navItems.find((item)=>item.tabName==="products");
  const productsPageLabel = productsPage ? productsPage.label : "Products";
  
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
  useEffect(() => {
    const ani = gsap.fromTo(
      ".productIntroImg_pD",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, 
        scrollTrigger:{
          trigger:"#productOperate",
          start: "bottom 60%",  
          end:"bottom top",
          scrub:true
        }
      }
    );
    return()=>{
      if(ani.scrollTrigger){ani.scrollTrigger.kill();}
      ani.kill();
    };
  }, [product]);


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
          <div aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link className="breadcrumbLink" to="/products">
                {productsPageLabel}</Link>
              </li>
              <li className="breadcrumb-item active"
              aria-current="page">
                {product.name}
              </li>
            </ol>
          </div>
          <div id="productOperate">
            <div id="productCarousel">
              <div id="nav_productCarousel">
                <button className="carouselArrow_pD pre"
                type="button"
                onClick={pickPreviousImage}>
                  <i className="bi bi-arrow-up-short"></i>
                </button>
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
                <button className="carouselArrow_pD nxt"
                type="button"
                onClick={pickNextImage}>
                  <i className="bi bi-arrow-down-short"></i>
                </button>
              </div>
              <div id="pickedImg_productCarousel"
              style={{backgroundImage:`url(${pickedImage})`}}></div>
            </div>
            <div id="productInfo">
              <h1>{product.name}</h1>
              <p>{product.subtitle}</p>
              <div style={{display:"flex",flexDirection:"row",gap:"10px"}}>
              {product.filter.map((tag,index)=>(
                <span className="badge">{tag}</span>
              ))}
              </div>
              <span id="productPrice">{product.price}元</span>
              <div className="productActions">
                <div className="quantityCtrl">
                  <button onClick={()=>setQuantity((q)=>Math.max(1,q-1))}>
                    <i className="bi bi-dash"></i>
                  </button>
                  <p>
                  {quantity}
                  </p>
                  <button onClick={()=>setQuantity(q=>q+1)}>
                    <i className="bi bi-plus"></i>
                  </button>
                </div>
                <button
                onClick={()=>addToCart(product,quantity)}>加入購物車</button>
                {/* 購物車的懸浮泡泡預計會寫在App.js裡 */}
              </div>
            </div>
          </div>
          <div id="productIntro">
            <div className="productIntro_pD pIpD1">
              <div className="productIntroText_pD" style={{whiteSpace:"pre-line"}}><ReactMarkdown>{product.description}</ReactMarkdown></div>
              <div className="productIntroImg_pD" style={{backgroundImage:`url(${product.desImg[0]})`}}></div>
            </div>
            <div className="productIntro_pD pIpD2">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
