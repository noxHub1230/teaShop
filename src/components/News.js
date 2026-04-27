import React from "react";

function News() {
  return (
    <div className="container py-5 text-center">
      <h2 style={{ color: "#43453c" }}>關於古林</h2>
      <div id="news">
        <span id="newsText">最新消息</span>
        <hr />
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            2024/06/15 - 全新夏季茶飲上市，清涼一夏！
          </li>
          <li className="list-group-item">2024/06/10 - 新品推薦：高山烏龍茶</li>
          <li className="list-group-item">
            2024/06/01 - 端午節特惠活動開跑，買一送一！
          </li>
        </ul>
      </div>
      <div id="carouselCaptions" className="carousel slide py-3">
        <span id="newsText">檔期活動</span>
        <hr />
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYXdO7mK7s8qsbgK13AaUbCo8Wo122wEzROw&s"
              className="d-block w-100"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYXdO7mK7s8qsbgK13AaUbCo8Wo122wEzROw&s"
              className="d-block w-100"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Second slide label</h5>
              <p>
                Some representative placeholder content for the second slide.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYXdO7mK7s8qsbgK13AaUbCo8Wo122wEzROw&s"
              className="d-block w-100"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Third slide label</h5>
              <p>
                Some representative placeholder content for the third slide.
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default News;
