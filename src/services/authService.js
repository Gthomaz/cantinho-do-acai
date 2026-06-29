// Este serviço vai gerenciar o login e a verificação de e-mail
export const authService = {
  register: async (userData) => {
    // Lógica para registrar e disparar e-mail de verificação
    console.log("Registrando usuário e enviando verificação...", userData);
  },
  login: async (email, password) => {
    // Lógica para autenticar e validar o token
    console.log("Autenticando usuário...");
  }
};
