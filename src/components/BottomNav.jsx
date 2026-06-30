import React from 'react';
import { Home, Search, ShoppingCart, User } from 'lucide-react';

export default function BottomNav({ cartCount, onCartClick }) {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-bg-card border-t border-brand-purple/20 px-6 py-3 flex justify-between items-center z-40 pb-safe">
      <button className="flex flex-col items-center gap-1 text-brand-yellow">
        <Home size={24} />
        <span className="text-[10px] font-semibold">Início</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300">
        <Search size={24} />
        <span className="text-[10px] font-semibold">Busca</span>
      </button>
      <button onClick={onCartClick} className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300 relative">
        <ShoppingCart size={24} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-2 bg-brand-yellow text-brand-purple font-bold text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cartCount}
          </span>
        )}
        <span className="text-[10px] font-semibold">Carrinho</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300">
        <User size={24} />
        <span className="text-[10px] font-semibold">Perfil</span>
      </button>
    </div>
  );
}
