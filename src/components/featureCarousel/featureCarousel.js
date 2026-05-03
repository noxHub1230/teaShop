import React from "react";
import "./featureCarousel.css";
import carouselImage1 from "../../material/carousel_home_image1.png";
import carouselImage2 from "../../material/carousel_home_image2.png";
import carouselImage3 from "../../material/carousel_home_image3.png";

const carouselItems=[
  {
    image: carouselImage1,
    text:"古林翠室 x 五大名家之一「千鶴」期間限定新品【千鶴幽青茶】上市！",
  },
  {
    image: carouselImage2,
    text:"古林翠室 x 名號異人劍使末納刻希亞期間限定新品【夜月幽焰茶】上市！",
  },
  {
    image: carouselImage3,
    text:"古林萃室綠茶系列產品限時優惠活動開跑！",
  }
];

export default function FeatureCarousel() {
  return (
    <div id="carousel_home" 
    className="carousel slide" 
    data-bs-ride="carousel">
      <div style={{textAlign:"center"}}><h3>近期焦點<hr/></h3></div>
      <div className="carousel-indicators ">
        <button type="button"
                data-bs-target="#carousel_home"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
        ></button>
        <button type="button"
                data-bs-target="#carousel_home"
                data-bs-slide-to="1"
                aria-label="Slide 2"
        ></button>
        <button type="button"
                data-bs-target="#carousel_home"
                data-bs-slide-to="2"
                aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        {carouselItems.map((item, i) => (
          <div className={`carousel-item ${i === 0 ? "active" : ""}`} key={i}>
            <img src={item.image} className="d-block w-100" alt={`Slide ${i+1}`} />
            <div className="carousel-caption d-none d-md-block">
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carousel_home" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carousel_home" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
