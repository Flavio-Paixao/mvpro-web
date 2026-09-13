import { useState } from 'react';
import api from '../services/api';

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
    <div className="min-h-screen bg-bg text-white flex flex-col items-center justify-center font-[Space_Mono] px-4">
      <h1 className="text-4xl font-black mb-8" style={{ fontFamily: 'Satoshi, sans-serif' }}>
        MV<span className="text-orange">Pro</span>
      </h1>

      <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-2xl p-8 w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-[11px] uppercase tracking-wider text-gray-500 mb-2">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 bg-bg border border-border rounded-lg text-white focus:outline-none focus:border-orange transition-colors" placeholder="seu@email.com" />
        </div>

        <div className="mb-6">
          <label className="block text-[11px] uppercase tracking-wider text-gray-500 mb-2">Senha</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} className="w-full p-3 bg-bg border border-border rounded-lg text-white focus:outline-none focus:border-orange transition-colors" placeholder="********" />
        </div>

        {erro && <p className="text-red-500 text-sm mb-4 text-center">{erro}</p>}

        <button type="submit" disabled={carregando} className="w-full bg-orange text-bg font-bold py-3 rounded-lg uppercase text-sm tracking-wider transition-shadow duration-300 hover:shadow-[0_0_24px_4px_rgba(249,115,22,0.55)] disabled:opacity-50">
          {carregando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}