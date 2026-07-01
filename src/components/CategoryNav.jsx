import React, { useState } from 'react';
import { Menu } from 'lucide-react';

export default function CategoryNav({ categories, selectedCategory, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const currentCategory = categories.find(c => c.id === selectedCategory) || categories[0];

  return (
    <div className="w-full relative z-30">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#a21caf] hover:bg-[#86198f] py-3 px-6 flex justify-between items-center cursor-pointer transition-colors shadow-md"
      >
        <span className="text-white font-bold text-lg tracking-wide uppercase">
          {isOpen ? 'Selecione a Categoria' : currentCategory.name}
        </span>
        <div className="bg-black/20 p-1.5 rounded-lg">
          <Menu className="text-white" size={24} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#701a75] shadow-2xl z-50 rounded-b-2xl overflow-hidden flex flex-col border-t border-white/10 animate-in slide-in-from-top-2 duration-200">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onSelect(cat.id);
                setIsOpen(false);
              }}
              className={`text-left px-6 py-4 border-b border-white/10 transition-colors text-base ${
                selectedCategory === cat.id 
                  ? 'bg-white/20 text-white font-bold border-l-4 border-l-[#39ff14]' 
                  : 'text-pink-100 hover:bg-white/10'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
