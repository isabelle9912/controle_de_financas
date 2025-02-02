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