// CriarProduto.tsx
import { useState } from 'react';
import axios from 'axios';
import type { Produto } from './Produto';
import { useNavigate } from 'react-router-dom';
import './App.css';

const CriarProduto: React.FC = () => {
  const navigate = useNavigate();
  const [produto, setProduto] = useState<Partial<Produto>>({
    nome: '',
    preco: 0,
    categoria: { nome: '', id: 0, ative: true },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'categoria') {
      setProduto({ ...produto, categoria: { nome: value, id: 0, ative: true } });
    } else if (name === 'preco') {
      setProduto({ ...produto, preco: parseFloat(value) });
    } else {
      setProduto({ ...produto, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/produtos', produto);
      alert('Produto criado!');
      navigate('/');
    } catch (error) {
      alert('Erro ao criar produto');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Criar Produto</h2>
      <input name="nome" placeholder="Nome" onChange={handleChange} />
      <input name="preco" type="number" placeholder="Preço" onChange={handleChange} />
      <input name="categoria" placeholder="Categoria" onChange={handleChange} />
      <button type="submit">Salvar</button>
    </form>
  );
};

export default CriarProduto;
