import React, { useState, useEffect, useContext, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Phone, User, Camera, Save, Map } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { AuthContext } from '../contexts/AuthContext';

export default function UserProfile({ isOpen, onClose }) {
  const { user, profile } = useContext(AuthContext);
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const fileInputRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    address: '',
    address_number: '',
    neighborhood: '',
    city: '',
    cep: '',
    reference_point: '',
    avatar_url: ''
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        address: profile.address || '',
        address_number: profile.address_number || '',
        neighborhood: profile.neighborhood || '',
        city: profile.city || '',
        cep: profile.cep || '',
        reference_point: profile.reference_point || '',
        avatar_url: profile.avatar_url || ''
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
          address: formData.address,
          address_number: formData.address_number,
          neighborhood: formData.neighborhood,
          city: formData.city,
          cep: formData.cep,
          reference_point: formData.reference_point,
          avatar_url: formData.avatar_url,
        })
        .eq('id', user.id);

      if (error) throw error;
      setSuccessMsg('Perfil atualizado com sucesso!');
      
      // Auto close after success
      setTimeout(() => {
        onClose();
        setSuccessMsg('');
      }, 1500);
      
    } catch (error) {
      setErrorMsg('Erro ao salvar: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadAvatar = async (e) => {
    try {
      setUploading(true);
      setErrorMsg('');

      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('Você deve selecionar uma imagem.');
      }

      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      
      setFormData((prev) => ({ ...prev, avatar_url: data.publicUrl }));
      setSuccessMsg('Foto carregada! Clique em Salvar Alterações.');

    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-[80] flex items-center justify-center p-4 backdrop-blur-sm"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-[#1e1e1e] w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl shadow-[0_0_30px_rgba(57,255,20,0.2)] border border-[#39ff14]/30 relative"
          >
            {/* Fechar */}
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white bg-black/20 p-2 rounded-full transition-colors z-10">
              <X size={20} />
            </button>

            {/* Cabeçalho */}
            <div className="bg-[#4a148c] pt-10 pb-16 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <h2 className="text-3xl font-black text-[#39ff14] drop-shadow-[0_0_10px_rgba(57,255,20,0.5)] relative z-10">
                Meu Perfil
              </h2>
            </div>

            {/* Avatar Section - Floating overlapping header */}
            <div className="relative -mt-12 flex justify-center z-20">
              <div className="relative">
                <div className="w-24 h-24 bg-[#311b92] rounded-full flex items-center justify-center border-4 border-[#1e1e1e] overflow-hidden shadow-xl">
                  {formData.avatar_url ? (
                    <img src={formData.avatar_url} alt="Avatar" className="w-full h-full object-cover bg-white" />
                  ) : (
                    <User size={40} className="text-[#39ff14]" />
                  )}
                </div>
                
                <button 
                  onClick={() => fileInputRef.current.click()}
                  disabled={uploading}
                  className="absolute bottom-0 right-0 bg-[#39ff14] p-2 rounded-full text-black hover:bg-white transition-colors shadow-lg disabled:opacity-50"
                  title="Trocar Foto"
                >
                  <Camera size={16} />
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleUploadAvatar} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>
            </div>

            {/* Formulário */}
            <div className="p-6">
              {errorMsg && <div className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-sm font-medium border border-red-500/30 text-center">{errorMsg}</div>}
              {successMsg && <div className="bg-green-500/20 text-green-400 p-3 rounded-lg mb-4 text-sm font-medium border border-green-500/30 text-center">{successMsg}</div>}
              
              <form onSubmit={handleSave} className="space-y-5">
                
                {/* Dados Pessoais */}
                <div className="space-y-3">
                  <h3 className="text-white font-bold flex items-center gap-2 border-b border-gray-800 pb-2">
                    <User size={18} className="text-[#39ff14]" /> Dados Pessoais
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input 
                      type="text" name="full_name" value={formData.full_name} onChange={handleChange}
                      placeholder="Nome Completo"
                      className="w-full bg-[#121212] border border-gray-700 text-white rounded-xl p-3 focus:outline-none focus:border-[#39ff14] transition-colors"
                    />
                    <input 
                      type="tel" name="phone" value={formData.phone} onChange={handleChange}
                      placeholder="WhatsApp (ex: 22 99999-9999)"
                      className="w-full bg-[#121212] border border-gray-700 text-white rounded-xl p-3 focus:outline-none focus:border-[#39ff14] transition-colors"
                    />
                  </div>
                </div>

                {/* Endereço */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-white font-bold flex items-center gap-2 border-b border-gray-800 pb-2">
                    <MapPin size={18} className="text-[#39ff14]" /> Endereço de Entrega
                  </h3>
                  
                  <div className="grid grid-cols-4 gap-3">
                    <input 
                      type="text" name="cep" value={formData.cep} onChange={handleChange}
                      placeholder="CEP"
                      className="col-span-4 md:col-span-1 w-full bg-[#121212] border border-gray-700 text-white rounded-xl p-3 focus:outline-none focus:border-[#39ff14] transition-colors"
                    />
                    <input 
                      type="text" name="address" value={formData.address} onChange={handleChange}
                      placeholder="Rua / Avenida"
                      className="col-span-4 md:col-span-3 w-full bg-[#121212] border border-gray-700 text-white rounded-xl p-3 focus:outline-none focus:border-[#39ff14] transition-colors"
                    />
                    
                    <input 
                      type="text" name="address_number" value={formData.address_number} onChange={handleChange}
                      placeholder="Número"
                      className="col-span-2 md:col-span-1 w-full bg-[#121212] border border-gray-700 text-white rounded-xl p-3 focus:outline-none focus:border-[#39ff14] transition-colors"
                    />
                    <input 
                      type="text" name="neighborhood" value={formData.neighborhood} onChange={handleChange}
                      placeholder="Bairro"
                      className="col-span-2 md:col-span-3 w-full bg-[#121212] border border-gray-700 text-white rounded-xl p-3 focus:outline-none focus:border-[#39ff14] transition-colors"
                    />
                    
                    <input 
                      type="text" name="city" value={formData.city} onChange={handleChange}
                      placeholder="Cidade"
                      className="col-span-2 md:col-span-2 w-full bg-[#121212] border border-gray-700 text-white rounded-xl p-3 focus:outline-none focus:border-[#39ff14] transition-colors"
                    />
                    <input 
                      type="text" name="reference_point" value={formData.reference_point} onChange={handleChange}
                      placeholder="Ponto de Referência"
                      className="col-span-2 md:col-span-2 w-full bg-[#121212] border border-gray-700 text-white rounded-xl p-3 focus:outline-none focus:border-[#39ff14] transition-colors"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={loading || uploading}
                  className="w-full bg-[#39ff14] text-black font-black text-lg py-3 rounded-xl mt-6 hover:bg-[#32e012] transition-colors shadow-[0_0_15px_rgba(57,255,20,0.4)] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Save size={20} /> {loading ? 'Salvando...' : 'Salvar Alterações'}
                </button>

              </form>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
