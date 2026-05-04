import React, { use, useState } from 'react';
import "../styles/products.css";
import FeatureCarousel from '../components/featureCarousel/featureCarousel';
const filter=[
  {type:"包裝",
    options:["罐裝","盒裝"]
  },
  {type:"功效",
    options:["助眠","提神","消化","養生"]
  },
  {type:"形式",
    options:["粉末","茶包","葉片"]
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
  { id: 1, name: 'Green Tea', description: 'Fresh leaves with a light, smooth flavor.', price: '$12.99' },
  { id: 2, name: 'Black Tea', description: 'Bold and rich, perfect for a morning boost.', price: '$10.99' },
  { id: 3, name: 'Oolong', description: 'Balanced and aromatic for a relaxing cup.', price: '$13.99' },
];


export default function Products() {
  const[isHovered,setIsHovered]=useState(false);
  const[isOpen,setItOpen]=useState(false);
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
                        <input id={`fliter-${item.type}-${option}`} type="checkbox"/>
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
              {products.map((product) => (
              <div key={product.id} className="card">
                  <img className="card-image-top" src={product.image} alt={product.name}/>
                  <div className="card-body">
                    <h3>{product.name}</h3>
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
