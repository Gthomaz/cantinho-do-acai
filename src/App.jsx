import React from 'react';
import './styles/theme.css';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import ProductList from './components/ProductList';
import CartUI from './components/CartUI';
import Checkout from './components/Checkout';
import WhatsAppButton from './components/WhatsAppButton';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col items-center pb-20">
          <header className="w-full bg-black/40 backdrop-blur-md sticky top-0 z-40 border-b border-acai-neon/30 py-4 px-6 mb-8 shadow-lg">
            <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-acai-neon">
              Cantinho do Açaí
            </h1>
          </header>
          <main className="w-full max-w-4xl px-4 flex flex-col gap-8">
            <ProductList />
            <div className="h-px w-full bg-gradient-to-r from-transparent via-acai-neon/50 to-transparent my-2"></div>
            <CartUI />
            <Checkout />
          </main>
          <WhatsAppButton />
        </div>
      </CartProvider>
    </AuthProvider>
  );
};
export default App;
