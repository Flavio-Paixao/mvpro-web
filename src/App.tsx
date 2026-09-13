import { useState, useEffect } from 'react';
import Login from './pages/Login';

function App() {
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setAutenticado(true);
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    setAutenticado(false);
  }

  if (!autenticado) {
    return <Login onLogin={() => setAutenticado(true)} />;
  }

  return (
    <div className="min-h-screen bg-bg text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          MV<span className="text-orange">Pro</span>
        </h1>
        <button onClick={handleLogout} className="text-sm text-gray-400 underline">
          Sair
        </button>
      </div>
      <p>Login funcionando! Proxima etapa: listar produtos aqui.</p>
    </div>
  );
}

export default App;
