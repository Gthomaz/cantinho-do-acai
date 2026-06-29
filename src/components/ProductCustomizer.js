import React, { useState, useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const ProductCustomizer = ({ product, onClose }) => {
  const [selectedButter, setSelectedButter] = useState('');
  const [selectedComplement, setSelectedComplement] = useState('');
  const { addToCart } = useContext(CartContext);

  const handleConfirm = () => {
    addToCart({ ...product, options: { selectedButter, selectedComplement } });
    onClose();
  };

  return (
    <div className='customizer-modal'>
      <h3>Montar {product.name}</h3>
      <label>Escolha o Creme (Butter):</label>
      <select onChange={(e) => setSelectedButter(e.target.value)}>
        <option value=''>Selecione...</option>
        <option value='Nutella'>Nutella</option>
        <option value='Ovomaltine'>Ovomaltine</option>
        <option value='Amendoim'>Amendoim</option>
      </select>

      <label>Escolha Complemento:</label>
      <input type='text' placeholder='Ex: Leite em pó' onChange={(e) => setSelectedComplement(e.target.value)} />
      
      <button onClick={handleConfirm}>Adicionar ao Carrinho</button>
    </div>
  );
};
export default ProductCustomizer;
