// ListaProdutos.tsx
import { useEffect, useState } from 'react';
import type { Produto } from './Produto';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

const ListaProdutos: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get<Produto[]>('http://localhost:3000/produtos');
        setProdutos(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };
    fetchProdutos();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await axios.delete(`http://localhost:3000/produtos/${id}`);
        setProdutos(produtos.filter((p) => p.id !== id));
      } catch (err) {
        alert('Erro ao excluir produto.');
      }
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <h2>Lista de Produtos</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {produtos.map((produto) => (
          <li key={produto.id} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
            <h3>{produto.nome}</h3>
            <p>💰 Preço: R$ {produto.preco.toFixed(2)}</p>
            <p>📂 Categoria: {produto.categoria.nome}</p>
            <button onClick={() => navigate(`/editar/${produto.id}`)} style={{ marginRight: '10px' }}>
              ✏️ Editar
            </button>
            <button onClick={() => handleDelete(produto.id)}>🗑️ Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaProdutos;
