import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, CreditCard, Banknote, QrCode, Smartphone, CheckCircle } from 'lucide-react';

export default function Checkout({ isOpen, onClose, cartItems, total }) {
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [address, setAddress] = useState({ rua: '', numero: '', complemento: '' });

  const formatWhatsAppMessage = () => {
    let msg = `*NOVO PEDIDO - CANTINHO DO AÇAÍ* 💜\n\n`;
    
    cartItems.forEach((item, idx) => {
      msg += `*${idx + 1}. ${item.name}* - R$ ${(item.finalPrice || item.price).toFixed(2)}\n`;
      if (item.options?.cremes?.length) msg += `   Cremes: ${item.options.cremes.map(c => c.name).join(', ')}\n`;
      if (item.options?.complementos?.length) msg += `   Extras: ${item.options.complementos.map(c => c.name).join(', ')}\n`;
      if (item.options?.adicionais?.length) msg += `   Adic.: ${item.options.adicionais.map(c => c.name).join(', ')}\n`;
    });

    msg += `\n*Valor Total:* R$ ${total.toFixed(2)}\n`;
    msg += `\n*Endereço de Entrega:*\n${address.rua}, ${address.numero} ${address.complemento ? `(${address.complemento})` : ''}\n`;
    msg += `\n*Forma de Pagamento:* ${paymentMethod.toUpperCase()}`;

    return encodeURIComponent(msg);
  };

  const handleCheckout = () => {
    if (!address.rua || !address.numero) {
      alert("Por favor, preencha o endereço de entrega!");
      return;
    }

    if (paymentMethod === 'credito_online') {
      alert("A integração do Pagar.me (Cartão de Crédito Online) requer a inserção das chaves de API secretas. Redirecionando para checkout via WhatsApp provisoriamente.");
    }

    const whatsappNumber = "5511999999999"; // Substituir pelo número real
    const url = `https://wa.me/${whatsappNumber}?text=${formatWhatsAppMessage()}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ y: '100%' }} 
          animate={{ y: 0 }} 
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 bg-bg-dark z-[60] flex flex-col"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 bg-[#4a148c] shadow-md rounded-b-[30px]">
            <h2 className="text-2xl font-black text-[#39ff14]">Finalizar Pedido</h2>
            <button onClick={onClose} className="bg-white/20 p-2 rounded-full text-white hover:bg-white/30">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Endereço */}
            <section>
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <MapPin className="text-[#39ff14]" /> Endereço de Entrega
              </h3>
              <div className="space-y-3">
                <input 
                  type="text" 
                  placeholder="Rua / Avenida" 
                  value={address.rua}
                  onChange={(e) => setAddress({...address, rua: e.target.value})}
                  className="w-full bg-bg-card border border-gray-700 rounded-xl p-4 text-white focus:border-[#39ff14] outline-none transition-colors"
                />
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    placeholder="Número" 
                    value={address.numero}
                    onChange={(e) => setAddress({...address, numero: e.target.value})}
                    className="w-1/3 bg-bg-card border border-gray-700 rounded-xl p-4 text-white focus:border-[#39ff14] outline-none transition-colors"
                  />
                  <input 
                    type="text" 
                    placeholder="Complemento (Opcional)" 
                    value={address.complemento}
                    onChange={(e) => setAddress({...address, complemento: e.target.value})}
                    className="flex-1 bg-bg-card border border-gray-700 rounded-xl p-4 text-white focus:border-[#39ff14] outline-none transition-colors"
                  />
                </div>
              </div>
            </section>

            {/* Forma de Pagamento */}
            <section>
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <CreditCard className="text-[#39ff14]" /> Forma de Pagamento
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => setPaymentMethod('pix')}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${paymentMethod === 'pix' ? 'border-[#39ff14] bg-[#39ff14]/10' : 'border-gray-700 bg-bg-card hover:border-gray-500'}`}
                >
                  <QrCode className={paymentMethod === 'pix' ? 'text-[#39ff14]' : 'text-gray-400'} />
                  <div className="text-left">
                    <p className={`font-bold ${paymentMethod === 'pix' ? 'text-white' : 'text-gray-300'}`}>Pix (Na entrega)</p>
                    <p className="text-xs text-gray-500">Rápido e sem taxas</p>
                  </div>
                  {paymentMethod === 'pix' && <CheckCircle className="ml-auto text-[#39ff14]" size={20} />}
                </button>

                <button 
                  onClick={() => setPaymentMethod('credito_online')}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${paymentMethod === 'credito_online' ? 'border-[#39ff14] bg-[#39ff14]/10' : 'border-gray-700 bg-bg-card hover:border-gray-500'}`}
                >
                  <Smartphone className={paymentMethod === 'credito_online' ? 'text-[#39ff14]' : 'text-gray-400'} />
                  <div className="text-left">
                    <p className={`font-bold ${paymentMethod === 'credito_online' ? 'text-white' : 'text-gray-300'}`}>Cartão de Crédito Online</p>
                    <p className="text-xs text-brand-yellow font-bold">Via Pagar.me</p>
                  </div>
                  {paymentMethod === 'credito_online' && <CheckCircle className="ml-auto text-[#39ff14]" size={20} />}
                </button>

                <button 
                  onClick={() => setPaymentMethod('maquininha')}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${paymentMethod === 'maquininha' ? 'border-[#39ff14] bg-[#39ff14]/10' : 'border-gray-700 bg-bg-card hover:border-gray-500'}`}
                >
                  <Banknote className={paymentMethod === 'maquininha' ? 'text-[#39ff14]' : 'text-gray-400'} />
                  <div className="text-left">
                    <p className={`font-bold ${paymentMethod === 'maquininha' ? 'text-white' : 'text-gray-300'}`}>Pagar na Entrega</p>
                    <p className="text-xs text-gray-500">Levar maquininha ou troco</p>
                  </div>
                  {paymentMethod === 'maquininha' && <CheckCircle className="ml-auto text-[#39ff14]" size={20} />}
                </button>
              </div>
            </section>
          </div>

          {/* Footer Finalizar */}
          <div className="p-6 border-t border-gray-800 bg-[#4a148c] pb-safe rounded-t-[30px] shadow-[0_-10px_30px_rgba(74,20,140,0.5)]">
            <div className="flex justify-between items-center mb-6">
              <span className="text-purple-200 text-lg">Total a pagar</span>
              <span className="text-3xl font-black text-[#39ff14]">R$ {total.toFixed(2)}</span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full bg-[#25D366] text-white font-black py-4 rounded-2xl text-lg hover:bg-[#20b858] transition-colors active:scale-95 shadow-[0_0_20px_rgba(37,211,102,0.4)] flex items-center justify-center gap-3"
            >
              Enviar Pedido por WhatsApp
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
