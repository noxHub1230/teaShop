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
    icon:"https://cdn-icons-png.flaticon.com/512/733/733547.png"
  },
  {
    label:"Instagram",
    url:"https://www.instagram.com",
    icon:"https://cdn-icons-png.flaticon.com/512/733/733558.png"
  },
  {
    label:"Threads",
    url:"https://www.threads.net",
    icon:"https://cdn-icons-png.flaticon.com/512/733/733579.png"
  }
];
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
        <div className="socialLinks">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={link.icon} alt={link.label} style={{width:"2rem", height:"2rem",margin:"1rem"}} />
              </a>
            ))}
        </div>
        <div className="contactInfo">
          <p>聯絡我們</p>
          <p>電話: 02-12345678</p>
          <p>地址: 台北市信義區松仁路123號</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
