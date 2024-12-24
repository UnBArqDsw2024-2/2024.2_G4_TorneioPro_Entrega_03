# Guia de Configuração do Ambiente para Desenvolvimento com React, TypeScript, Vite e Tailwind CSS

Este guia detalha os passos necessários para configurar o ambiente de desenvolvimento e executar o projeto.

---

## **1. Ferramentas Necessárias**

Antes de começar, instale as seguintes ferramentas no computador:

### **1.1 Node.js**

- Baixe e instale o [Node.js](https://nodejs.org/):

    - Versão recomendada: **18.x ou superior**.
    - Durante a instalação, certifique-se de incluir o `npm` (gerenciador de pacotes do Node.js).

- Verifique a instalação:

  ```bash
  node -v
  npm -v
  ```

### **1.2 Git**

- Baixe e instale o [Git](https://git-scm.com/):

    - Durante a instalação, configure o Git Bash para a linha de comando.

- Verifique a instalação:

  ```bash
  git --version
  ```

### **1.3 Docker**&#x20 (opcional);

- Baixe e instale o [Docker Desktop](https://www.docker.com/products/docker-desktop/):

    - Certifique-se de ativar a integração com o sistema operacional.

- Verifique a instalação:

  ```bash
  docker --version
  docker compose version
  ```

### **1.4 Editor de Código (Ex: VS Code)**

- Baixe e instale o [Visual Studio Code](https://code.visualstudio.com/).

- Extensões recomendadas para este projeto:

    - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
    - [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
    - [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    - [TypeScript](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)

---

## **2. Configurando o Projeto**

### **2.1 Clonar o Repositório**

1. Abra o terminal e navegue até o diretório onde deseja salvar o projeto.
2. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DO_REPOSITORIO>
   ```

### **2.2 Instalar Dependências**

1. Certifique-se de estar no diretório raiz do projeto.
2. Instale as dependências do projeto:
   ```bash
   npm install
   ```

---

## **3. Usar Docker para Rodar o Projeto (opcional)**

### **3.1 Subir o Ambiente com Docker Compose**

Se o projeto usa Docker, execute:

```bash
docker compose up --build -d
```

### **3.2 Acessar a Aplicação**

- Acesse no navegador: [http://localhost:5173](http://localhost:5173).

---


## **4. Executar o Projeto**

### **4.1 Ambiente de Desenvolvimento**

Para rodar o servidor de desenvolvimento:

```bash
npm run dev
```

- Abra o navegador e acesse [http://localhost:5173](http://localhost:5173).

### **4.2 Watch CSS do Tailwind**

Se o projeto requer o watch do Tailwind, execute este comando em uma janela separada do terminal:

```bash
npm run watch:css
```

### **4.3 Ambiente de Desenvolvimento na Network**

Para rodar o servidor de desenvolvimento na Network (Wifi), útil para abrir o Front pelo celular e verificar **Responsividade**:

```bash
npm run dev:network
```

- Abra o navegador e acesse **Link: Network que aparece no terminal/console** (varia conforme o IP do wifi).

---


## **5. Scripts Disponíveis no Projeto**

- **Iniciar o servidor de desenvolvimento:**

  ```bash
  npm run dev
  ```

- **Iniciar o servidor de desenvolvimento na Network (wifi):**

  ```bash
  npm run dev:network
  ```

- **Rodar o watch CSS do Tailwind:**

  ```bash
  npm run watch:css
  ```

- **Build para produção:**

  ```bash
  npm run build
  ```

- **Rodar o servidor de produção localmente:**

  ```bash
  npm run preview
  ```

---

## **6. Solução de Problemas Comuns**

- **Erro ao instalar dependências:**

    - Certifique-se de que o Node.js e o npm estão instalados corretamente.

- **Porta em uso (5173):**

    - Finalize outros processos ocupando a porta com:
      ```bash
      npx kill-port 5173
      ```

- **Tailwind não atualiza os estilos:**

    - Certifique-se de que o comando `npm run watch:css` está sendo executado.



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
