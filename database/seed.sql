-- Inserção detalhada do cardápio Cantinho do Açaí
INSERT INTO products (name, category, price, description) VALUES
-- Açaí (Tamanhos e variações)
('Açaí no Copo 300ml', 'Açaí', 8.00, 'Açaí puro no copo'),
('Açaí no Copo 500ml', 'Açaí', 12.00, 'Açaí puro no copo'),
('Açaí na Barca', 'Açaí', 35.00, 'Açaí servido na barca com acompanhamentos'),
('Açaí na Tigela', 'Açaí', 15.00, 'Açaí servido na tigela'),

-- Coberturas (Butter/Cremes)
('Creme de Nutella', 'Cobertura', 5.00, 'Adicional de Nutella no copo'),
('Creme de Ovomaltine', 'Cobertura', 3.00, 'Adicional de Ovomaltine'),
('Creme de Amendoim', 'Cobertura', 3.00, 'Adicional de Amendoim'),

-- Salgados
('Coxinha', 'Salgados', 6.00, 'Coxinha de frango crocante'),
('Pastel de Forno', 'Salgados', 6.00, 'Pastel assado'),
('Quibe', 'Salgados', 6.00, 'Quibe frito temperado'),
('Risole de Presunto e Queijo', 'Salgados', 6.00, 'Risole recheado com presunto e queijo'),

-- Bebidas
('Refrigerante Lata', 'Bebidas', 6.00, 'Lata 350ml');

-- Observação: Complementos como leite em pó, paçoca, etc., podem ser gerenciados como itens adicionais no checkout.
