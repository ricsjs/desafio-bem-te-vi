# Guia de Execução da Aplicação

## Requisitos

- Instalar o [Bun](https://bun.sh/)
- Docker e Docker Compose instalados

---

## Backend

### Passo 1: Instalar dependências

No diretório do backend (/api), execute o seguinte comando para instalar as dependências:

```bash
npm install
```

### Passo 2: Subir o container Docker
```bash
docker compose up
```

### Passo 2: Executar migrações do Prisma
```bash
npx prisma migrate dev
```

### Passo 3: Rodar a aplicação
```bash
npm run dev
```

## Frontend

No diretório do frontend (/web), execute o seguinte comando para instalar as dependências:

### Passo 1: Instalar as dependências
```bash
npm install
```

### Passo 3: Rodar a aplicação
##### Obs.: Certificar-se de que a URL do backend está configurada corretamente para o localhost, essa configuração pode ser encontrada em: web/app/services/api.ts
```bash
npm run dev
```