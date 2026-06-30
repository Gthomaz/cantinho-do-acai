import React from 'react';

export default function CategoryNav({ categories, selectedCategory, onSelect }) {
  return (
    <div className="w-full py-3 px-2 bg-bg-dark/95 backdrop-blur-md border-b border-brand-purple/10">
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`whitespace-nowrap px-3 py-1.5 text-[13px] rounded-full font-semibold transition-all duration-300 ${
              selectedCategory === cat.id 
                ? 'bg-brand-purple text-cyan-400 shadow-[0_0_15px_rgba(74,20,140,0.5)]' 
                : 'bg-bg-card text-gray-300 border border-gray-700 hover:bg-gray-800'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
