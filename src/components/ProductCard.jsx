import React from 'react';

export default function ProductCard({ product, onClick }) {
  return (
    <div 
      onClick={() => onClick(product)}
      className="flex items-center gap-4 bg-bg-card p-4 rounded-2xl border border-gray-800 hover:border-brand-purple transition-colors cursor-pointer active:scale-[0.98]"
    >
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-24 h-24 object-cover rounded-xl shadow-md border border-brand-purple/20"
      />
      <div className="flex flex-col flex-1">
        <h3 className="font-bold text-lg text-white mb-1">{product.name}</h3>
        <p className="text-sm text-gray-400 line-clamp-2 leading-tight mb-2">
          {product.description}
        </p>
        <span className="font-bold text-brand-yellow mt-auto">
          R$ {product.price.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
