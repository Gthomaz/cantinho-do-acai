import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Função auxiliar para checar se dois itens são idênticos (mesmas opções)
  const areItemsIdentical = (item1, item2) => {
    if (item1.id !== item2.id) return false;
    
    const opts1 = item1.options || { cremes: [], complementos: [], adicionais: [] };
    const opts2 = item2.options || { cremes: [], complementos: [], adicionais: [] };

    const getIds = (arr) => arr.map(i => i.id).sort().join(',');

    return (
      getIds(opts1.cremes) === getIds(opts2.cremes) &&
      getIds(opts1.complementos) === getIds(opts2.complementos) &&
      getIds(opts1.adicionais) === getIds(opts2.adicionais)
    );
  };

  const addToCart = (item) => {
    const existingIndex = cartItems.findIndex(cartItem => areItemsIdentical(cartItem, item));
    
    if (existingIndex >= 0) {
      // Já existe no carrinho, só aumenta a quantidade
      const newCart = [...cartItems];
      newCart[existingIndex].quantity += 1;
      setCartItems(newCart);
    } else {
      // Adiciona como novo item com quantidade 1
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
  };

  const updateQuantity = (index, delta) => {
    const newCart = [...cartItems];
    newCart[index].quantity += delta;
    if (newCart[index].quantity <= 0) {
      newCart.splice(index, 1);
    }
    setCartItems(newCart);
  };
  
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart,
      updateQuantity,
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};
