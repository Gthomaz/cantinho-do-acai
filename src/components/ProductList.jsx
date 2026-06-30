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
    <section className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-white tracking-wide">Nosso Cardápio</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map(p => (
          <div key={p.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 shadow-xl hover:shadow-acai-neon/20 hover:border-acai-neon/50 transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-white group-hover:text-acai-neon transition-colors">{p.name}</h3>
              <span className="text-lg font-bold text-acai-neon">R$ {p.price.toFixed(2)}</span>
            </div>
            <button 
              onClick={() => setSelectedProduct(p)}
              className="w-full py-3 rounded-xl bg-acai-purple/80 hover:bg-acai-neon text-white hover:text-black font-semibold transition-all duration-300 active:scale-95"
            >
              Adicionar ao Pedido
            </button>
          </div>
        ))}
      </div>
      
      {selectedProduct && (
        <ProductCustomizer 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </section>
  );
};
export default ProductList;
