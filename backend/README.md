# Tripleten web_project_around_express

API RESTful com Node.js e Express.js
Esta API foi desenvolvida usando Node.js e o framework Express.js para demonstrar a criação e estruturação de uma API RESTful. Ela inclui endpoints para realizar operações CRUD em recursos como usuários e cartões.

## Funcionalidades

Usuários (/users)
GET /users: Lista todos os usuários cadastrados.
GET /users/:id: Busca um usuário específico pelo seu ID.
POST /users: Cria um novo usuário com os dados fornecidos.
PATCH /users/me: Atualiza as informações do perfil do usuário autenticado.
PATCH /users/me/avatar: Atualiza o avatar do usuário autenticado.

Cartões (/cards)
GET /cards: Lista todos os cartões disponíveis.
POST /cards: Cria um novo cartão vinculado ao usuário autenticado.
DELETE /cards/:cardId: Remove um cartão pelo ID.
PUT /cards/:cardId/likes: Adiciona um "like" a um cartão.
DELETE /cards/:cardId/likes: Remove um "like" de um cartão.
Requisitos
Node.js: Versão 14 ou superior.
npm: Versão 6 ou superior.
MongoDB: Um banco de dados MongoDB local ou remoto em execução.

## Instalação

Clone o repositório:

Copiar código
git clone https://github.com/seuusuario/sua-api.git

## Acesse o diretório do projeto:

Copiar código
cd sua-api

Instale as dependências:

Copiar código
npm install

Configure o banco de dados MongoDB:

Certifique-se de que o MongoDB está em execução.
O banco de dados padrão esperado é aroundb, mas você pode alterar no arquivo app.js.

## Inicie o servidor:

Copiar código
npm run dev
O servidor será iniciado em http://localhost:3000.

## Estrutura do Projeto

Copiar código
sua-api/
├── controllers/   # Lógica dos controladores para as rotas
├── models/        # Modelos do Mongoose para os recursos
├── routes/        # Rotas definidas para usuários e cartões
├── app.js         # Arquivo principal do servidor
├── eslint.config.js # Configuração do ESLint para linting
├── package.json   # Dependências e scripts do projeto
└── README.md      # Documentação

## Tecnologias Utilizadas

Node.js: Plataforma JavaScript para desenvolvimento backend.

Express.js: Framework para criação de APIs robustas e performáticas.

MongoDB: Banco de dados NoSQL utilizado para armazenar os dados.

Mongoose: Biblioteca ODM para integração com o MongoDB.

ESLint: Ferramenta para garantir qualidade e consistência do código.

## Demonstração em Vídeo

Assista ao vídeo de demonstração: [Clique aqui para assistir](https://youtu.be/7RP-HPZkdrQ).
