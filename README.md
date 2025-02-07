````markdown
# 💱 Currency Converter API | NestJS + PostgreSQL + AWS + Telegram Bot

🚀 **Plataforma de Conversão de Moeda** desenvolvida com **NestJS, PostgreSQL e AWS (Free Tier)**, integrada a um **Bot do Telegram** para consultas rápidas de taxas de câmbio.

Este projeto foi criado para **explorar tecnologias bancárias e fintechs**, aplicando boas práticas de **segurança, escalabilidade e integração com APIs financeiras**.

---

## 📌 Funcionalidades Principais

✅ **Conversão de moedas em tempo real** via API REST  
✅ **Integração com API de câmbio** para buscar taxas atualizadas  
✅ **Cache com Redis** para otimizar consultas frequentes  
✅ **Banco de dados PostgreSQL** utilizando JSONB para armazenar histórico de taxas  
✅ **Bot do Telegram** para consultas rápidas via chat  
✅ **AWS Lambda e S3** para armazenamento e cálculos serverless

---

## 🛠️ Tecnologias Utilizadas

- **Backend:** NestJS + TypeScript
- **Banco de Dados:** PostgreSQL + TypeORM
- **Cache:** Redis
- **Infraestrutura:** AWS (Lambda, S3, RDS, API Gateway)
- **Integração:** AwesomeAPI (economia.awesomeapi.com.br)
- **Mensageria:** Webhooks para comunicação do Bot

---

## 📲 Como Funciona o Bot do Telegram?

Os usuários podem interagir com o bot enviando comandos simples:

🔹 `100 USD BRL` → Retorna a conversão com a taxa atual  
🔹 `2` → Exibe o histórico de conversões recentes  
🔹 `/alertar USD BRL` → Ativa alerta de câmbio  
🔹 `/cancelar_alerta USD BRL` → Cancela alerta de câmbio  
🔹 `3` → Lista os comandos disponíveis

---

## 🚀 Como Rodar o Projeto Localmente

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/DeyvisonTav/currency-converter.git
cd currency-converter
```
````

### 2️⃣ Configure as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes chaves:

```env
# Banco de Dados PostgreSQL
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=currency_user
POSTGRES_PASSWORD=currency_pass
POSTGRES_DB=currency_converter

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# API de Câmbio
CURRENCY_API_URL=https://economia.awesomeapi.com.br/json/last

# Telegram Bot
TELEGRAM_BOT_TOKEN=SEU_TOKEN_DO_TELEGRAM

# AWS
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=SEU_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=SEU_SECRET_KEY
AWS_S3_BUCKET_NAME=currency-bucket
```

### 3️⃣ Instale as Dependências

```bash
npm install
```

### 4️⃣ Suba os Containers Docker

```bash
docker compose up --build -d
```

### 5️⃣ Execute a API

```bash
npm run start:dev
```

A API será iniciada em **http://localhost:3000**.

---

## 📡 Deploy na AWS

Este projeto pode ser implantado na AWS utilizando **Lambda, S3 e RDS (PostgreSQL Free Tier)**.

1️⃣ **Configurar AWS Lambda** para cálculos de conversão  
2️⃣ **Utilizar S3** para armazenar logs e histórico de consultas  
3️⃣ **Configurar RDS PostgreSQL** para o banco de dados

---

## 📌 Próximos Passos

✅ Melhorar logging e monitoramento na AWS  
✅ Implementar fila de mensagens para requisições assíncronas  
✅ Criar suporte para múltiplos provedores de câmbio

---

## 📜 Licença

Este projeto é de código aberto e está sob a licença **MIT**.

---

## 👨‍💻 Desenvolvido por

**Deyvison Tavares** 🚀
