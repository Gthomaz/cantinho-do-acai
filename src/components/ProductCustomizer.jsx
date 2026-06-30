import React, { useState, useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const ProductCustomizer = ({ product, onClose }) => {
  const [selectedButter, setSelectedButter] = useState('');
  const [selectedComplement, setSelectedComplement] = useState('');
  const { addToCart } = useContext(CartContext);

  const handleConfirm = () => {
    addToCart({ ...product, options: { selectedButter, selectedComplement } });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-opacity">
      <div className="bg-gray-900 border border-acai-neon/40 rounded-3xl p-6 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>
        <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-acai-neon">
          Montar {product.name}
        </h3>
        
        <div className="space-y-4 mb-8">
          <div className="flex flex-col">
            <label className="text-sm text-gray-300 mb-2 font-medium">Escolha o Creme (Butter):</label>
            <select 
              className="bg-black/50 border border-gray-700 text-white rounded-xl p-3 focus:ring-2 focus:ring-acai-neon focus:border-transparent outline-none transition-all"
              onChange={(e) => setSelectedButter(e.target.value)}
            >
              <option value=''>Selecione...</option>
              <option value='Nutella'>Nutella</option>
              <option value='Ovomaltine'>Ovomaltine</option>
              <option value='Amendoim'>Amendoim</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-300 mb-2 font-medium">Escolha Complementos:</label>
            <input 
              type='text' 
              placeholder='Ex: Leite em pó, Morango...' 
              className="bg-black/50 border border-gray-700 text-white rounded-xl p-3 focus:ring-2 focus:ring-acai-neon focus:border-transparent outline-none transition-all placeholder:text-gray-600"
              onChange={(e) => setSelectedComplement(e.target.value)} 
            />
          </div>
        </div>
        
        <button 
          onClick={handleConfirm}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-acai-neon to-green-400 text-black font-bold text-lg hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] transition-all duration-300 active:scale-95"
        >
          Confirmar e Adicionar
        </button>
      </div>
    </div>
  );
};
export default ProductCustomizer;
