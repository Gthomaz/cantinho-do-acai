import React from 'react';

const WhatsAppButton = () => {
  const phoneNumber = "5522999999999"; 
  const message = "Olá! Gostaria de falar com o atendimento do Cantinho do Açaí.";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 px-6 rounded-full font-bold shadow-2xl hover:shadow-[0_0_20px_rgba(37,211,102,0.5)] transition-all duration-300 z-50 flex items-center gap-2 hover:-translate-y-1"
    >
      <span className="text-xl">💬</span> Falar no WhatsApp
    </a>
  );
};

export default WhatsAppButton;
