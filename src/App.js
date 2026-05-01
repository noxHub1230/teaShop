import logo from "./material/logo.png";
import "./App.css";
import Home from "./components/Home";
import Products from "./components/Products";
import Contact from "./components/Contact";
import News from "./components/News";
import History from "./components/History";
import "./material/graphy";
import "./material/tools";
import React, { useState ,useEffect} from "react";
import { tab } from "@testing-library/user-event/dist/tab";

const navItems=[
  {
    label:"資訊消息",
    tabName:"news"
  },
  {
    label:"經營歷史",
    tabName:"history"
  },
  {
    label:"特色產品",
    tabName:"products"
  },
  {
    label:"門市據點",
    tabName:"contact"
  },
];
const socialLinks=[
  {
    label:"Facebook",
    url:"https://www.facebook.com",
    icon:"https://img.icons8.com/?size=100&id=8818&format=png&color=d0d9be",
    icon_hover:"https://img.icons8.com/?size=100&id=435&format=png&color=FFFFFF"
  },
  {
    label:"Instagram",
    url:"https://www.instagram.com",
    icon:"https://img.icons8.com/?size=100&id=32309&format=png&color=d0d9be",
    icon_hover:"https://img.icons8.com/?size=100&id=32292&format=png&color=FFFFFF"
  },
  {
    label:"Threads",
    url:"https://www.threads.net",
    icon:"https://img.icons8.com/?size=100&id=AS2a6aA9BwK3&format=png&color=d0d9be",
    icon_hover:"https://img.icons8.com/?size=100&id=ikThuZ5WmSYz&format=png&color=FFFFFF"
  }
];
const contactInfo=[
  {
    way:"聯繫方式",
    infos:[
    {text:"總公司：高藏州霞岐縣山田町下狛西作り道6"},
    {text:"直營店：高藏州霞期限川茂町上通り1-2-3"},
    {text:"電話：02-12345678"},
    {text:"傳真：02-87654321"},
    {text:"電子郵件：info@company.com"}
    ]
  },
  {
    way:"營業時間",
    infos:[
      {text:"週一至週五：9:00 - 18:00"},
      {text:"週六：10:00 - 16:00"},
      {text:"週日：休息"},
      {text:"(特殊節假日營業時間另行公告)"},
      {text:""}
    ]
  },
  {
    way:"導覽綱要",
    infos:[
      {text:"首頁",tabName:"home"},
      {text:"資訊消息",tabName:"news"},
      {text:"經營歷史",tabName:"history"},
      {text:"特色產品",tabName:"products"},
      {text:"門市據點",tabName:"contact"}
    ]
  }
]
function App() {
  const [activeTab, setActiveTab] = useState("home");
  const rwdNavCtrl = (tabName) => {
    setActiveTab(tabName);
    document.getElementById("rwdNav").checked = false;
  };
  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "news":
        return <News />;
      case "history":
        return <History />;
      case "products":
        return <Products />;
      case "contact":
        return <Contact />;
      default:
        return <News />;
    }
  };
  return (
    <div className="App" style={{display:"flex", flexDirection:"column", minHeight:"100vh"}}>
      <button id="toTop" className="p-3"
      onClick={()=>{window.scrollTo({top:0, behavior:"smooth"})}}
      >
        ︿<br/>TOP
      </button>
      <nav>
        <div className="d-flex flex-row nav">
          <a
            className="navbar-brand"
            onClick={() => rwdNavCtrl("home")}
            data-bs-toggle="tab"
          >
            <img id="logo" src={logo}></img>
          </a>
          <input type="checkbox" id="rwdNav" />
          <label for="rwdNav" className="graphy">
            <div className="line"></div>
          </label>
          <ul
            id="navLinks"
            className="nav ms-auto align-self-center align-items-center"
          >
            {navItems.map((item) => (
              <li className="nav-item" key={item.tabName}>
                <a
                  className="nav-link"
                  onClick={() => rwdNavCtrl(item.tabName)}
                  data-bs-toggle="tab"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <div className="tab-content">{renderContent()}</div>
      <footer className="text-center py-1" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
        <div className="socialLinks" style={{marginTop:"2rem"}}>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
              >
                <img src={link.icon} 
                alt={link.label}
                onMouseEnter={(e)=>{
                  e.currentTarget.src=link.icon_hover;
                }}
                onMouseLeave={(e)=>{
                  e.currentTarget.src=link.icon;
                }} 
                style={{width:"3rem", height:"3rem",margin:"0.5rem"}} />
              </a>
            ))}
        </div>
        <div className="contactInfo" style={{marginTop:"2rem",textAlign:"center",display:"flex", flexDirection:"row",gap:"10rem"}}>
          {contactInfo.map((group,index)=>(
            <div key={index} style={{width:"15vw",flexWrap:"wrap",display:"flex", flexDirection:"column", alignItems:"center"}}>
              <h5>{group.way}</h5>
              <hr style={{width:"100%"}}/>
              {group.infos.map((item,i)=>item.tabName?(
                <a
                  key={i}
                  href="#"
                  className="text-decoration-none"
                  onClick={(e) => {
                    e.preventDefault();
                    rwdNavCtrl(item.tabName);
                  }}
                  style={{color:"#d0d9be", marginBottom:"1rem"}}
                >
                  {item.text}
                </a>
              ):(
                <p key={i}>
                  {item.text}
                </p>
              ))}
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}

export default App;
