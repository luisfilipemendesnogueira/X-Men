# X-Men - Cérebro

Um sistema desenvolvido para localizar, monitorar e catalogar mutantes ao redor do mundo. Aqui você pode acessar os registros oficiais do Instituto Xavier, ver os mutantes mais ativos e descobrir quem está liderando nas missões pela paz entre humanos e mutantes.

Projeto full‑stack com dockerização, composto por:
- Frontend em React.js (Vite) servido via Nginx
- Backend em Java com Spring Boot (Java 17)
- Banco de dados MySQL carregado por script em: `sql/script_x-men.sql`

## Pré‑requisitos

- Docker e Docker Compose instalados
- Portas livres: `3306`, `8080`, `5174`

## Como rodar no Docker

1. No diretório raiz do projeto (`X-Men/`), execute:
   
   ```bash
   docker compose up --build -d
   ```

2. Acesse a aplicação em: `http://localhost:5174`

3. Aguarde alguns segundos até que o banco de dados seja carregado no frontend.

4. Para parar os serviços:
   
   ```bash
   docker compose down
   ```

> Observação: para reiniciar do zero (apagando dados do MySQL e uploads), use `docker compose down -v`. Isso remove o volume `db_data` e você perderá os dados.

---
