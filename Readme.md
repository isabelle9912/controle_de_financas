# Financial Life Management

## Descrição

Olá! Este projeto é voltado para a utilização de pessoas no seu cotidiano. A ideia é trazer uma forma fácil e organizada de controlar a vida financeira de um usuário.

## Tecnologias Utilizadas

- **Node.js**: Plataforma utilizada para desenvolvimento do backend.
- **Express.js**: Framework web utilizado para facilitar a criação de rotas e middlewares.
- **Handlebars**: Template engine utilizada para renderizar as views no lado do servidor.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar as informações dos usuários e suas transações financeiras.
- **Sequelize**: ORM utilizado para interagir com o banco de dados PostgreSQL de maneira mais simples e eficiente.

## Funcionalidades

- **Cadastro de Usuários**: Permite que novos usuários se registrem na plataforma.
- **Autenticação**: Login e logout de usuários, garantindo a segurança dos dados.
- **Gerenciamento de Transações**: Permite aos usuários adicionar, editar e excluir suas transações financeiras.
  
[//]: # (- **Visualização de Relatórios**: Exibe um resumo financeiro para o usuário, com gráficos e estatísticas das suas transações.)

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/isabelle9912/controle_de_financas.git

2. Instale dependências:

   ```bash
   npm install

4. Configure o banco de dados:
   
   - Crie um banco de dados PostgreSQL.
   - Configure o arquivo .env com as informações do seu banco de dados:
     
    ```env
    DB_HOST=localhost
    DB_USER=seu-usuario
    DB_PASS=sua-senha
    DB_NAME=nome-do-banco

5. Inicie a aplicação:
  
    ```bash
    npm start

6. Acesse a aplicação no navegador:

    ```bash
    http://localhost:3000

## Estrutura de Pastas

  ```bash
    .
    ├── src
    │   ├── config        # Configurações da aplicação
    │   ├── controllers   # Controladores para gerenciar as rotas
    │   ├── models        # Definições de modelos do Sequelize
    │   ├── routes        # Definições de rotas da aplicação
    │   ├── views         # Templates Handlebars
    │   └── index.js      # Arquivo principal da aplicação
    ├── .env              # Arquivo de configuração de ambiente
    ├── package.json      # Dependências e scripts do NPM
    └── README.md         # Documentação da aplicação

  
