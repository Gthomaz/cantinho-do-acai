import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, Info, Phone, MapPin, User } from 'lucide-react';

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
            className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-bg-dark z-50 flex flex-col shadow-2xl border-r border-[#39ff14]/20"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">Menu</h2>
              <button onClick={onClose} className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Área de Login / Cadastro */}
              <div className="bg-[#4a148c] p-4 rounded-xl border border-[#311b92] text-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
                <div className="flex justify-center mb-3 relative z-10">
                  <div className="w-14 h-14 bg-[#311b92] rounded-full flex items-center justify-center border-2 border-[#39ff14] shadow-[0_0_10px_rgba(57,255,20,0.3)]">
                    <User size={28} className="text-[#39ff14]" />
                  </div>
                </div>
                <h3 className="text-white font-bold mb-1 relative z-10 text-lg">Olá, visitante!</h3>
                <p className="text-xs text-purple-200 mb-4 relative z-10">Faça login para salvar seus pedidos e endereços.</p>
                <div className="flex flex-col gap-3 relative z-10">
                  <button className="w-full bg-[#39ff14] text-[#4a148c] py-2.5 rounded-lg font-black shadow-[0_0_10px_rgba(57,255,20,0.4)] active:scale-95 transition-transform">
                    Fazer Login
                  </button>
                  <button className="w-full bg-transparent border-2 border-[#39ff14] text-[#39ff14] py-2 rounded-lg font-bold active:scale-95 transition-transform hover:bg-[#39ff14]/10">
                    Criar Conta
                  </button>
                </div>
              </div>

              {/* Navegação Secundária */}
              <div className="flex flex-col gap-3">
                <button className="flex items-center gap-4 text-gray-300 hover:text-[#39ff14] transition-colors p-3.5 bg-bg-card rounded-xl border border-gray-800 shadow-sm">
                  <Home size={22} className="text-brand-yellow" />
                  <span className="font-semibold">Início</span>
                </button>
                <button className="flex items-center gap-4 text-gray-300 hover:text-[#39ff14] transition-colors p-3.5 bg-bg-card rounded-xl border border-gray-800 shadow-sm">
                  <MapPin size={22} className="text-brand-yellow" />
                  <span className="font-semibold">Endereço de Entrega</span>
                </button>
                <button className="flex items-center gap-4 text-gray-300 hover:text-[#39ff14] transition-colors p-3.5 bg-bg-card rounded-xl border border-gray-800 shadow-sm">
                  <Phone size={22} className="text-brand-yellow" />
                  <span className="font-semibold">Contato (WhatsApp)</span>
                </button>
                <button className="flex items-center gap-4 text-gray-300 hover:text-[#39ff14] transition-colors p-3.5 bg-bg-card rounded-xl border border-gray-800 shadow-sm">
                  <Info size={22} className="text-brand-yellow" />
                  <span className="font-semibold">Sobre Nós</span>
                </button>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-800 bg-bg-card text-center">
              <p className="text-xs text-gray-500 font-medium">Cantinho do Açaí © 2026</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
