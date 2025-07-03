# 💊 Vitrine de Medicamentos

Uma aplicação backend desenvolvida com **Node.js**, **TypeORM** e **Express**, destinada à gestão de medicamentos.

---

## 🚀 Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript
- **Express**: Framework para construção de APIs
- **TypeORM**: ORM para integração com bancos de dados
- **SQLite**: Banco de dados leve para desenvolvimento

---

## 📦 Instalação

```bash
# 1. Clone este repositório
git clone https://github.com/andressasmedeiros/vitrine_de_medicamentos-main.git

# 2. Acesse o diretório do projeto
cd vitrine_de_medicamentos-main

# 3. Instale as dependências
npm install
```

---

## ⚙️ Configuração do Banco de Dados

1. Abra o arquivo `src/data-source.ts`.
2. Configure as credenciais do banco de dados conforme necessário.

---

## ▶️ Como Rodar

```bash
# Inicie o servidor
npm start

# A API estará disponível em:
http://localhost:3000
```

---

## 📂 Estrutura do Projeto

```
vitrine_de_medicamentos-main/
├── src/
│   ├── controllers/        # Lógica dos endpoints
│   ├── entities/           # Definições das entidades
│   ├── routes/             # Arquivos de rotas
│   └── data-source.ts      # Configuração do banco de dados
├── .env-exemplo            # Exemplo de variáveis de ambiente
├── .gitignore              # Arquivos e pastas ignorados pelo Git
├── package.json            # Dependências e scripts do projeto
└── tsconfig.json           # Configurações do TypeScript
```

---

## 📌 Funcionalidades

- Cadastro de medicamentos
- Consulta de medicamentos cadastrados
- Atualização de informações dos medicamentos
- Exclusão de medicamentos

---

## 🧪 Testando a API

Você pode utilizar ferramentas como **Postman**, **Insomnia** ou **cURL** para testar os endpoints da API.

---

## 📋 Licença

Este projeto está licenciado sob a licença **MIT**. Sinta-se à vontade para usar, modificar e distribuir o código.

---

## 👩‍💻 Criado como exercício do curso DevInHouse

**Andressa S. Medeiros** – Desenvolvedora do projeto

---
