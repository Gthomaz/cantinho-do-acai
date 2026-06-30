import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Banknote, QrCode, CheckCircle, Store, Bike, CreditCard } from 'lucide-react';

export default function Checkout({ isOpen, onClose, cartItems, total }) {
  const [deliveryMethod, setDeliveryMethod] = useState('entrega'); // 'entrega' ou 'retirada'
  const [paymentMethod, setPaymentMethod] = useState('pix'); // 'pix', 'dinheiro', 'maquininha'
  const [address, setAddress] = useState({ rua: '', numero: '', complemento: '' });
  const [changeFor, setChangeFor] = useState(''); // Troco para (dinheiro)
  const [showPixCode, setShowPixCode] = useState(false);

  const formatWhatsAppMessage = () => {
    let msg = `*NOVO PEDIDO - CANTINHO DO AÇAÍ* 💜\n\n`;
    
    cartItems.forEach((item, idx) => {
      const qty = item.quantity || 1;
      const itemTotal = (item.finalPrice || item.price) * qty;
      msg += `*${idx + 1}. ${qty}x ${item.name}* - R$ ${itemTotal.toFixed(2)}\n`;
      if (item.options?.cremes?.length) msg += `   Cremes: ${item.options.cremes.map(c => c.name).join(', ')}\n`;
      if (item.options?.complementos?.length) msg += `   Extras: ${item.options.complementos.map(c => c.name).join(', ')}\n`;
      if (item.options?.adicionais?.length) msg += `   Adic.: ${item.options.adicionais.map(c => c.name).join(', ')}\n`;
    });

    msg += `\n*Valor Total:* R$ ${total.toFixed(2)}\n`;
    
    msg += `\n*Tipo:* ${deliveryMethod === 'entrega' ? '🛵 Entrega' : '🏪 Retirada na Loja'}\n`;
    
    if (deliveryMethod === 'entrega') {
      msg += `*Endereço:* ${address.rua}, ${address.numero} ${address.complemento ? `(${address.complemento})` : ''}\n`;
    }

    let pagamento = '';
    if (paymentMethod === 'pix') pagamento = 'Pix';
    else if (paymentMethod === 'maquininha') pagamento = 'Cartão (Maquininha na entrega)';
    else if (paymentMethod === 'dinheiro') {
      pagamento = 'Dinheiro';
      if (changeFor) pagamento += ` (Troco para R$ ${changeFor})`;
    }
    
    msg += `\n*Pagamento:* ${pagamento}`;

    return encodeURIComponent(msg);
  };

  const handleCheckout = () => {
    if (deliveryMethod === 'entrega' && (!address.rua || !address.numero)) {
      alert("Por favor, preencha o endereço de entrega!");
      return;
    }

    if (paymentMethod === 'pix' && !showPixCode) {
      // Mostrar o código pix na tela primeiro
      setShowPixCode(true);
      return;
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

          <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
            
            {/* Método de Entrega */}
            <section>
              <h3 className="text-white font-bold mb-4">Como deseja receber?</h3>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setDeliveryMethod('entrega')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${deliveryMethod === 'entrega' ? 'border-[#39ff14] bg-[#39ff14]/10 text-[#39ff14]' : 'border-gray-700 bg-bg-card text-gray-400 hover:border-gray-500'}`}
                >
                  <Bike size={28} />
                  <span className="font-bold">Entrega</span>
                </button>
                <button 
                  onClick={() => setDeliveryMethod('retirada')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${deliveryMethod === 'retirada' ? 'border-[#39ff14] bg-[#39ff14]/10 text-[#39ff14]' : 'border-gray-700 bg-bg-card text-gray-400 hover:border-gray-500'}`}
                >
                  <Store size={28} />
                  <span className="font-bold">Retirada</span>
                </button>
              </div>
            </section>

            {/* Endereço (condicional) */}
            <AnimatePresence>
              {deliveryMethod === 'entrega' && (
                <motion.section
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2 mt-4">
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
                        placeholder="Complemento" 
                        value={address.complemento}
                        onChange={(e) => setAddress({...address, complemento: e.target.value})}
                        className="flex-1 bg-bg-card border border-gray-700 rounded-xl p-4 text-white focus:border-[#39ff14] outline-none transition-colors"
                      />
                    </div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            {/* Forma de Pagamento */}
            <section>
              <h3 className="text-white font-bold mb-4">Forma de Pagamento</h3>
              <div className="grid grid-cols-1 gap-3">
                
                {/* Pix App */}
                <button 
                  onClick={() => { setPaymentMethod('pix'); setShowPixCode(false); }}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${paymentMethod === 'pix' ? 'border-[#39ff14] bg-[#39ff14]/10' : 'border-gray-700 bg-bg-card hover:border-gray-500'}`}
                >
                  <QrCode className={paymentMethod === 'pix' ? 'text-[#39ff14]' : 'text-gray-400'} />
                  <div className="text-left">
                    <p className={`font-bold ${paymentMethod === 'pix' ? 'text-white' : 'text-gray-300'}`}>Pix (Gerado pelo app)</p>
                    <p className="text-xs text-gray-500">Pague agora e agilize o pedido</p>
                  </div>
                  {paymentMethod === 'pix' && <CheckCircle className="ml-auto text-[#39ff14]" size={20} />}
                </button>

                {/* UI do PIX Gerado */}
                <AnimatePresence>
                  {paymentMethod === 'pix' && showPixCode && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-white p-4 rounded-xl flex flex-col items-center text-center gap-3"
                    >
                      <h4 className="text-black font-bold">Chave Pix Copia e Cola</h4>
                      <div className="bg-gray-100 p-3 rounded border border-gray-300 w-full text-xs text-gray-600 break-all">
                        00020126580014br.gov.bcb.pix0136cantinho-acai-aleatorio-chave-aqui5204000053039865802BR5920Cantinho Do Acai6009SAO PAULO62070503***63040E0A
                      </div>
                      <button 
                        onClick={() => alert("Código copiado! Pague no seu banco e clique em Enviar Pedido por WhatsApp.")}
                        className="bg-[#4a148c] text-white px-4 py-2 rounded-lg font-bold w-full"
                      >
                        Copiar Código
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Maquininha */}
                <button 
                  onClick={() => { setPaymentMethod('maquininha'); setShowPixCode(false); }}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${paymentMethod === 'maquininha' ? 'border-[#39ff14] bg-[#39ff14]/10' : 'border-gray-700 bg-bg-card hover:border-gray-500'}`}
                >
                  <CreditCard className={paymentMethod === 'maquininha' ? 'text-[#39ff14]' : 'text-gray-400'} />
                  <div className="text-left flex-1">
                    <p className={`font-bold ${paymentMethod === 'maquininha' ? 'text-white' : 'text-gray-300'}`}>Cartão (Maquininha)</p>
                    <p className="text-xs text-gray-500">
                      {deliveryMethod === 'entrega' ? 'Levamos a maquininha até você' : 'Pague no balcão da loja'}
                    </p>
                  </div>
                  {paymentMethod === 'maquininha' && <CheckCircle className="ml-auto text-[#39ff14]" size={20} />}
                </button>

                {/* Dinheiro */}
                <button 
                  onClick={() => { setPaymentMethod('dinheiro'); setShowPixCode(false); }}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${paymentMethod === 'dinheiro' ? 'border-[#39ff14] bg-[#39ff14]/10' : 'border-gray-700 bg-bg-card hover:border-gray-500'}`}
                >
                  <Banknote className={paymentMethod === 'dinheiro' ? 'text-[#39ff14]' : 'text-gray-400'} />
                  <div className="text-left">
                    <p className={`font-bold ${paymentMethod === 'dinheiro' ? 'text-white' : 'text-gray-300'}`}>Dinheiro</p>
                    <p className="text-xs text-gray-500">Pagamento no ato</p>
                  </div>
                  {paymentMethod === 'dinheiro' && <CheckCircle className="ml-auto text-[#39ff14]" size={20} />}
                </button>
                
                {/* Troco para Dinheiro */}
                <AnimatePresence>
                  {paymentMethod === 'dinheiro' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-2 pr-2"
                    >
                      <input 
                        type="text" 
                        placeholder="Troco para quanto? (Ex: 50)" 
                        value={changeFor}
                        onChange={(e) => setChangeFor(e.target.value)}
                        className="w-full bg-bg-dark border border-gray-700 rounded-lg p-3 text-white focus:border-brand-yellow outline-none transition-colors mt-2"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </section>
          </div>

          {/* Footer Finalizar */}
          <div className="fixed bottom-0 left-0 w-full p-6 border-t border-gray-800 bg-[#4a148c] pb-safe rounded-t-[30px] shadow-[0_-10px_30px_rgba(74,20,140,0.5)] z-20">
            <div className="flex justify-between items-center mb-4">
              <span className="text-purple-200 text-lg">Total a pagar</span>
              <span className="text-3xl font-black text-[#39ff14]">R$ {total.toFixed(2)}</span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full bg-[#25D366] text-white font-black py-4 rounded-2xl text-lg hover:bg-[#20b858] transition-colors active:scale-95 shadow-[0_0_20px_rgba(37,211,102,0.4)] flex items-center justify-center gap-3"
            >
              {paymentMethod === 'pix' && !showPixCode ? 'Gerar Código Pix' : 'Enviar Pedido por WhatsApp'}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
