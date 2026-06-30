import React, { useState, useContext } from 'react';
import './styles/theme.css';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider, CartContext } from './contexts/CartContext';
import { menuData } from './data/menu';

import CategoryNav from './components/CategoryNav';
import ProductCard from './components/ProductCard';
import BottomSheet from './components/BottomSheet';
import CartDrawer from './components/CartDrawer';
import BottomNav from './components/BottomNav';

const MainApp = () => {
  const [selectedCategory, setSelectedCategory] = useState(menuData.categories[0].id);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  const filteredProducts = menuData.products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-bg-dark flex flex-col pb-24">
      {/* Header Premium */}
      <header className="w-full bg-[#4a148c] text-white px-6 pt-12 pb-6 rounded-b-[40px] shadow-[0_10px_30px_rgba(74,20,140,0.5)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 flex flex-col items-center text-center">
          <img src="/images/logo.png" alt="Cantinho do Açaí" className="w-24 h-24 rounded-full mb-3 shadow-[0_0_20px_rgba(0,255,0,0.3)] border-2 border-[#39ff14]" />
          <h1 className="text-4xl font-black mb-1 tracking-tight text-[#39ff14] drop-shadow-[0_0_10px_rgba(57,255,20,0.8)]">
            Cantinho<br/>do Açaí
          </h1>
          <p className="text-sm font-medium text-green-200 mt-2">Aqui é mais gostoso 💚</p>
        </div>
      </header>

      {/* Navegação Horizontal */}
      <CategoryNav 
        categories={menuData.categories} 
        selectedCategory={selectedCategory} 
        onSelect={setSelectedCategory} 
      />

      {/* Lista de Produtos */}
      <main className="flex-1 px-4 py-6 max-w-7xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-white mb-6">
          {menuData.categories.find(c => c.id === selectedCategory)?.name}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={(p) => setSelectedProduct(p)} 
            />
          ))}
        </div>
      </main>

      {/* Modais e Navbars */}
      <BottomSheet 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAdd={addToCart} 
      />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onRemove={removeFromCart}
      />

      <BottomNav 
        cartCount={cartItems.length} 
        onCartClick={() => setIsCartOpen(true)} 
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </AuthProvider>
  );
}
