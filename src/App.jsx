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
      <header className="w-full bg-brand-purple-dark text-white px-6 pt-12 pb-6 rounded-b-[40px] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-black mb-2 tracking-tight">Cantinho<br/><span className="text-brand-yellow">do Açaí</span></h1>
          <p className="text-sm font-medium text-purple-200">Aqui é mais gostoso 💜</p>
        </div>
      </header>

      {/* Navegação Horizontal */}
      <CategoryNav 
        categories={menuData.categories} 
        selectedCategory={selectedCategory} 
        onSelect={setSelectedCategory} 
      />

      {/* Lista de Produtos */}
      <main className="flex-1 px-4 py-6">
        <h2 className="text-xl font-bold text-white mb-6">
          {menuData.categories.find(c => c.id === selectedCategory)?.name}
        </h2>
        <div className="flex flex-col gap-4">
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
