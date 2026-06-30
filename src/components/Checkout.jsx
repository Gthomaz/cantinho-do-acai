import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handlePayment = (method) => {
    console.log(`Processando pagamento via ${method} no valor de R$ ${total.toFixed(2)}`);
    // Integração Pagar.me
  };

  if (cartItems.length === 0) return null;

  return (
    <section className="w-full bg-gradient-to-br from-acai-purple/30 to-black border border-acai-purple/50 rounded-2xl p-6 shadow-[0_0_30px_rgba(74,20,140,0.3)] mt-4">
      <div className="flex justify-between items-end mb-6 border-b border-white/10 pb-4">
        <h2 className="text-2xl font-bold text-white">Total a Pagar</h2>
        <p className="text-3xl font-black text-acai-neon">R$ {total.toFixed(2)}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => handlePayment('Pix')}
          className="flex items-center justify-center py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-bold transition-colors active:scale-95"
        >
          Pagar com Pix
        </button>
        <button 
          onClick={() => handlePayment('Cartão')}
          className="flex items-center justify-center py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors active:scale-95"
        >
          Cartão de Crédito
        </button>
      </div>
    </section>
  );
};
export default Checkout;
