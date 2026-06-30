import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus } from 'lucide-react';
import { menuData } from '../data/menu';

export default function BottomSheet({ product, onClose, onAdd }) {
  const [selectedCremes, setSelectedCremes] = useState([]);
  const [selectedComplementos, setSelectedComplementos] = useState([]);
  const [selectedAdicionais, setSelectedAdicionais] = useState([]);

  if (!product) return null;

  const handleToggle = (item, type, list, setList) => {
    if (list.some(i => i.id === item.id)) {
      setList(list.filter(i => i.id !== item.id));
    } else {
      setList([...list, item]);
    }
  };

  const calculateTotal = () => {
    let total = product.price;
    selectedAdicionais.forEach(item => total += item.price);
    selectedComplementos.forEach(item => total += item.price); 
    return total;
  };

  const handleConfirm = () => {
    onAdd({
      ...product,
      options: {
        cremes: selectedCremes,
        complementos: selectedComplementos,
        adicionais: selectedAdicionais
      },
      finalPrice: calculateTotal()
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ y: '100%' }} 
            animate={{ y: 0 }} 
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 w-full bg-bg-dark z-50 rounded-t-3xl h-[85vh] flex flex-col shadow-[0_-10px_40px_rgba(74,20,140,0.5)]"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">Montar {product.name}</h2>
              <button onClick={onClose} className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* Content Scroll */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
              
              {/* Cremes */}
              <section>
                <h3 className="font-bold text-lg text-brand-yellow mb-4">Escolha os Cremes</h3>
                <div className="grid grid-cols-2 gap-3">
                  {menuData.cremes.map(creme => (
                    <button 
                      key={creme.id}
                      onClick={() => handleToggle(creme, 'cremes', selectedCremes, setSelectedCremes)}
                      className={`p-3 rounded-xl border text-left font-medium transition-all ${
                        selectedCremes.some(c => c.id === creme.id)
                          ? 'border-brand-purple bg-brand-purple/20 text-white'
                          : 'border-gray-800 bg-bg-card text-gray-400'
                      }`}
                    >
                      {creme.name}
                    </button>
                  ))}
                </div>
              </section>

              {/* Complementos */}
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg text-brand-yellow">Complementos Extras</h3>
                  <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">+ R$ 2,00 cada</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {menuData.complementos.map(comp => (
                    <button 
                      key={comp.id}
                      onClick={() => handleToggle(comp, 'complementos', selectedComplementos, setSelectedComplementos)}
                      className={`p-3 rounded-xl border text-left font-medium transition-all flex justify-between items-center ${
                        selectedComplementos.some(c => c.id === comp.id)
                          ? 'border-brand-purple bg-brand-purple/20 text-white'
                          : 'border-gray-800 bg-bg-card text-gray-400'
                      }`}
                    >
                      <span>{comp.name}</span>
                      {selectedComplementos.some(c => c.id === comp.id) ? <Minus size={16} className="text-red-400"/> : <Plus size={16} className="text-brand-purple"/>}
                    </button>
                  ))}
                </div>
              </section>

              {/* Adicionais Pagos */}
              <section>
                <h3 className="font-bold text-lg text-brand-yellow mb-4">Adicionais Premium</h3>
                <div className="space-y-3">
                  {menuData.adicionais.map(ad => (
                    <div key={ad.id} className="flex justify-between items-center p-3 rounded-xl border border-gray-800 bg-bg-card">
                      <span className="text-gray-300">{ad.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">+ R$ {ad.price.toFixed(2)}</span>
                        <button 
                          onClick={() => handleToggle(ad, 'adicionais', selectedAdicionais, setSelectedAdicionais)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                            selectedAdicionais.some(a => a.id === ad.id)
                              ? 'bg-brand-yellow text-black'
                              : 'bg-brand-purple text-white'
                          }`}
                        >
                          {selectedAdicionais.some(a => a.id === ad.id) ? <Minus size={16}/> : <Plus size={16}/>}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              
            </div>

            {/* Footer / Add Button */}
            <div className="absolute bottom-0 w-full p-6 border-t border-gray-800 bg-bg-dark">
              <button 
                onClick={handleConfirm}
                className="w-full bg-brand-purple hover:bg-brand-purple-dark text-white font-bold py-4 rounded-2xl flex justify-between items-center px-6 transition-all active:scale-95 shadow-[0_0_20px_rgba(74,20,140,0.4)]"
              >
                <span>Adicionar ao Pedido</span>
                <span className="text-brand-yellow">R$ {calculateTotal().toFixed(2)}</span>
              </button>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
