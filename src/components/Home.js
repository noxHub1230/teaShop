import React, {useEffect} from "react";
import "../styles/home.css";
import { autoBreak } from "../material/tools";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { waveline, waveline_alt } from "../material/graphy";
import carouselImage1 from "../material/carousel_home_image1.png";
import carouselImage2 from "../material/carousel_home_image2.png";
import carouselImage3 from "../material/carousel_home_image3.png";
gsap.registerPlugin(ScrollTrigger);
const HSContent = [
  {
    id: "section1_home",
    styleId: "section1_home_style",
    title: "古法傳承",
    text: "堅持遵循傳統製茶工序從採摘、萎凋到焙火，每一步都細心拿捏，只為保留茶葉最純粹的香氣與層次，讓每一口都喝得到時間沉澱出的深厚風味。",
    images: [
      "https://www.chichasanchen.com/blog-detail/upload/fac_b/tw_fac_list_18l21_kfzqr24ip9.jpg",
      "https://image-cdn-flare.qdm.cloud/q65fe4feedb08c/image/data/jjtea/%E9%83%A8%E8%90%BD%E6%A0%BC/%E5%B0%81%E9%9D%A2.jpg",
      "https://edh.tw/_ipx/_/https://media-edh-cdn.h2u.io/image/article/800X418/I26U3XzCU3Dl5VycFxyrTHOoWkctXbpbD59j3uHT.jpg",
    ],
  },
  {
    id: "section2_home",
    styleId: "section2_home_style",
    title: "純淨契作",
    text: "深植於雲霧繚繞的原始茶園，遠離一切化學農藥與人工干預。茶樹與大地共生，孕育出無污染、甘甜潤喉的天然葉質。",
    images: [
      "https://www.rhythmsmonthly.com/gallery/212/tea.03.jpg",
      "https://www.newsmarket.com.tw/files/2018/10/%E9%9B%99%E8%83%9E%E8%83%8E.jpg",
      "https://pic.chaopx.com/chao_origin_pic/20/24/03/ce778c406811f4d9972c38cca6efa5a2.jpg",
    ],
  },
  {
    id: "section3_home",
    styleId: "section3_home_style",
    title: "新古並融",
    text: "結合現代萃取科技與傳統工法，開發出多樣化的茶葉體驗，讓悠久的茶文化在現代生活中，展現出靈動且富有創意的全新面貌。",
    images: [
      "https://jybio.com.tw/wp-content/uploads/2023/06/cq3.jpg",
      "https://img.bonnie8630.com/2019/10/1571496745-dc15c5083ede14e89685581f0c40917d.jpg",
      "https://bpic.588ku.com/back_list_pic/24/04/25/662c55174562224a1ca27860525527c1.jpg",
    ],
  },
];
const carouselItems=[
  {
    image: carouselImage1,
    text:"古林萃室 x 五大名家氏之一「千鶴」聯名茶款【千鶴幽青茶】期間限定上市！",
  },
  {
    image: carouselImage2,
    text:"古林萃室 x 名號劍使末納刻希亞聯名茶款【夜月幽焰茶】期間限定上市！",
  },
  {
    image: carouselImage3,
    text:"古林萃室綠茶系列商品期間限定優惠，購滿10件享七折！",
  }
];
const manageNews =[
  {
    date:"2026.05.01",
    type:"休息公告",
    caption:"適逢勞動節放假一天"
  }
];
const eventNews =[
  {
    date:"2026.04.20",
    type:"期間限定",
    caption:"端午節限定茶禮盒預購開跑！"
  }
];
function Home() {
  useEffect(() => {
    gsap.fromTo("#titleText", 
      {top:"25rem", 
        opacity: 0},
      {top:"20rem", 
        opacity: 1}
    );
    gsap.fromTo("#titleText",
      {opacity:1,
        scale:1,
        transformOrigin:"center center",
      },
      {opacity:0,
        scale:0.1,
        transformOrigin:"centercenter",
        scrollTrigger: {trigger: document.documentElement,
      start: "top top",
      end: "20% top",
      scrub: true,}
      }
    );
    gsap.fromTo("#contentHome",
      { opacity:0,
      clipPath:"inset(0% 50% 0% 50%)",
      transformOrigin:"center center",
      },
      { opacity:1,
        clipPath:"inset(0% 0% 0% 0%)",
        transformOrigin:"center center",
      scrollTrigger: {trigger: "#contentHome",
      start: "top bottom",
      end: "top top",
      scrub: true,}
    });
    gsap.fromTo("#pickedNews",
      {opacity:0},
      {opacity:1,
        scrollTrigger: {trigger: "#pickedNews",
      start: "top 20%",
      end: "top top",
      scrub: true,
        }
      }
    )
  document.querySelectorAll(".HSsection").forEach((section) => {
    const h2        = section.querySelector("h2");
    const svg       = section.querySelector("svg");
    const textIntro = section.querySelector(".HStextIntro");
    const before    = section.querySelector(".HShome");
    const images    = section.querySelector(".HSImages");
    const container = section.closest(".scrollDistance"); // HSImages 捲動要以整個高區塊為基準

    // ── 塊一：scrub 捲動動畫（隨捲動進度同步）────────────────────
    
    // .HSsection fadeIn：進入畫面時淡入（原 CSS entry 10%→cover 15%）
    gsap.fromTo(section,
      { opacity: 0 },
      {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "#contentHome",
          start: "top top",
          end:   "top 85%",
          scrub: true,
        },
      }
    );

    // svg fadeIn：原 CSS cover 16%→20%
    gsap.fromTo(svg,
      { opacity: 0 },
      {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "#contentHome",
          start: "top 84%",
          end:   "top 80%",
          scrub: true,
        },
      }
    );

    // svg fadeOut：原 CSS cover 25%→75%
    gsap.fromTo(svg,
      { opacity: 1 },
      {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#contentHome",
          start: "top 75%",
          end:   "top 25%",
          scrub: true,
        },
      }
    );

    // .HSImages 水平捲動：原 CSS HSleft cover 20%→80%
    const translateXValue = -((window.innerWidth*3 - 16*16) / 3 * 2 + window.innerWidth*0.1);
    const imagesMoveLeft = gsap.fromTo(images,
      { x: 0 },
      {
        x: translateXValue,
        ease: "none",
        scrollTrigger: {
          trigger:section,
          start:"top+=100% top" ,
          end:   "top+=300% top",
          scrub: true,
          enabled: false,
        },
      }
    );

    // ── 塊二：一次性入場序列（黏在 top top 後觸發）────────────────

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(h2,        { opacity: 1, duration: 0.5 })
    tl.to(svg,       { opacity: 1, duration: 0.5 },  "<0.167")
    tl.to(h2,        { top: "2rem", duration: 0.5 }, "+=0.5")
    tl.to(svg,       { opacity: 0, duration: 0.5 },  "<")
    tl.to(textIntro, { opacity: 1, duration: 0.5 },  "<0.3")
    tl.to(before,    { "--before-width": "15vw", duration: 0.5 }, ">")
    tl.to(h2,        { "--h2-height": "12rem",   duration: 0.5 }, "<")
    tl.to(textIntro, { "--intro-height": "12rem", duration: 0.5 }, "<")
    tl.to(images,    { opacity: 1, duration: 0.5 ,onComplete:()=>{imagesMoveLeft.scrollTrigger.enabled=true;
     
    }}, "<0.1")
  });

  return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);
  return (
    <div className="container-fluid py-0 px-0">
      <div id="BG" className="container-fluid py-5 px-0">
        <div
          id="title"
          className="d-flex justify-content-center align-items-center"
        ></div>
        <span id="titleText" className="text-center">
          古林萃室 <hr />
          <small id="subtitle">採擷天地精華，品味自然甘醇</small>
        </span>
      </div>
      <div id="contentHome">
        <div id="pickedNews">
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
          <div id="leftNews_home">
            <div style={{textAlign:"center"}}><h3>營業消息<hr/></h3></div>
              {manageNews.map((news,i)=>(
                <span key={i}>{news.date} - 【{news.type}】 {news.caption}<hr style={{border:"1px dashed var(--darkColor)"}}/></span>
              ))}
          </div>
          <div id="rightNews_home">
            <div style={{textAlign:"center"}}><h3>活動消息<hr/></h3></div>
              {eventNews.map((news,i)=>(
                <span key={i}>{news.date} - 【{news.type}】 {news.caption}<hr style={{border:"1px dashed var(--darkColor)"}}/></span>
              ))}
          </div>
        </div>
        {HSContent.map((section) => (
          <div
            className="scrollDistance"
            id={section.id}
            key={section.id}
            style={{ "--tl": `--${section.id}-tl` }}
          >
            <div className="HSsection">
              <div className="HShome" id={section.styleId}>
                <h2>{section.title}</h2>
                <svg
                  className="loopWaveLine"
                  viewBox="0 -250 6000 500"
                  preserveAspectRatio="none"
                >
                  <g className="waveGroup">
                    <path d={waveline} />
                    <path d={waveline} transform="translate(3000 0)" />
                  </g>
                  <g className="waveGroupReverse">
                    <path d={waveline} />
                    <path d={waveline} transform="translate(3000 0)" />
                  </g>
                </svg>
                <div className="HStextIntro">{autoBreak(section.text)}</div>
                <div className="HSImages">
                  {section.images.map((image, i) => (
                    <div
                      key={i}
                      className="HSImageItem"
                      style={{ "--bg": `url(${image})` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
