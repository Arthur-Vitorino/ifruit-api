
# 🥭 Ifruit API

API RESTful desenvolvida com [NestJS](https://nestjs.com/) para gerenciamento de um sistema de hortifruti. A aplicação permite o controle de produtos, categorias, usuários, autenticação com JWT, e gerenciamento de permissões por papéis (roles).

## Integrantes
- Arthur Ribeiro Vitorino UC23100894
- Ana Carolina
- Débora Rezende Valeriano UC22201300
- Anna Júlia Curcio

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [SQLite](https://www.sqlite.org/)
- [JWT](https://jwt.io/)
- [Swagger](https://swagger.io/)
- [class-validator](https://github.com/typestack/class-validator)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)

---

## 📚 Funcionalidades

- CRUD de Produtos e Categorias
- Relacionamento entre Produto e Categoria
- Cadastro e login de usuários com senha criptografada
- Autenticação com JWT
- Autorização com base em papéis: `USER`, `MANAGER`, `ADMIN`
- Documentação automática com Swagger
- Validações com DTOs
- Filtros por categoria (Query Params)

---

## ⚙️ Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/ifruit-api.git
cd ifruit-api

# Instale as dependências
npm install

# Execute a aplicação em modo de desenvolvimento
npm run start:dev
```

> A aplicação estará disponível em: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Autenticação

A autenticação é baseada em JWT. Após o login, o token deve ser incluído no header das requisições protegidas:

```
Authorization: Bearer SEU_TOKEN_JWT
```

Papéis disponíveis:
- `USER`: pode cadastrar produtos
- `MANAGER`: pode editar produtos
- `ADMIN`: pode cadastrar e excluir produtos

---

## 📌 Endpoints Principais

| Método | Rota                      | Protegida | Descrição                            |
|--------|---------------------------|-----------|--------------------------------------|
| POST   | `/auth/register`          | ❌        | Cadastro de novo usuário             |
| POST   | `/auth/login`             | ❌        | Autenticação e retorno do JWT        |
| GET    | `/produtos`               | ❌        | Lista todos os produtos              |
| POST   | `/produtos`               | ✅        | Cria um novo produto                 |
| PATCH  | `/produtos/:id`           | ✅        | Atualiza um produto                  |
| DELETE | `/produtos/:id`           | ✅        | Remove um produto                    |
| GET    | `/categorias`             | ❌        | Lista todas as categorias            |
| POST   | `/categorias`             | ✅        | Cria uma nova categoria              |

> Acesse a documentação Swagger em: [http://localhost:3000/api](http://localhost:3000/api)

---

## 🧪 Testes com VS Code (opcional)

Utilize a extensão **REST Client** no VS Code e edite o arquivo `requisicoes.http` com seus tokens e dados para testar os endpoints.

---

## 📁 Estrutura do Projeto

```bash
src/
├── auth/
├── categorias/
├── produtos/
├── user/
├── app.module.ts
├── main.ts
```

---

## ✍️ Autor

Feito com 💚 para fins educacionais.

> Caso utilize este projeto como base, sinta-se à vontade para dar uma estrela ⭐ ou contribuir com melhorias!

---
