import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2 } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cartItems, onRemove, updateQuantity }) {
  const total = cartItems.reduce((acc, item) => acc + ((item.finalPrice || item.price) * (item.quantity || 1)), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-bg-dark z-50 flex flex-col shadow-2xl border-l border-brand-purple/20"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold text-white">Seu Pedido</h2>
              <button onClick={onClose} className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <span className="text-6xl mb-4">🛒</span>
                  <p>O carrinho está vazio.</p>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={idx} className="bg-bg-card p-4 rounded-2xl border border-gray-800 relative">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-lg">{item.name}</h4>
                        {item.quantity > 1 && <span className="bg-brand-purple text-white text-xs px-2 py-0.5 rounded-full">x{item.quantity}</span>}
                      </div>
                      <button onClick={() => onRemove(idx)} className="text-red-500 hover:text-red-400 p-1">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <div className="text-xs text-gray-400 mt-2 space-y-1">
                      {item.options?.cremes?.length > 0 && <p><span className="text-brand-yellow">Cremes:</span> {item.options.cremes.map(c => c.name).join(', ')}</p>}
                      {item.options?.complementos?.length > 0 && <p><span className="text-brand-yellow">Extras:</span> {item.options.complementos.map(c => c.name).join(', ')}</p>}
                      {item.options?.adicionais?.length > 0 && <p><span className="text-brand-yellow">Adic.:</span> {item.options.adicionais.map(a => a.name).join(', ')}</p>}
                    </div>

                    <div className="mt-4 flex justify-between items-center border-t border-gray-800 pt-3">
                      <div className="flex items-center gap-3 bg-bg-dark rounded-full px-3 py-1">
                        <button onClick={() => updateQuantity && updateQuantity(idx, -1)} className="text-gray-400 hover:text-white font-bold text-lg px-2">-</button>
                        <span className="text-white font-bold w-4 text-center">{item.quantity || 1}</span>
                        <button onClick={() => updateQuantity && updateQuantity(idx, 1)} className="text-brand-yellow hover:text-brand-yellow/80 font-bold text-lg px-2">+</button>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-gray-400 text-xs">Total do Item</span>
                        <span className="font-bold text-brand-yellow">R$ {((item.finalPrice || item.price) * (item.quantity || 1)).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-800 bg-bg-card pb-safe">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-300 text-lg">Total do Pedido</span>
                  <span className="text-3xl font-black text-[#39ff14]">R$ {total.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => {
                    onClose();
                    if(window.openCheckout) window.openCheckout();
                  }} 
                  className="w-full bg-[#39ff14] text-[#4a148c] font-black py-4 rounded-2xl text-lg hover:bg-[#32e012] transition-colors active:scale-95 shadow-[0_0_20px_rgba(57,255,20,0.4)]"
                >
                  Continuar para Pagamento
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
