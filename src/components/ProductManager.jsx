import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Loader2, Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { menuData } from '../data/menu'; // Para as categorias

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: menuData.categories[0].id,
    description: '',
    image: '/images/acai.png',
    type: 'product',
    is_active: true
  });

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('acai_products')
      .select('*')
      .order('type', { ascending: true })
      .order('category', { ascending: true })
      .order('price', { ascending: true });
      
    if (data) setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      category: menuData.categories[0].id,
      description: '',
      image: '/images/acai.png',
      type: 'product',
      is_active: true
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category || menuData.categories[0].id,
      description: product.description || '',
      image: product.image || '/images/acai.png',
      type: product.type,
      is_active: product.is_active
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...formData,
      price: parseFloat(formData.price)
    };

    if (editingProduct) {
      // Atualizar
      const { error } = await supabase
        .from('acai_products')
        .update(payload)
        .eq('id', editingProduct.id);
      
      if (!error) {
        setIsModalOpen(false);
        fetchProducts();
      } else {
        alert("Erro ao atualizar: " + error.message);
      }
    } else {
      // Inserir
      const { error } = await supabase
        .from('acai_products')
        .insert([payload]);
        
      if (!error) {
        setIsModalOpen(false);
        fetchProducts();
      } else {
        alert("Erro ao adicionar: " + error.message);
      }
    }
    setSaving(false);
  };

  const handleToggleActive = async (id, currentStatus) => {
    await supabase
      .from('acai_products')
      .update({ is_active: !currentStatus })
      .eq('id', id);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este produto?')) {
      await supabase
        .from('acai_products')
        .delete()
        .eq('id', id);
      fetchProducts();
    }
  };

  return (
    <div className="bg-[#1e1e1e] rounded-2xl border border-gray-800 overflow-hidden">
      {/* Barra de Ferramentas */}
      <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#252525]">
        <h2 className="text-xl font-bold text-white">Gerenciar Produtos</h2>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 bg-[#39ff14] text-black px-4 py-2 rounded-lg font-bold hover:bg-[#32e011] transition-colors"
        >
          <Plus size={20} />
          Novo Produto
        </button>
      </div>

      {/* Lista de Produtos */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="text-xs uppercase bg-[#252525] text-gray-400">
            <tr>
              <th className="px-6 py-4">Produto</th>
              <th className="px-6 py-4">Categoria/Tipo</th>
              <th className="px-6 py-4">Preço</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-[#39ff14]">
                  <Loader2 className="animate-spin w-8 h-8 mx-auto mb-2" />
                  Carregando produtos...
                </td>
              </tr>
            ) : products.map((product) => (
              <tr key={product.id} className="border-b border-gray-800 hover:bg-[#252525] transition-colors">
                <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                  {product.type === 'product' && product.image && (
                    <img src={product.image} alt={product.name} className="w-10 h-10 rounded-full object-cover border border-gray-700" />
                  )}
                  <div>
                    {product.name}
                    {product.description && <p className="text-xs text-gray-500 font-normal truncate max-w-xs">{product.description}</p>}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {product.type === 'product' ? 
                    <span className="bg-[#4a148c] text-white text-xs px-2 py-1 rounded-full">{menuData.categories.find(c => c.id === product.category)?.name || product.category}</span> : 
                    <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full uppercase">{product.type}</span>
                  }
                </td>
                <td className="px-6 py-4 text-[#39ff14] font-bold">
                  R$ {Number(product.price).toFixed(2)}
                </td>
                <td className="px-6 py-4 text-center">
                  <button 
                    onClick={() => handleToggleActive(product.id, product.is_active)}
                    className={`px-3 py-1 rounded-full text-xs font-bold ${product.is_active ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}
                  >
                    {product.is_active ? 'Ativo' : 'Inativo'}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => openEditModal(product)}
                    className="text-blue-400 hover:text-blue-300 p-2"
                    title="Editar"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="text-red-400 hover:text-red-300 p-2 ml-2"
                    title="Excluir"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Adicionar/Editar */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1e1e1e] border border-gray-800 rounded-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-gray-800 bg-[#252525] shrink-0">
              <h3 className="text-xl font-bold text-white">{editingProduct ? 'Editar Produto' : 'Novo Produto'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-4 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Nome do Produto</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#39ff14] focus:outline-none"
                  placeholder="Ex: Copo 500ml"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Preço (R$)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#39ff14] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Tipo</label>
                  <select 
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value})}
                    className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#39ff14] focus:outline-none"
                  >
                    <option value="product">Produto Principal</option>
                    <option value="creme">Creme</option>
                    <option value="complemento">Complemento</option>
                    <option value="adicional">Adicional Extra</option>
                  </select>
                </div>
              </div>

              {formData.type === 'product' && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Categoria (Apenas para Produto)</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#39ff14] focus:outline-none"
                  >
                    {menuData.categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {formData.type === 'product' && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Descrição Curta (Opcional)</label>
                  <input 
                    type="text" 
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#39ff14] focus:outline-none"
                    placeholder="Ex: Açaí puro na tigela..."
                  />
                </div>
              )}

              <button 
                type="submit" 
                disabled={saving}
                className="w-full bg-[#39ff14] hover:bg-[#32e011] text-black font-bold rounded-xl py-3 mt-4 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                {saving ? 'Salvando...' : 'Salvar Produto'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
