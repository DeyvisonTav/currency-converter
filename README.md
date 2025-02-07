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
✅ **Autenticação com AWS Cognito**  


---

## 🛠️ Tecnologias Utilizadas

- **Backend:** NestJS + TypeScript
- **Banco de Dados:** PostgreSQL + TypeORM
- **Cache:** Redis
- **Mensageria:** Webhooks para comunicação do Bot
- **Infraestrutura:** AWS (Lambda, S3, RDS, API Gateway)
- **Integração:** Open Exchange Rates API


---

## 📲 Como Funciona o Bot do Telegram?

Os usuários podem interagir com o bot enviando comandos:

🔹 **`/convert 100 USD to BRL`** → Retorna a conversão com a taxa atual  
🔹 **`/history USD`** → Exibe o histórico de taxas do USD armazenadas no PostgreSQL  
🔹 **`/help`** → Lista os comandos disponíveis

---

## 🚀 Como Rodar o Projeto Localmente

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/DeyvisonTav/currency-converter.git
cd currency-converter

2️⃣ Configure as Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto com as seguintes chaves:

DATABASE_URL=postgresql://user:password@localhost:5432/currency_db
REDIS_URL=redis://localhost:6379
EXCHANGE_API_KEY=""
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
TELEGRAM_BOT_TOKEN=""

3️⃣ Instale as Dependências

npm install

4️⃣ Execute a API

npm run start:dev

5️⃣ Teste os Endpoints

Acesse http://localhost:3000/api para testar os endpoints no Swagger.

📡 Deploy na AWS

Este projeto pode ser implantado na AWS usando Lambda, S3 e RDS (PostgreSQL Free Tier).
	1.	Configurar AWS Lambda para cálculos de conversão
	2.	Utilizar S3 para armazenar logs e histórico de consultas
	3.	Configurar RDS PostgreSQL para o banco de dados

📌 Próximos Passos

✅ Melhorar logging e monitoramento na AWS
✅ Implementar fila de mensagens para requisições assíncronas
✅ Criar suporte para múltiplos provedores de câmbio

📜 Licença

Este projeto é de código aberto e está sob a licença MIT.

👨‍💻 Desenvolvido por Deyvison Tavares


```
