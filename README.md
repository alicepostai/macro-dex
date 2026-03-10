# MacroDex

MacroDex é uma aplicação web para o gerenciamento e organização de álbuns de fotos. O sistema permite que usuários se cadastrem, criem álbuns personalizados e façam o upload de imagens. É encorajado que o conteúdo seja de fotos macro, porém atualmente não há nada que filtre isso.

Durante o upload, o sistema processa a imagem automaticamente pra extrair a data original da foto (via metadados EXIF) e a cor predominante, podendo exibir os dados em modo de tabela ou miniaturas.

### Repositórios

- **Frontend:** https://github.com/alicepostai/macro-dex-frontend
- **Backend:** https://github.com/alicepostai/macro-dex

---

## Processo Criativo e Decisões Técnicas

**1. O Tema (MacroDex):**
A ideia veio devido ao meu gosto por tirar fotos macro variadas, especialmente de insetos e aracnídeos. Construí a aplicação pensando em um local onde pessoas com o mesmo hobbie pudessem catalogar e organizar essas capturas.

**2. Tecnologias e Ferramentas:**
O uso de **react** no frontend e **NestJS** com **TypeScript** no backend foi uma decisão tomada devido a minha vontade de me aprofundar nessas tecnologias. Optei por utilizar o **PostgreSQL** por ter maior familiaridade, subindo o banco com **docker** pela praticidade.

O **Chakra UI** foi utilizado no React para construir os componentes de forma mais rápida e responsiva.

A biblioteca **Sharp** foi usada no backend para varrer os canais RGB da imagem e calcular a média, convertendo o resultado em uma cor Hexadecimal. Utilizei também o **exif-parser** para ler os metadados do arquivo original e extrair a data e hora exatas em que a foto foi tirada, exibindo isso em cada foto.

Para a comunicação entre frontend e backend utilizei o **Axios**, pois ele facilita a realização de requisições HTTP e permite centralizar configurações como a URL base da API e a inclusão automática do token de autenticação nos headers através de interceptors.

O **React Router DOM** foi utilizado para gerenciar a navegação entre as páginas da aplicação, permitindo criar rotas como login, cadastro, dashboard e visualização de álbuns sem a necessidade de recarregar a página.

A autenticação foi implementada utilizando **JWT (JSON Web Token)**. Após o login, o backend gera um token que é armazenado no frontend e enviado nas requisições subsequentes, visando proteger as rotas da API e garantir que só usuários autenticados possam acessar ou modificar seus próprios dados.

Para o upload de arquivos utilizei o **Multer**, que é o middleware padrão do Node.js pra lidar com envio de arquivos multipart/form-data. Ele foi integrado ao NestJS através do FileInterceptor, permitindo salvar as imagens enviadas pelos usuários na pasta de uploads e disponibilizá-las depois através da API.

---

## Resumo de Tecnologias Utilizadas

**Frontend:**

- React + TypeScript
- Chakra UI (Estilização e Componentes)
- React Router DOM
- Axios

**Backend:**

- Node.js + NestJS
- TypeORM + PostgreSQL
- JWT (Autenticação)
- Multer (Upload de arquivos)
- Sharp & Exif-parser (Processamento de imagem e extração de metadados)

**Infraestrutura:**

- Docker & Docker Compose

---

## Como executar o projeto localmente

### 1. Banco de Dados (PostgreSQL via Docker)

No diretório do **backend**, utilize o Docker Compose para subir o banco de dados rapidamente:

```bash
docker-compose up -d
```

Certifique-se de ter a porta 5432 liberada na sua máquina.

### 2. Iniciando o Backend

Ainda no diretório do backend, instale as dependências e inicie o servidor em modo de desenvolvimento:

```bash
npm install
npm run start:dev
```

A API vai estar rodando em `http://localhost:3001`.

### 3. Iniciando o Frontend

No diretório do **frontend**, instale as dependências e inicie a aplicação:

```bash
npm install
npm start
```

A interface ficará disponível em `http://localhost:3000`.

---
