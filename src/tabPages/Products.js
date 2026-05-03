import React from 'react';
import "../styles/products.css";
import FeatureCarousel from '../components/featureCarousel/featureCarousel';

const products = [
  { id: 1, name: 'Green Tea', description: 'Fresh leaves with a light, smooth flavor.', price: '$12.99' },
  { id: 2, name: 'Black Tea', description: 'Bold and rich, perfect for a morning boost.', price: '$10.99' },
  { id: 3, name: 'Oolong', description: 'Balanced and aromatic for a relaxing cup.', price: '$13.99' },
];

export default function Products() {
  return (
    <div className="tab-page container-fluid p-0">
      <div id="BG_products" className='py-4'>
        <header className="tab-page__header">
          <FeatureCarousel />
        </header>
        <div id="content_products">
            <div id="toolBar">
            </div>
            {products.map((product) => (
            <article key={product.id} className="product-card">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <span className="product-price">{product.price}</span>
            </article>
            ))}
        </div>
      </div>
    </div>
  );
};
