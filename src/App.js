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

function App() {

  const [activeTab, setActiveTab] = useState("home");
  useEffect(()=>{
    window.scrollTo(0,0);
  },[]);
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
    <div className="App">
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
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => rwdNavCtrl("news")}
                data-bs-toggle="tab"
              >
                資訊消息
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => rwdNavCtrl("history")}
                data-bs-toggle="tab"
              >
                經營歷史
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => rwdNavCtrl("products")}
                data-bs-toggle="tab"
              >
                特色產品
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => rwdNavCtrl("contact")}
                data-bs-toggle="tab"
              >
                門市據點
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => rwdNavCtrl("contact")}
                data-bs-toggle="tab"
              >
                聯絡我們
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="tab-content">{renderContent()}</div>
      <footer className="text-center py-1">© 2024 古林萃室版權所有</footer>
    </div>
  );
}

export default App;
