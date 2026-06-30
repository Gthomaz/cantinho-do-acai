import React, { useState } from 'react';
import { Settings, Users, Box, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductManager from '../components/ProductManager';

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState('dashboard'); // 'dashboard' or 'products'
  return (
    <div className="min-h-screen bg-[#121212] text-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex justify-between items-center bg-[#1e1e1e] p-6 rounded-2xl shadow-[0_0_15px_rgba(57,255,20,0.1)] border border-[#39ff14]/20">
          <div>
            <h1 className="text-3xl font-black text-[#39ff14] mb-1">Quartel General</h1>
            <p className="text-gray-400">Painel do CEO - Cantinho do Açaí</p>
          </div>
          {activeView === 'dashboard' ? (
            <Link to="/" className="flex items-center gap-2 bg-[#4a148c] hover:bg-[#380d6e] text-white px-4 py-2 rounded-lg font-bold transition-colors">
              <ArrowLeft size={20} />
              Voltar para Loja
            </Link>
          ) : (
            <button onClick={() => setActiveView('dashboard')} className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-bold transition-colors">
              <ArrowLeft size={20} />
              Voltar ao Início
            </button>
          )}
        </header>

        {/* Dynamic Content */}
        {activeView === 'dashboard' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card: Produtos */}
          <div 
            onClick={() => setActiveView('products')}
            className="bg-[#1e1e1e] p-6 rounded-2xl border border-gray-800 hover:border-[#39ff14]/50 transition-colors cursor-pointer group"
          >
            <div className="bg-[#39ff14]/10 w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Box className="text-[#39ff14]" size={28} />
            </div>
            <h2 className="text-xl font-bold mb-2">Produtos & Preços</h2>
            <p className="text-gray-400 text-sm">Gerencie o cardápio, adicione novos itens e altere os valores.</p>
          </div>

          {/* Card: Usuários */}
          <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-colors cursor-pointer group">
            <div className="bg-purple-500/10 w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="text-purple-400" size={28} />
            </div>
            <h2 className="text-xl font-bold mb-2">Clientes & Acessos</h2>
            <p className="text-gray-400 text-sm">Veja quem se cadastrou, gerencie bloqueios e privilégios.</p>
          </div>

          {/* Card: Mídia */}
          <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-colors cursor-pointer group">
            <div className="bg-blue-500/10 w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ImageIcon className="text-blue-400" size={28} />
            </div>
            <h2 className="text-xl font-bold mb-2">Fotos & Mídia</h2>
            <p className="text-gray-400 text-sm">Faça upload de fotos direto do seu celular para os produtos.</p>
          </div>

          {/* Card: Configurações */}
          <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-gray-800 hover:border-orange-500/50 transition-colors cursor-pointer group">
            <div className="bg-orange-500/10 w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Settings className="text-orange-400" size={28} />
            </div>
            <h2 className="text-xl font-bold mb-2">Configurações Gerais</h2>
            <p className="text-gray-400 text-sm">Taxas de entrega, horários de funcionamento e status da loja.</p>
          </div>

        </div>
        ) : activeView === 'products' ? (
          <ProductManager />
        ) : null}

      </div>
    </div>
  );
}
