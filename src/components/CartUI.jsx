import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const CartUI = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="cart-ui">
      <h2>Seu Pedido</h2>
      {cartItems.length === 0 ? <p>Carrinho vazio</p> : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>{item.name} - R$ {item.price.toFixed(2)}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default CartUI;
