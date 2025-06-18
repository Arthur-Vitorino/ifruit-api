// App.tsx
import { Outlet, Link } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '15px' }}>📦 Produtos</Link>
        <Link to="/criar">➕ Criar Produto</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
};

export default App;
