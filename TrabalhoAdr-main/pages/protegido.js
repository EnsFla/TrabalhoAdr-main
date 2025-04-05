import { useEffect, useState } from 'react';

export default function Protegido() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Faz uma requisição para a API protegida
    const fetchProtectedData = async () => {
      const res = await fetch('/api/protegido', {
        method: 'GET',
        credentials: 'same-origin', // Garante que o cookie seja enviado
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message); // Exibe a mensagem de erro se o acesso for negado
        return;
      }

      const data = await res.json();
      setData(data); // Armazena os dados retornados da API
    };

    fetchProtectedData();
  }, []);

  return (
    <div>
      <h1>Página Protegida</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}
