import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handlePayment = (method) => {
    console.log(`Processando pagamento via ${method} no valor de R$ ${total.toFixed(2)}`);
    // Lógica para integração Pagar.me (Pix/Cartão)
  };

  return (
    <div className='checkout-container'>
      <h2>Finalizar Pedido</h2>
      <p>Total: R$ {total.toFixed(2)}</p>
      <button onClick={() => handlePayment('Pix')}>Pagar com Pix</button>
      <button onClick={() => handlePayment('Cartão')}>Cartão de Crédito</button>
    </div>
  );
};
export default Checkout;
