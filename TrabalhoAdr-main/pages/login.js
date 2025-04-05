import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}), // Corpo simples, sem credenciais
      credentials: 'same-origin', // Garante que os cookies sejam enviados
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message); // Exibe a mensagem de erro
      return;
    }

    // Sucesso no login
    console.log('Login bem-sucedido:', data);
    router.push('/protegido'); // Redireciona para página protegida
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
