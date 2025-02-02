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

[//]: # "- **Visualização de Relatórios**: Exibe um resumo financeiro para o usuário, com gráficos e estatísticas das suas transações."

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/isabelle9912/controle_de_financas.git

   ```

2. Instale dependências:

   ```bash
   npm install

   ```

3. Configure o banco de dados:

   - Crie um banco de dados PostgreSQL.
   - Configure o arquivo .env com as informações do seu banco de dados:

   ```env
   DB_HOST=localhost
   DB_USER=seu-usuario
   DB_PASS=sua-senha
   DB_NAME=nome-do-banco

   ```

4. Inicie a aplicação:

   ```bash
   npm start

   ```

5. Acesse a aplicação no navegador:

   ```bash
   http://localhost:3000
   ```

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
```

---

### **Rodando a aplicação com Docker**

Para facilitar a execução da aplicação sem necessidade de instalar dependências manualmente, você pode rodá-la dentro de um container Docker.

#### **Pré-requisitos**

- Ter o [Docker](https://www.docker.com/) instalado em sua máquina.

#### **1. Criar e configurar o arquivo `.env`**

Antes de iniciar o container, crie um arquivo `.env` na raiz do projeto e adicione suas credenciais do banco de dados PostgreSQL:

```env
PGHOST='db'
PGDATABASE='nome-do-banco'
PGUSER='seu-usuario'
PGPASSWORD='sua-senha'
PORT=3000
```

#### **2. Criar um `Dockerfile`**

O `Dockerfile` define como o container será construído. Crie um arquivo `Dockerfile` na raiz do projeto e adicione o seguinte conteúdo:

```dockerfile
# Usa a imagem oficial do Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do projeto para o container
COPY package.json ./
RUN npm install

# Copia o restante dos arquivos para o container
COPY . .

# Expõe a porta que o servidor irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "index.js"]
```

#### **3. Criar um `docker-compose.yml` (opcional, recomendado para usar com PostgreSQL)**

Para rodar a aplicação junto com um banco PostgreSQL, crie um arquivo `docker-compose.yml` na raiz do projeto:

```yaml
services:
  db:
    image: postgres:15
    container_name: financial_db
    restart: always
    environment:
      POSTGRES_USER: seu-usuario
      POSTGRES_PASSWORD: sua-senha
      POSTGRES_DB: nome-do-banco
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  app:
    build: .
    container_name: financial_app
    restart: always
    depends_on:
      - db
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=db
      - DB_USER=seu-usuario
      - DB_PASS=sua-senha
      - DB_NAME=nome-do-banco
      - DB_PORT=5432
    volumes:
      - .:/app
    command: sh -c "npm install && node index.js"

volumes:
  pgdata:
```

#### **4. Construir e rodar o container**

No terminal, execute:

```bash
docker-compose up --build -d
```

Isso irá:

- Criar e iniciar um container com o PostgreSQL.
- Criar e iniciar um container com a aplicação.
- Acessar a aplicação no navegador em `http://localhost:3000`.

Se quiser ver os logs da aplicação, use:

```bash
docker logs -f financial_app
```

Para parar e remover os containers, use:

```bash
docker-compose down
```
