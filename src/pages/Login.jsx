import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui validaremos com o backend futuramente
    login({ email }); 
  };

  return (
    <div className="login-container">
      <h2>Cantinho do Açaí - Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Seu e-mail" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Sua senha" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};
export default Login;
