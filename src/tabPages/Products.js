import React, { use, useState } from 'react';
import "../styles/products.css";
import FeatureCarousel from '../components/featureCarousel/featureCarousel';
import product0 from"../material/products/products_0.png";
import product1 from"../material/products/products_1.png";
import product2 from"../material/products/products_2.png";

const filter=[
  {type:"包裝",
    options:["罐裝","盒裝"]
  },
  {type:"功效",
    options:["助眠","提神","消化","養生"]
  },
  {type:"形式",
    options:["粉末","茶包","葉片","甜點","用品"]
  },
  {type:"咖啡因",
    options:["有咖啡因","無咖啡因"]
  },
  {type:"特選系列",
    options:["聯名特品","當期優惠"]
  }
];
const sort =[
  "價格高至低",
  "價格低至高",
  "上架新至舊",
  "上架舊至新"
]
const products = [
  { id: 0, 
    name: "夜月幽焰茶",
    image:product0,
    filter:["盒裝","提神","聯名特品"],
    description: "冥火淬焙、亙古不熄", 
    price: '$12.99' },
  {
    id:1,
    name:"千鶴幽青茶",
    image:product1,
    filter:["盒裝","養生","聯名特品"],
    description: "幽山長遠、林霧恆存", 
    price: '$12.99' 
  },
  {
    id:2,
    name:"千鶴幽青茶",
    image:product2,
    filter:["罐裝","養生","聯名特品"],
    description: "幽山長遠、林霧恆存", 
    price: '$12.99' 
  }
];


export default function Products() {
  const[isHovered,setIsHovered]=useState(false);
  const[isOpen,setItOpen]=useState(false);
  const[selected,setSelected]=useState([]);
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
  return (
    <div className="tab-page container-fluid p-0">
      <div id="BG_products" className='py-4'>
        <header className="tab-page__header">
          <FeatureCarousel />
        </header>
        <div id="content_products">
            <div id="toolBar">
              <div id="dpFilter">
              {filter.map((item)=>(
                <div className="dropdown">
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
                        <label for={`fliter-${item.type}-${option}`}>{option}</label>
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
                    <li className="dropdown-items form-check">
                      <input className="form-check-input" id={`sort-${type}`} type="radio" name="sortFilter"/>
                      <label className="form-check-label" for={`sort-${type}`}>{type}</label>
                    </li>
                    ))
                    }
                  </ul>
                </div>
              </div>
            </div>
            <div id="productsShow">
              {filtered.map((product) => (
              <div key={product.id} className="card">
                  <img className="card-image-top" src={product.image} alt={product.name}/>
                  <div className="card-body">
                    <h3>{product.name}<hr/></h3>
                    <p>{product.description}</p>
                    <span className="product-price">{product.price}</span>
                  </div>
              </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};
