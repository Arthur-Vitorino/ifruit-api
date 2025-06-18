// main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';


import App from './App';
import ListaProdutos from './ListaProdutos';
import CriarProduto from './CriarProduto';
import EditarProduto from './EditarProduto';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<ListaProdutos />} />
          <Route path="criar" element={<CriarProduto />} />
          <Route path="editar/:id" element={<EditarProduto />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
