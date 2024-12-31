# TorneioPro - Sistema de Gerenciamento de Torneios

## Descrição
Sistema para gerenciamento de torneios esportivos, permitindo o cadastro de organizadores, treinadores, jogadores, times e campeonatos.

## Requisitos
- Docker
- Docker Compose

## Como executar

1. Clone o repositório e entre na pasta do serviço de Backend
```bash
git clone git@github.com:UnBArqDsw2024-2/2024.2_G4_TorneioPro_Entrega_03.git 

cd Backend
```

2. Execute o projeto com Docker
```bash
docker compose up --build
```

3. O servidor estará disponível em `http://localhost:8000`

4. Para parar o servidor
```bash
docker compose down
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
- `POST /auth/trainers/approve` - Aprova um treinador (apenas organizadores)
  - Body: { "trainer_id": number, "approved": boolean }
  - Requer autenticação de organizador
  - Retorna: Dados do treinador aprovado

### Campeonatos
- `GET /championships/list` - Lista todos os campeonatos
- `POST /championships/create` - Cria novo campeonato
  - Body: { "name": "string", "description": "string", "start_date": "YYYY-MM-DD", "end_date": "YYYY-MM-DD" }
- `POST /championships/get` - Obtém detalhes de um campeonato específico
  - Body: { "championship_id": number }
- `POST /championships/update` - Atualiza campeonato
  - Body: { "championship_id": number, ...dados_para_atualizar }
- `POST /championships/delete` - Deleta campeonato
  - Body: { "championship_id": number }
- `POST /championships/join/request`  - Solicita entrada em campeonato
    -   Body: { "championship_id":  number, "player_id":  number, "team_id": number }
- `POST /championships/join/approve`  - Treinador aprovar solicitação
	- Body: { "request_id": number }
- `POST` /championships/join/reject/ - Treinador rejeitar solicitação
	- Body: { "request_id": number }
-  `GET` /championships/join/pending/ - Treinador listar as solicitações
- `POST /championships/addteams` - Adiciona times ao campeonato
  - Body: { "championship_id": number, "team_ids": number }
- `POST /championships/remteams` - Remove times do campeonato
  - Body: { "championship_id": number, "team_ids": number }
- `POST /championships/close` - Encerra campeonato
  - Body: { "championship_id": number }

### Times
- `GET /teams/list` - Lista todos os times
- `POST /teams/create` - Cria novo time
  - Body: { "name": "string", "description": "string" }
- `POST /teams/get` - Obtém detalhes de um time específico
  - Body: { "team_id": number }
- `POST /teams/update` - Atualiza time
  - Body: { "team_id": number, ...dados_para_atualizar }
- `POST /teams/delete` - Deleta time
  - Body: { "team_id": number }
- `POST /teams/add-player` - Adiciona jogador ao time
  - Body: { "team_id": number, "player_id": number }
- `POST /teams/remove-player` - Remove jogador do time
  - Body: { "team_id": number, "player_id": number }

### Partidas
- `GET /matches/list` - Lista todas as partidas
- `POST /matches/create` - Cria nova partida
  - Body: { "team1_id": number, "team2_id": number, "championship_id": number, "date": "YYYY-MM-DD" }
- `POST /matches/get` - Obtém detalhes de uma partida específica
  - Body: { "match_id": number }
- `POST /matches/update` - Atualiza partida
  - Body: { "match_id": number, ...dados_para_atualizar }
- `POST /matches/delete` - Deleta partida
  - Body: { "match_id": number }
- `POST /matches/set-score` - Define placar da partida
  - Body: { "match_id": number, "team1_score": number, "team2_score": number }

### Organizadores (Descarta-se por enquanto)
- `GET /organizers/list` - Lista todos os organizadores
- `POST /organizers/create` - Cria novo organizador
  - Body: { "user_id": number, ...dados_do_organizador }
- `POST /organizers/get` - Obtém detalhes de um organizador específico
  - Body: { "organizer_id": number }
- `POST /organizers/update` - Atualiza organizador
  - Body: { "organizer_id": number, ...dados_para_atualizar }
- `POST /organizers/delete` - Deleta organizador
  - Body: { "organizer_id": number }

### Treinadores
- `GET /trainers/list` - Lista todos os treinadores
- `POST /trainers/create` - Cria novo treinador
  - Body: { "user_id": number, ...dados_do_treinador }
- `POST /trainers/get` - Obtém detalhes de um treinador específico
  - Body: { "trainer_id": number }
- `POST /trainers/update` - Atualiza treinador
  - Body: { "trainer_id": number, ...dados_para_atualizar }
- `POST /trainers/delete` - Deleta treinador
  - Body: { "trainer_id": number }

### Jogadores
- `GET /players/list` - Lista todos os jogadores
- `POST /players/create` - Cria novo jogador
  - Body: { "user_id": number, ...dados_do_jogador }
- `POST /players/get` - Obtém detalhes de um jogador específico
  - Body: { "player_id": number }
- `POST /players/update` - Atualiza jogador
  - Body: { "player_id": number, ...dados_para_atualizar }
- `POST /players/delete` - Deleta jogador
  - Body: { "player_id": number }

## Exemplos de Uso

## Authentication

### Criando um organizador

Para criar um organizador, você precisa fazer uma requisição `POST` para a rota /register/request/ com os seguintes dados:

`Rota:` http://localhost:8000/auth/register/request/

`Headers:` "Content-Type: application/json"

Requer Autenticação? Não
- Auth-Type: **No Auth**.

`Body:` 

```bash
{
  "username": "seu_username",
  "email": "seu_email@exemplo.com",
  "password": "sua_senha",
  "user_type": "organizer"
}
```

`Permissões:` None

### Criando um treinador

Para criar um treinador, você precisa fazer uma requisição `POST` para a rota /register/request/ com os seguintes dados:

`Rota:` http://localhost:8000/auth/register/request/

`Headers:` "Content-Type: application/json"

Requer Autenticação? Não
- Auth-Type: **No Auth**.

`Body:` 

```bash
{
  "username": "seu_username",
  "email": "seu_email@exemplo.com",
  "password": "sua_senha",
  "user_type": "trainer"
}
```
`Permissões:` None

### Criando um jogador

Para criar um jogador, você precisa fazer uma requisição `POST` para a rota /register/request/ com os seguintes dados:

`Rota:` http://localhost:8000/auth/register/request/

`Headers:` "Content-Type: application/json"

Requer Autenticação? Não
- Auth-Type: **No Auth**.

`Body:` 

```bash
{
  "username": "seu_username",
  "email": "seu_email@exemplo.com",
  "password": "sua_senha",
  "user_type": "trainer"
}
```
`Permissões:` None

___

### Login como organizador

Para se conectar, você precisa fazer uma requisição `POST` para a rota /auth/login/ com os seguintes dados:

`Rota:` http://localhost:8000/auth/login/

`Headers:` "Content-Type: application/json"

Requer Autenticação? Não
- Auth-Type: **No Auth**.

`Body:` 

```bash
{
  "username": "seu_username",
  "password": "sua_senha"
}
```

`Permissões:` None

*Observação*: Ao logar como organizador, o sistema vai te retornar um token, guarde-o para usar no Postman (ou similares) em relação a sua autenticação.

### Login como treinador

Para se conectar, você precisa fazer uma requisição `POST` para a rota /auth/login/ com os seguintes dados:

`Rota:` http://localhost:8000/auth/login/

`Headers:` "Content-Type: application/json"

Requer Autenticação? Não
- Auth-Type: **No Auth**.

`Body:` 

```bash
{
  "username": "seu_username",
  "password": "sua_senha"
}
```

`Permissões:` None

*Observação*: O treinador só poderá utilizar a aplicação até que o organizador aprove-o.

### Login como jogador

Para se conectar, você precisa fazer uma requisição `POST` para a rota /auth/login/ com os seguintes dados:

`Rota:` http://localhost:8000/auth/login/

`Headers:` "Content-Type: application/json"

Requer Autenticação? Não
- Auth-Type: **No Auth**.

`Body:` 

```bash
{
  "username": "seu_username",
  "password": "sua_senha"
}
```

`Permissões:` None

___


### Listando treinadores pendentes

Para listar os treinadores pendentes, você precisa fazer uma requisição `GET` para a rota /auth/trainers/pending/ com os seguintes dados:

`Rota:` http://localhost:8000/auth/trainers/pending/

`Headers:` "Content-Type: application/json"

Requer Autenticação? Sim 
- Auth-Type: **Bearer Token**. Vai abrir uma caixa ao lado para colocar o Token que você guardou quando fez o login como organizador.

`Body:` None

`Permissões:` Organizador

### Aprovando um treinador pendente

Para aprovar um treinador, você precisa fazer uma requisição `POST` para a rota /auth/trainers/approve/ com os seguintes dados:

`Rota:` http://localhost:8000/auth/trainers/approve/

`Headers:` "Content-Type: application/json"

Requer Autenticação? Sim 
- "Auth-Type": **Bearer Token**. Vai abrir uma caixa ao lado para colocar o Token que você guardou quando fez o login como organizador.


`Body:` 

```bash
{
  "trainer_id": "o ID do treinador"
}
```

`Permissões:` Organizador


## Championships

### Listando campeonatos

Para listar os campeonatos criados, você precisa fazer uma requisição `GET` para a rota /championship/list/ com os seguintes dados:

`Rota:` http://localhost:8000/championships/list/

`Headers:` "Content-Type: application/json"

Requer Autenticação? Não
- Auth-Type: **No Auth**.

`Body:` None

`Permissões:` Todos, incluindo os usuários que ainda não foram autenticados


### Listando campeonatos por ID

Para listar os campeonatos criados por ID, você precisa fazer uma requisição `POST` para a rota /championship/get/ com os seguintes dados:

`Rota:` http://localhost:8000/championships/post/

`Headers:` "Content-Type: application/json"

Requer Autenticação? Não
- Auth-Type: **No Auth**.

`Body:` None

`Permissões:` Todos, incluindo os usuários que ainda não foram autenticados


### Criando campeonatos

Para criar um campeonato, você precisa fazer uma requisição `POST` para a rota /championship/create/ com os seguintes dados:

`Rota:` http://localhost:8000/championships/create/

`Headers:` "Content-Type: application/json"

Requer Autenticação? Sim 
- "Auth-Type": **Bearer Token**. Vai abrir uma caixa ao lado para colocar o Token que você guardou quando fez o login como organizador.

`Body:`
```bash
{
  "name": "Championship Name",
  "description": "Championship Description",
  "sport": "soccer",  // default is 'soccer'
  "championship_type": "points",  // can be 'points' or 'bracket'
  "start_date": "2024-12-31T13:00:00Z",  // datetime in ISO format
  "end_date": "2025-01-31T13:30:00Z"  // datetime in ISO format
  "teams": // can be empty or insert the IDs teams
}
```

`Permissões:` Organizador

*Observações*: 
- O campo Teams, o organizador decide se irá colocar os times no momento da criação do campeonato, ou posteriormente pela rota **championships/addteams/**
- O status (is_active) do campeonato é atualizado a cada 5 minutos pela classe **ChampionshipStatusMiddleware** localizada em championships/middleware.py


### Encerrando campeonatos

Para encerrar um campeonato, você precisa fazer uma requisição `POST` para a rota /championship/close/ com os seguintes dados:

`Rota:` http://localhost:8000/championships/close/

`Headers:` "Content-Type: application/json"

Requer Autenticação? Sim 
- "Auth-Type": **Bearer Token**. Vai abrir uma caixa ao lado para colocar o Token que você guardou quando fez o login como organizador.

`Body:`
```bash
{ 
    "championship_id": "o ID do campeonato",
}
```

`Permissões:` Organizador


### Atualizando campeonato por ID

Para atualizar um campeonato específico, você precisa fazer uma requisição `POST` para a rota /championships/update/ com os seguintes dados:

`Rota:` http://localhost:8000/championships/update/

`Headers:` "Content-Type: application/json"

Requer Autenticação? Sim 
- "Auth-Type": **Bearer Token**. Vai abrir uma caixa ao lado para colocar o Token que você guardou quando fez o login como organizador.

`Body:` 

```bash
{
  "championship_id": "o ID do campeonato"
}
```

`Permissões:` Organizador


### Solicitando entrada em um campeonato

Nesse, existem duas possibilidades:

- O jogador solicita entrada em um campeonato que o esporte é **individual**, nesse caso, é aprovado direto ao campeonato se tiver vaga suficiente;

- O jogador solicita entrada em um campeonato que o esporte é **team**, nesse caso, o treinador do time que o jogador escolheu precisa aprová-lo antes de entrar no campeonato, e só é enviado a solicitação caso tenha vaga suficiente.

Nas duas ocasiões, você precisa fazer uma requisição `POST` para a rota championships/championships/join/request/ com os seguintes dados:

`Rota:` http://localhost:8000/championships/join/request/

`Headers:` "Content-Type: application/json"

Requer Autenticação? Sim 
- "Auth-Type": **Bearer Token**. Vai abrir uma caixa ao lado para colocar o Token que você guardou quando fez o login como jogador.

`Body:` 

```bash
{
  "championship_id": "o ID do campeonato",
  "player_id": "o ID do jogador",
  "team_id": "o ID do time"
}
```

`Permissões:` Jogador


### Listando pendências de jogadores em um campeonato

Para listar as pendências, você precisa fazer uma requisição `POST` para a rota /championship/join/approve/ com os seguintes dados:

`Rota:` http://localhost:8000/championships/join/pending/

`Headers:` "Content-Type: application/json"

Requer Autenticação? Sim 
- "Auth-Type": **Bearer Token**. Vai abrir uma caixa ao lado para colocar o Token que você guardou quando fez o login como organizador.

`Body:`
```bash
{ 
  "request_id": "o ID da solicitação"
}
```

`Permissões:` Treinador


### Rejeitando solicitações de jogadores em um campeonato

Para rejeitar as solicitações de jogadores, você precisa fazer uma requisição `POST` para a rota /championship/join/reject/ com os seguintes dados:

`Rota:` http://localhost:8000/championships/join/reject/

`Headers:` "Content-Type: application/json"

Requer Autenticação? Sim 
- "Auth-Type": **Bearer Token**. Vai abrir uma caixa ao lado para colocar o Token que você guardou quando fez o login como organizador.

`Body:`
```bash
{ 
  "request_id": "o ID da solicitação"
}
```

`Permissões:` Treinador


### Aprovando jogador em um time de um campeonato

Para aprovar um jogador em um time, você precisa fazer uma requisição `POST` para a rota /championship/join/approve/ com os seguintes dados:

`Rota:` http://localhost:8000/championships/join/approve/

`Headers:` "Content-Type: application/json"

Requer Autenticação? Sim 
- "Auth-Type": **Bearer Token**. Vai abrir uma caixa ao lado para colocar o Token que você guardou quando fez o login como organizador.

`Body:`
```bash
{ 
  "request_id": "o ID da solicitação"
}
```

`Permissões:` Treinador


### Adicionando times em um campeonato

Para adicionar times em um campeonato, você precisa fazer uma requisição `POST` para a rota /championship/addteams/ com os seguintes dados:

`Rota:` http://localhost:8000/championships/addteams/

`Headers:` "Content-Type: application/json"

Requer Autenticação? Sim 
- "Auth-Type": **Bearer Token**. Vai abrir uma caixa ao lado para colocar o Token que você guardou quando fez o login como organizador.

`Body:`
```bash
{ 
    "championship_id": "o ID do campeonato",
    "team_ids": [] "IDs dos times que deseja-se adicionar" 
}
```

`Permissões:` Organizador


### Excluindo times em um campeonato

Para excluir times em um campeonato, você precisa fazer uma requisição `POST` para a rota /championship/remteams/ com os seguintes dados:

`Rota:` http://localhost:8000/championships/remteams/

`Headers:` "Content-Type: application/json"

Requer Autenticação? Sim 
- "Auth-Type": **Bearer Token**. Vai abrir uma caixa ao lado para colocar o Token que você guardou quando fez o login como organizador.

`Body:`
```bash
{ 
    "championship_id": "o ID do campeonato",
    "team_ids": [] "IDs dos times que deseja-se excluir" 
}
```

`Permissões:` Organizador


### Deletando treinador ativo por ID

Para deletar um treinador ativo específico, você precisa fazer uma requisição `POST` para a rota /trainers/delete/ com os seguintes dados:

`Rota:` http://localhost:8000/trainers/delete/

`Headers:` "Content-Type: application/json"

Requer Autenticação? Sim 
- "Auth-Type": **Bearer Token**. Vai abrir uma caixa ao lado para colocar o Token que você guardou quando fez o login como organizador.

`Body:` 

```bash
{
    "trainer_id": "o ID do treinador"
}
```

`Permissões`: Organizador


## Trainers

### Listando treinadores ativos

Para listar os treinadores ativos, você precisa fazer uma requisição `GET` para a rota /trainers/list/ com os seguintes dados:

`Rota:` http://localhost:8000/trainers/list/

`Headers:` "Content-Type: application/json"

Requer Autenticação? Sim 
- "Auth-Type": **Bearer Token**. Vai abrir uma caixa ao lado para colocar o Token que você guardou quando fez o login como organizador.

`Body:` None

`Permissões`: Organizador

### Listando treinador ativo por ID

Para listar um treinador ativo específico, você precisa fazer uma requisição `POST` para a rota /trainers/get/ com os seguintes dados:

`Rota:` http://localhost:8000/trainers/get/

`Headers:` "Content-Type: application/json"

Requer Autenticação? Sim 
- "Auth-Type": **Bearer Token**. Vai abrir uma caixa ao lado para colocar o Token que você guardou quando fez o login como organizador.

`Body:` 

```bash
{
    "trainer_id": "o ID do treinador"
}
```

`Permissões`: Organizador


### Atualizando treinador ativo por ID

Para atualizar um treinador ativo específico, você precisa fazer uma requisição `POST` para a rota /trainers/update/ com os seguintes dados:

`Rota:` http://localhost:8000/trainers/update/

`Headers:` "Content-Type: application/json"

Requer Autenticação? Sim 
- "Auth-Type": **Bearer Token**. Vai abrir uma caixa ao lado para colocar o Token que você guardou quando fez o login como organizador.

`Body:` 

```bash
{
    "trainer_id": "o ID do treinador"
}
```

`Permissões`: Organizador


### Deletando treinador ativo por ID

Para deletar um treinador ativo específico, você precisa fazer uma requisição `POST` para a rota /trainers/delete/ com os seguintes dados:

`Rota:` http://localhost:8000/trainers/delete/

`Headers:` "Content-Type: application/json"

Requer Autenticação? Sim 
- "Auth-Type": **Bearer Token**. Vai abrir uma caixa ao lado para colocar o Token que você guardou quando fez o login como organizador.

`Body:` 

```bash
{
    "trainer_id": "o ID do treinador"
}
```

`Permissões`: Organizador

## Players

### Listando jogadores

Para listar os jogadores, você precisa fazer uma requisição `GET` para a rota /players/list/ com os seguintes dados:

`Rota:` http://localhost:8000/players/list/

`Headers:` "Content-Type: application/json"

Requer Autenticação? Sim 
- "Auth-Type": **Bearer Token**. Vai abrir uma caixa ao lado para colocar o Token que você guardou quando fez o login como organizador.

`Body:` None

*Observação*: Apenas os treinadores APROVADOS e organizadores devem ter a possibilidade de listar os jogadores registrados.