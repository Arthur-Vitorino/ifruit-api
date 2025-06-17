import './style.css';
import Trash from '../../assets/Trash.svg';

function Home() {
  const users = [
    {
      id: '121212',
      nomeUsuario: 'usuarioArthur',
      nome: 'Arthur',
      senha: '12345678',
      email: 'exemplo@gmail.com',
      role: 'USER',
    },
    {
      id: '131313',
      nomeUsuario: 'usuarioJoao',
      nome: 'Joao',
      senha: '12345678',
      email: 'exemplo2@gmail.com',
      role: 'USER',
    },
  ];

  return (
    <div className="container">
      <form>
        <h1>Cadastro De Usuários</h1>
        <input placeholder="Nome de Usuário" name="nomeUsuario" type="text" />
        <input placeholder="Nome Completo" name="nome" type="text" />
        <input placeholder="Email" name="email" type="email" />
        <input placeholder="Senha" name="senha" type="password" />
        <button type="button">Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>Nome de Usuário: {user.nomeUsuario}</p>
            <p>Email: {user.email}</p>
          </div>
          <button>
            <img src={Trash} alt="Lixo" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
