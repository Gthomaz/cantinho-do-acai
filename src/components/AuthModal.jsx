import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Phone } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setErrorMsg(error.message);
      else {
        onClose(); // Sucesso
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone
          }
        }
      });
      if (error) setErrorMsg(error.message);
      else setSuccessMsg('Conta criada! Verifique seu e-mail para confirmar.');
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-[70] flex items-center justify-center p-4 backdrop-blur-sm"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-[#1e1e1e] w-full max-w-md rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(57,255,20,0.2)] border border-[#39ff14]/30 relative"
          >
            {/* Fechar */}
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white bg-black/20 p-2 rounded-full transition-colors z-10">
              <X size={20} />
            </button>

            {/* Cabeçalho */}
            <div className="bg-[#4a148c] p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <h2 className="text-3xl font-black text-[#39ff14] drop-shadow-[0_0_10px_rgba(57,255,20,0.5)] relative z-10">
                {isLogin ? 'Bem-vindo(a)!' : 'Criar Conta'}
              </h2>
              <p className="text-purple-200 mt-2 relative z-10">
                {isLogin ? 'Entre para acumular açaís grátis' : 'Cadastre-se e ganhe vantagens'}
              </p>
            </div>

            {/* Formulário */}
            <div className="p-8">
              {errorMsg && <div className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-sm font-medium border border-red-500/30 text-center">{errorMsg}</div>}
              {successMsg && <div className="bg-green-500/20 text-green-400 p-3 rounded-lg mb-4 text-sm font-medium border border-green-500/30 text-center">{successMsg}</div>}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {!isLogin && (
                  <>
                    <div className="space-y-1">
                      <label className="text-sm text-gray-400 font-bold ml-1">Nome Completo</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <input 
                          type="text" 
                          required={!isLogin}
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-[#121212] border border-gray-700 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-[#39ff14] transition-colors"
                          placeholder="João da Silva"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm text-gray-400 font-bold ml-1">WhatsApp</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <input 
                          type="tel" 
                          required={!isLogin}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-[#121212] border border-gray-700 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-[#39ff14] transition-colors"
                          placeholder="(22) 99999-9999"
                        />
                      </div>
                    </div>
                  </>
                )}
                
                <div className="space-y-1">
                  <label className="text-sm text-gray-400 font-bold ml-1">E-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#121212] border border-gray-700 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-[#39ff14] transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-gray-400 font-bold ml-1">Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#121212] border border-gray-700 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-[#39ff14] transition-colors"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#39ff14] text-black font-black text-lg py-3 rounded-xl mt-4 hover:bg-[#32e012] transition-colors shadow-[0_0_15px_rgba(57,255,20,0.4)] disabled:opacity-50"
                >
                  {loading ? 'Aguarde...' : (isLogin ? 'Entrar' : 'Cadastrar')}
                </button>

              </form>

              {/* Alternar Modos */}
              <div className="mt-6 text-center">
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Entre aqui'}
                </button>
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
