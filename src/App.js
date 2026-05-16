import logo from "./material/logo.png";
import "./App.css";
import Home from "./tabPages/Home";
import Products from "./tabPages/Products";
import Contact from "./tabPages/Contact";
import News from "./tabPages/News";
import History from "./tabPages/History";
import ProductDetail from "./tabPages/ProductDetail";
import "./material/graphy";
import "./material/tools";
import React, { useState ,useEffect} from "react";
import {Routes,Route,useLocation,useNavigate} from "react-router-dom";
import {navItems,socialLinks,contactInfo} from "./data/data_basic";

const routeElements={
  home:<Home/>,
  news:<News/>,
  products:<Products/>,
  contact:<Contact/>,
  history:<History/>,
};
function App() {
  const navigate=useNavigate();
  const location=useLocation();
  const isHome=location.pathname==="/"||location.pathname==="/home";
  const rwdNavCtrl=(tabName)=>{
    navigate(`/${tabName}`);
    document.getElementById("rwdNav").checked=false;
  };
  return (
    <div className="App" style={{display:"flex", flexDirection:"column", minHeight:"100vh"}}>
      <button id="toTop" className="p-3"
      onClick={()=>{window.scrollTo({top:0, behavior:"smooth"})}}
      >
        ︿<br/>TOP
      </button>
      <nav style={isHome?
        {background:"rgba(208,217,190,0.8)"}
        : 
        {background:"var(--lightColor)"}}>
        <div className="d-flex flex-row nav" >
          <a
            className="navbar-brand"
            onClick={() => rwdNavCtrl("home")}
            data-bs-toggle="tab"
          >
            <img id="logo" src={logo}></img>
          </a>
          <input type="checkbox" id="rwdNav" />
          <label htmlFor="rwdNav" className="graphy">
            <div className="line"></div>
          </label>
          <ul
            id="navLinks"
            className="nav ms-auto align-self-center align-items-center"
          >
            {navItems.filter((item)=>!item.hidden)
            .map((item) => (
              <li className="nav-item" key={item.tabName}>
                <button
                  className="nav-link"
                  onClick={() => rwdNavCtrl(item.tabName)}
                  data-bs-toggle="tab"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <main className="tab-content">
        <Routes>
          <Route path="/" element={<Home />} />
          {navItems.map((item) => (
            <Route key={item.tabName} path={`/${item.tabName}`} element={routeElements[item.tabName]} />
          ))}
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </main>
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
            <section key={index} style={{width:"15vw",flexWrap:"wrap",display:"flex", flexDirection:"column", alignItems:"center"}}>
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
            </section>
          ))}
        </div>
      </footer>
    </div>
  );
}

export default App;
