import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const CartUI = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <section className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        🛒 <span className="text-white">Seu Pedido</span>
      </h2>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-8 text-gray-400 bg-black/20 rounded-xl border border-dashed border-gray-700">
          Seu carrinho está vazio. Que tal um Açaí?
        </div>
      ) : (
        <ul className="space-y-3">
          {cartItems.map((item, index) => (
            <li key={index} className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-gray-800">
              <div className="flex flex-col">
                <span className="font-semibold text-white">{item.name}</span>
                {(item.options?.selectedButter || item.options?.selectedComplement) && (
                  <span className="text-xs text-acai-neon/80">
                    {item.options.selectedButter && `${item.options.selectedButter} `}
                    {item.options.selectedComplement && `+ ${item.options.selectedComplement}`}
                  </span>
                )}
              </div>
              <span className="font-bold text-green-400 whitespace-nowrap ml-4">
                R$ {item.price.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
export default CartUI;
