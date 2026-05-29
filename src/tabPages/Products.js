import React, { useState ,useEffect} from 'react';
import "../styles/products.css";
import FeatureCarousel from '../components/featureCarousel/FeatureCarousel';
import TabPageBG from '../components/tabPageBG/TabPageBG';
import { useNavigate } from 'react-router-dom';
import { filter , sort} from "../data/data_products";
import {supabase} from "../supabaseClient";
import { useLoading } from "../components/loading/loading";

export default function Products() {
  const { startLoading, stopLoading } = useLoading();
  const navigate=useNavigate();
  const[isHovered,setIsHovered]=useState(false);
  const[isOpen,setItOpen]=useState(false);
  const[selected,setSelected]=useState([]);
  const[sortType,setSortType]=useState("");

  const [products, setProducts] = useState([]);


useEffect(() => {
  async function fetchProducts() {
    startLoading();

    try {
      const { data, error } = await supabase
        .from("products")
        .select("*");

      if (error) {
        console.error(error);
      } else {
        setProducts(data);
      }
    } finally {
      stopLoading();
    }
  }

  fetchProducts();
}, [startLoading, stopLoading]);

  const filterToggle =(opt)=>{
    setSelected((previous)=>{
      return previous.includes(opt)?
      previous.filter((selOpt)=>{
        return selOpt!==opt;
      })
      :
      [...previous,opt];//...previous等同於previous.concat(opt)
    })
  };
  const filtered =
    selected.length===0?
    products
    :
    products.filter((p)=>{
      return selected.every(
        (tag)=>{
          return p.filter.includes(tag);
        }
      )
    });
  ;

  
  const sortedProducts = [...filtered].sort((a, b) => {
  switch (sortType) {
    case "價格高至低":
      return b.price - a.price;

    case "價格低至高":
      return a.price - b.price;

    case "上架新至舊":
      return b.id - a.id;

    case "上架舊至新":
      return a.id - b.id;

    default:
      return 0;
  }
});

  return (
      <TabPageBG>
        <header className="tab-page__header">
          <FeatureCarousel />
        </header>
        <div id="content_products">
            <div id="toolBar">
              <div id="dpFilter">
              {filter.map((item)=>(
                <div className="dropdown" key={item.type}>
                  <button className="dropdown-toggle"
                  type="button" data-bs-toggle="dropdown"
                  aria-expanded="false">
                    {item.type}
                  </button>
                  <ul className="dropdown-menu">
                    {item.options.map((option)=>(
                      <li key={option} className="dropdown-item">
                        <input id={`fliter-${item.type}-${option}`} type="checkbox"
                        checked={selected.includes(option)}
                        onChange={()=>{return filterToggle(option)}}/>
                        <label htmlFor={`fliter-${item.type}-${option}`}>{option}</label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              </div>
              <div id="sortFilter">
                <div className="dropdown">
                  <button className="dropdown-toggle"
                  data-bs-toggle="dropdown" type="button" aria-expanded="false"
                  onMouseEnter={()=>setIsHovered(true)}
                  onMouseLeave={()=>setIsHovered(false)}
                  onClick={(e)=>setItOpen(!isOpen)}>
                    <i className={`bi ${isHovered || isOpen?"bi-filter-square":"bi-filter-square-fill"}`}/>
                  </button>
                  <ul className="dropdown-menu">
                    {sort.map((type)=>(
                    <li className="dropdown-items form-check" key={type}>
                      <input className="form-check-input" id={`sort-${type}`} type="radio" name="sortFilter"
                      checked={selected===type}
                      onChange={()=>setSortType(type)}/>
                      <label className="form-check-label" htmlFor={`sort-${type}`}>{type}</label>
                    </li>
                    ))
                    }
                  </ul>
                </div>
              </div>
            </div>
            <div id="productsShow">
              {sortedProducts.map((product) => (
              <div key={product.id} className="card" onClick={() => navigate(`/products/${product.id}`)}>
                  <img className="card-image-top" src={product.image} alt={product.name}/>
                  <div className="card-body">
                    <h3>{product.name}<hr/></h3>
                    <p>{product.subtitle}</p>
                    <span className="product-price">{product.price}元</span>
                  </div>
              </div>
              ))}
            </div>
        </div>
      </TabPageBG>
  );
};
