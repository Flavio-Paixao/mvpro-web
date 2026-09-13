import { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import Botao from '../components/Botao';

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setCarregando(true);
    try {
      const res = await api.post('/login', { email, senha });
      localStorage.setItem('token', res.data.access_token);
      onLogin();
    } catch (err) {
      setErro('Email ou senha invalidos');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg text-white flex flex-col items-center justify-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-black mb-8"
        style={{ fontFamily: 'Satoshi, sans-serif' }}
      >
        MV<span className="text-orange">Pro</span>
      </motion.h1>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        onSubmit={handleSubmit}
        className="bg-surface border border-border rounded-2xl p-8 w-full max-w-sm"
      >
        <div className="mb-4">
          <label className="block text-[11px] uppercase tracking-wider text-gray-500 mb-2">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 bg-bg border border-border rounded-lg text-white focus:outline-none focus:border-orange transition-colors" placeholder="seu@email.com" />
        </div>

        <div className="mb-6">
          <label className="block text-[11px] uppercase tracking-wider text-gray-500 mb-2">Senha</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} className="w-full p-3 bg-bg border border-border rounded-lg text-white focus:outline-none focus:border-orange transition-colors" placeholder="********" />
        </div>

        {erro && <p className="text-red-500 text-sm mb-4 text-center">{erro}</p>}

        <Botao type="submit" disabled={carregando}>
          {carregando ? 'Entrando...' : 'Entrar'}
        </Botao>
      </motion.form>
    </div>
  );
}
