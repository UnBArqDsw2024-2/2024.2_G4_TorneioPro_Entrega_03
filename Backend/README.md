# TorneioPro - Sistema de Gerenciamento de Torneios

## Descrição
Sistema para gerenciamento de torneios esportivos, permitindo o cadastro de organizadores, treinadores, jogadores, times e campeonatos.

## Requisitos
- Docker
- Docker Compose

## Como executar

1. Clone o repositório
```bash
git clone <repository-url>
cd Backend
```

2. Configure as variáveis de ambiente (opcional)
- Crie um arquivo `.env` baseado no `.env.example`
- Ajuste as variáveis conforme necessário

3. Execute o projeto com Docker
```bash
docker-compose up --build
```

4. O servidor estará disponível em `http://localhost:8000`

5. Para parar o servidor
```bash
docker-compose down
```

## Endpoints disponíveis

### Autenticação
- `POST /auth/login` - Login de usuário
  - Body: { "email": "string", "password": "string" }
  - Retorna: Token de acesso
- `POST /auth/register/request` - Registro de novo usuário
  - Body: { "email": "string", "password": "string", "name": "string", "role": "string" }
  - Obs: Jogadores são aprovados automaticamente, treinadores precisam de aprovação
- `GET /auth/trainers/pending` - Lista treinadores pendentes de aprovação (apenas organizadores)
  - Requer autenticação de organizador
  - Retorna: Lista de treinadores pendentes
- `POST /auth/trainers/approve/{user_id}` - Aprova um treinador (apenas organizadores)
  - Requer autenticação de organizador
  - Retorna: Dados do treinador aprovado

### Campeonatos
- `GET /championships/` - Lista todos os campeonatos
- `POST /championships/` - Cria novo campeonato
- `GET /championships/{id}` - Obtém detalhes de um campeonato específico
- `POST /championships/join/request` - Solicita entrada em campeonato
- `POST /championships/addteams/{[idTime]}` - Adiciona times ao campeonato
- `POST /championships/remteams/{[idTime]}` - Remove times do campeonato
- `PUT /championships/{id}` - Atualiza campeonato
- `DELETE /championships/{id}` - Deleta campeonato
- `POST /championships/close/{id}` - Encerra campeonato

### Times
- `GET /teams/` - Lista todos os times
- `GET /teams/{idTreinador}` - Lista times de um treinador
- `POST /teams/` - Cria novo time
- `GET /teams/{id}` - Obtém detalhes de um time específico
- `POST /teams/addplayers/{[idJogador]}` - Adiciona jogadores ao time
- `POST /teams/remplayers/{[idJogador]}` - Remove jogadores do time
- `PUT /teams/{id}` - Atualiza time
- `DELETE /teams/{id}` - Deleta time

### Partidas
- `GET /matchs/` - Lista todas as partidas
- `POST /matchs/` - Cria nova partida
- `GET /matchs/{id}` - Obtém detalhes de uma partida específica
- `PUT /matchs/{id}` - Atualiza partida
- `DELETE /matchs/{id}` - Deleta partida

### Organizadores
- `GET /organizers/` - Lista todos os organizadores
- `POST /organizers/` - Cria novo organizador
- `GET /organizers/{id}` - Obtém detalhes de um organizador específico
- `PUT /organizers/{id}` - Atualiza organizador
- `DELETE /organizers/{id}` - Deleta organizador

### Treinadores
- `GET /trainers/` - Lista todos os treinadores
- `POST /trainers/` - Cria novo treinador
- `GET /trainers/{id}` - Obtém detalhes de um treinador específico
- `PUT /trainers/{id}` - Atualiza treinador
- `DELETE /trainers/{id}` - Deleta treinador

### Jogadores
- `GET /players/` - Lista todos os jogadores
- `POST /players/` - Cria novo jogador
- `GET /players/{id}` - Obtém detalhes de um jogador específico
- `PUT /players/{id}` - Atualiza jogador
- `DELETE /players/{id}` - Deleta jogador

## Autenticação
A maioria dos endpoints requer autenticação. Para acessá-los, é necessário:
1. Fazer login através do endpoint `/auth/login`
2. Usar o token retornado no header das requisições:
   ```
   Authorization: Bearer <seu-token>
   ```
