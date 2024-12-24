# Node.js
FROM node:current-alpine

# Definir diretório
WORKDIR /app

# Copiar tudo
COPY . .

# Instalar dependências
RUN npm install

# Expor a porta do Vite
EXPOSE 5173

# Iniciar o servidor de desenvolvimento
CMD ["npm", "run", "dev:watch"]