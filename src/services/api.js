// Este serviço fará a ponte para buscar os produtos do banco de dados
export const fetchProducts = async () => {
  // Simulação de chamada ao banco de dados
  console.log("Buscando cardápio no banco de dados...");
  return [
    { id: 1, name: 'Açaí no Copo 300ml', price: 8.00, category: 'Açaí' },
    { id: 7, name: 'Coxinha', price: 6.00, category: 'Salgados' }
    // ... mais itens
  ];
};
