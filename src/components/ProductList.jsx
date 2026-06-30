import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import ProductCustomizer from './ProductCustomizer';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts().then(data => setProducts(data));
  }, []);

  return (
    <div className='product-list'>
      {products.map(p => (
        <div key={p.id} className='product-card'>
          <h3>{p.name}</h3>
          <p>R$ {p.price.toFixed(2)}</p>
          <button onClick={() => setSelectedProduct(p)}>Adicionar ao Pedido</button>
        </div>
      ))}
      
      {selectedProduct && (
        <ProductCustomizer 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};
export default ProductList;
