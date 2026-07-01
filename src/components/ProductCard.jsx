import React from 'react';

export default function ProductCard({ product, onClick }) {
  return (
    <div 
      onClick={() => onClick(product)}
      className="flex items-center gap-4 bg-[#1e1e1e] p-4 rounded-2xl border border-gray-800 hover:border-brand-purple transition-colors cursor-pointer active:scale-[0.98]"
    >
      <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-black/50 border border-brand-purple/20 shadow-md">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-[10px]">Sem Foto</div>
        )}
      </div>
      <div className="flex-1 py-1">
        <h3 className="font-bold text-[17px] text-white mb-1 leading-tight line-clamp-2">{product.name}</h3>
        {product.description && (
          <p className="text-sm text-gray-400 line-clamp-2 leading-tight mb-2">
            {product.description}
          </p>
        )}
        <div className="font-black text-brand-yellow mt-1 text-lg">
          R$ {Number(product.price).toFixed(2)}
        </div>
      </div>
    </div>
  );
}
