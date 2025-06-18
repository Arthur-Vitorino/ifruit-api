// EditarProduto.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import type { Produto } from './Produto';
import './App.css';


const EditarProduto: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState<Produto | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/produtos/${id}`).then((res) => {
      setProduto(res.data);
    });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!produto) return;

    if (name === 'categoria') {
      setProduto({ ...produto, categoria: { ...produto.categoria, nome: value } });
    } else if (name === 'preco') {
      setProduto({ ...produto, preco: parseFloat(value) });
    } else {
      setProduto({ ...produto, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!produto) return;
    try {
      await axios.put(`http://localhost:3000/produtos/${id}`, produto);
      alert('Produto atualizado!');
      navigate('/');
    } catch (error) {
      alert('Erro ao atualizar produto');
    }
  };

  if (!produto) return <div>Carregando...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Produto</h2>
      <input name="nome" value={produto.nome} onChange={handleChange} />
      <input name="preco" type="number" value={produto.preco} onChange={handleChange} />
      <input name="categoria" value={produto.categoria.nome} onChange={handleChange} />
      <button type="submit">Salvar</button>
    </form>
  );
};

export default EditarProduto;
