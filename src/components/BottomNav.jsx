import React from 'react';
import { Home, Search, ShoppingCart, User } from 'lucide-react';

export default function BottomNav({ cartCount, onCartClick }) {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#39ff14] px-6 py-3 flex justify-between items-center z-40 pb-safe shadow-[0_-5px_20px_rgba(57,255,20,0.4)] rounded-t-3xl">
      <button className="flex flex-col items-center gap-1 text-[#4a148c]">
        <Home size={24} />
        <span className="text-[10px] font-black">Início</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-black/60 hover:text-black">
        <Search size={24} />
        <span className="text-[10px] font-bold">Busca</span>
      </button>
      <button onClick={onCartClick} className="flex flex-col items-center gap-1 text-black/60 hover:text-black relative">
        <ShoppingCart size={24} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-2 bg-[#4a148c] text-white font-bold text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-md">
            {cartCount}
          </span>
        )}
        <span className="text-[10px] font-bold">Carrinho</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-black/60 hover:text-black">
        <User size={24} />
        <span className="text-[10px] font-bold">Perfil</span>
      </button>
    </div>
  );
}
