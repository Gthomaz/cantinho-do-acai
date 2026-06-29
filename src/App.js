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
        <div className='app-container'>
          <header>
            <h1>Cantinho do Açaí</h1>
          </header>
          <main>
            <ProductList/>
            <hr />
            <CartUI/>
            <hr />
            <Checkout/>
          </main>
          <WhatsAppButton />
        </div>
      </CartProvider>
    </AuthProvider>
  );
};
export default App;
