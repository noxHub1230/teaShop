import React, {useEffect} from "react";
import "../styles/home.css";
import { autoBreak } from "../material/tools";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { waveline, waveline_alt } from "../material/graphy";
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
function Home() {
  useEffect(() => {
  ScrollTrigger.refresh();
  document.querySelectorAll(".HSsection").forEach((section) => {
    const h2 = section.querySelector("h2");
    const svg = section.querySelector("svg");
    const textIntro = section.querySelector(".HStextIntro");
    const before = section.querySelector(".HShome");
    const images = section.querySelector(".HSImages");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        toggleActions: "play none none none",
      }
    });

    // 第二個：h2 fadeIn
    tl.to(h2, { opacity: 1, duration: 0.5 })

    // 第三個：svg fadeIn（第二個動畫進度到1/3時）
    tl.to(svg, { opacity: 1, duration: 0.5 }, "<0.167")

    // 第四個：h2Up + svg fadeOut（第二個動畫播完後0.5秒）
    tl.to(h2, { top: "2rem", duration: 0.5 }, "+=0.5")
    tl.to(svg, { opacity: 0, duration: 0.5 }, "<")

    // 第五個：HStextIntro fadeIn（第四個動畫進度到3/5時）
    tl.to(textIntro, { opacity: 1, duration: 0.5 }, "<0.3")

    // 第六七八個：maskExpand + h2BgExpand（第四個動畫播完時）
    tl.to(before, { "--before-width": "15vw", duration: 0.5 }, ">")
    tl.to(h2, { "--h2-height": "12rem", duration: 0.5 }, "<")
    tl.to(textIntro, { "--intro-height": "12rem", duration: 0.5 }, "<")

    // 第九個：HSImages fadeIn（第六個動畫進度到1/5時）
    tl.to(images, { opacity: 1, duration: 0.5 }, "<0.1")
  });

  return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);


  return (
    <div className="container-fluid py-0 px-0">
      <div id="BG" className="container-fluid py-5 px-0">
        <div
          id="title"s
          className="d-flex justify-content-center align-items-center"
        ></div>
        <span id="titleText" className="text-center">
          古林萃室 <hr />
          <small id="subtitle">採擷天地精華，品味自然甘醇</small>
        </span>
      </div>
      <div id="contentHome">
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
