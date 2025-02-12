# Task Manager

## 📌 Visão Geral

Este é um sistema de gerenciamento de tarefas (Task Manager) desenvolvido com **Django Rest Framework (DRF) no backend** e **React com TypeScript no frontend**. Ele permite que os usuários **cadastrem, editem e excluam tarefas**, além de fornecer **autenticação JWT para segurança**.

## 🛠️ Tecnologias Utilizadas

### Backend:
- Django 4.x
- Django Rest Framework (DRF)
- Django SimpleJWT (para autenticação)
- PostgreSQL
- Psycopg (driver para PostgreSQL)
- CORS Headers (para permitir comunicação entre frontend e backend)

### Frontend:
- React.js com Vite
- TypeScript
- Tailwind CSS (para estilização)
- React Router DOM (para navegação)
- Axios (para requisições HTTP)

## 📜 Funcionalidades

- Autenticação JWT (Login e Registro)
- Criar, Listar, Editar e Excluir Tarefas
- Proteção de Rotas para usuários autenticados
- Modal para edição de tarefas
- Controle de permissões e segurança

## 🚀 Como Rodar o Projeto

### 🔧 1. Configuração do Backend

1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/task-manager.git
   cd task-manager/backend
   ```
2. Crie um ambiente virtual e ative:
   ```sh
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   venv\Scripts\activate  # Windows
   ```
3. Instale as dependências:
   ```sh
   pip install -r requirements.txt
   ```
4. Configure o banco de dados (PostgreSQL) no `settings.py`.
5. Execute as migrações:
   ```sh
   python manage.py migrate
   ```
6. Crie um superusuário (opcional):
   ```sh
   python manage.py createsuperuser
   ```
7. Inicie o servidor:
   ```sh
   python manage.py runserver
   ```

### 🌍 2. Configuração do Frontend

1. Navegue até a pasta do frontend:
   ```sh
   cd ../frontend
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```sh
   npm run dev
   ```

## 🔑 Autenticação e Segurança

- O backend utiliza **JWT (JSON Web Token)** para autenticação.
- O login retorna **dois tokens (access e refresh)**.
- O frontend armazena o token e usa nas requisições para acessar as rotas protegidas.

## 📌 Endpoints da API

| Método | Rota                | Descrição                        |
|--------|---------------------|--------------------------------|
| POST   | `/api/register/`     | Cria um novo usuário           |
| POST   | `/api/token/`        | Gera o token JWT (Login)       |
| POST   | `/api/token/refresh/` | Atualiza o token de acesso     |
| GET    | `/api/tasks/`        | Lista todas as tarefas         |
| POST   | `/api/tasks/`        | Cria uma nova tarefa           |
| PUT    | `/api/tasks/{id}/`   | Edita uma tarefa existente     |
| DELETE | `/api/tasks/{id}/`   | Exclui uma tarefa              |

## 🎨 Interface do Usuário

A interface do usuário possui:

- **Tela de Login** e **Registro**
- **Página de tarefas protegida** por autenticação
- **Botão de logout**
- **Modal para edição de tarefas**
- **Feedbacks para erros de autenticação**

## 🏁 Conclusão

Este projeto foi desenvolvido para **praticar conceitos de autenticação, backend com Django e frontend com React**. O objetivo foi criar um sistema funcional e seguro para gerenciar tarefas! 🚀

## 📜 Licença

Este projeto está sob a licença MIT.
