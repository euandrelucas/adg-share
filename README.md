# ADG Share

Um servidor de compartilhamento de arquivos construído com Node.js, TypeScript, Fastify e Prisma. Permite o upload e download de arquivos, com suporte a configuração de tamanho máximo de arquivo.

## Funcionalidades

- Upload de arquivos com verificação de tamanho máximo configurável
- Download de arquivos
- Armazenamento de metadados dos arquivos no banco de dados
- API para acessar arquivos por URL

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript
- **TypeScript**: Superset do JavaScript para tipagem estática
- **Fastify**: Framework web rápido e leve para Node.js
- **Prisma**: ORM para gerenciamento de banco de dados
- **UUID**: Gerador de identificadores únicos

## Pré-requisitos

- Node.js (v16 ou superior)
- npm (ou yarn)

## Instalação

1. **Clone o repositório:**

```bash
$ git clone https://github.com/seu-usuario/adg-share.git
$ cd adg-share
```

2. **Instale as dependências:**

```bash
$ npm install
```

3. **Configure o banco de dados e as variáveis de ambiente:**
   Copie o arquivo `.env.example` para `.env` e ajuste as configurações conforme necessário.

```bash
$ cp .env.example .env
```

4. **Configure o banco de dados:**

- Crie o banco de dados e execute as migrações.

```bash
$ npx prisma migrate dev
```

## Scripts

- `npm run dev`: Inicia o servidor em modo de desenvolvimento (usando ts-node).
- `npm run build`: Compila o código TypeScript para JavaScript na pasta dist.
- `npm start`: Inicia o servidor com o código compilado.
- `npm run lint`: Verifica o código com ESLint.
- `npm run format`: Formata o código com Prettier.
- `npm run migrate`: Executa as migrações do Prisma.
- `npm run seed`: Executa o script de seed do Prisma (se configurado).

## Uso

### Upload de Arquivos

Para fazer o upload de um arquivo, envie uma solicitação POST para o endpoint `/upload` com o arquivo anexado.

Exemplo usando curl:

```bash
$ curl -F "file=@/caminho/para/seu/arquivo.txt" http://localhost:3000/upload
```

### Download de Arquivos

Para baixar um arquivo, faça uma solicitação GET para o endpoint `/files/:id`, substituindo `:id` pelo ID do arquivo.

Exemplo usando `curl`:

```bash
$ curl http://localhost:3000/files/seu-file-id -o arquivo-baixado.txt
```

### Configuração

O tamanho máximo do arquivo pode ser configurado no arquivo `.env`:

```env
MAX_FILE_SIZE=10485760  # 10 MB
```

### Contribuição

Sinta-se à vontade para contribuir com melhorias! Faça um fork do repositório, crie uma branch para suas alterações e envie um pull request.
