import React from 'react';

const WhatsAppButton = () => {
  const phoneNumber = "5522999999999"; // Exemplo, substituir pelo número oficial
  const message = "Olá! Gostaria de falar com o atendimento do Cantinho do Açaí.";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="whatsapp-float"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#25D366',
        color: '#fff',
        padding: '15px 25px',
        borderRadius: '50px',
        textDecoration: 'none',
        fontWeight: 'bold',
        zIndex: 1000,
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
      }}
    >
      Falar no WhatsApp
    </a>
  );
};

export default WhatsAppButton;
