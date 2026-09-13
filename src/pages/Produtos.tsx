import { useState, useEffect } from 'react';
import api from '../services/api';
import Botao from '../components/Botao';

interface Produto {
  id: number;
  nome: string;
  codigo_barras: string | null;
  preco: number;
  quantidade_estoque: number;
  estoque_minimo: number;
}

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');

  function carregarProdutos() {
    setCarregando(true);
    api.get<Produto[]>('/produtos')
      .then((res) => setProdutos(res.data))
      .finally(() => setCarregando(false));
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function handleCriar(e: React.FormEvent) {
    e.preventDefault();
    await api.post('/produtos', {
      nome,
      preco: parseFloat(preco),
      quantidade_estoque: parseInt(quantidade),
      estoque_minimo: 5,
    });
    setNome('');
    setPreco('');
    setQuantidade('');
    setMostrarForm(false);
    carregarProdutos();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Produtos</h2>
        <button onClick={() => setMostrarForm(!mostrarForm)} className="text-orange text-sm font-bold uppercase">
          {mostrarForm ? 'Cancelar' : '+ Novo Produto'}
        </button>
      </div>

      {mostrarForm && (
        <form onSubmit={handleCriar} className="bg-surface border border-border rounded-xl p-6 mb-6">
          <input
            type="text"
            placeholder="Nome do produto"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-full p-3 mb-3 bg-bg border border-border rounded-lg text-white"
          />
          <div className="grid grid-cols-2 gap-3 mb-4">
            <input
              type="number"
              step="0.01"
              placeholder="Preco"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              required
              className="p-3 bg-bg border border-border rounded-lg text-white"
            />
            <input
              type="number"
              placeholder="Quantidade"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              required
              className="p-3 bg-bg border border-border rounded-lg text-white"
            />
          </div>
          <Botao type="submit">Salvar Produto</Botao>
        </form>
      )}

      {carregando ? (
        <p className="text-gray-500">Carregando...</p>
      ) : produtos.length === 0 ? (
        <p className="text-gray-500">Nenhum produto cadastrado ainda.</p>
      ) : (
        <div className="grid gap-3">
          {produtos.map((p) => (
            <div key={p.id} className="bg-surface border border-border rounded-xl p-4 flex justify-between items-center">
              <div>
                <p className="font-bold">{p.nome}</p>
                <p className="text-orange">R$ {p.preco.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className={p.quantidade_estoque <= p.estoque_minimo ? 'text-red-500 font-bold' : 'text-gray-400'}>
                  {p.quantidade_estoque} em estoque
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
