import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, Info, Phone, MapPin } from 'lucide-react';

export default function SidebarMenu({ isOpen, onClose }) {
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
            initial={{ x: '-100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-3/4 max-w-sm bg-bg-dark z-50 flex flex-col shadow-2xl border-r border-[#39ff14]/20"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">Menu</h2>
              <button onClick={onClose} className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="flex flex-col gap-4">
                <button className="flex items-center gap-4 text-gray-300 hover:text-[#39ff14] transition-colors p-3 bg-bg-card rounded-xl border border-gray-800">
                  <Home size={24} />
                  <span className="font-semibold">Início</span>
                </button>
                <button className="flex items-center gap-4 text-gray-300 hover:text-[#39ff14] transition-colors p-3 bg-bg-card rounded-xl border border-gray-800">
                  <MapPin size={24} />
                  <span className="font-semibold">Endereço de Entrega</span>
                </button>
                <button className="flex items-center gap-4 text-gray-300 hover:text-[#39ff14] transition-colors p-3 bg-bg-card rounded-xl border border-gray-800">
                  <Phone size={24} />
                  <span className="font-semibold">Contato (WhatsApp)</span>
                </button>
                <button className="flex items-center gap-4 text-gray-300 hover:text-[#39ff14] transition-colors p-3 bg-bg-card rounded-xl border border-gray-800">
                  <Info size={24} />
                  <span className="font-semibold">Sobre Nós</span>
                </button>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-800 bg-bg-card text-center">
              <p className="text-xs text-gray-500">Cantinho do Açaí © 2026</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
