USE torneiopro;

-- Inserindo Usuários
INSERT INTO User (nome, email, senha, dtNascimento, cpf) VALUES
-- Admins
('Carlos Administrador', 'admin@torneiopro.com', 'senha123', '1990-01-15', '12345678901'),

-- Organizadores
('Maria Organizadora', 'maria.org@torneiopro.com', 'senha456', '1992-03-20', '23456789012'),
('João Organizador', 'joao.org@torneiopro.com', 'senha789', '1988-07-10', '34567890123'),

-- Treinadores
('Pedro Treinador', 'pedro.coach@torneiopro.com', 'senha321', '1985-05-25', '45678901234'),
('Ana Treinadora', 'ana.coach@torneiopro.com', 'senha654', '1987-09-12', '56789012345'),

-- Jogadores
('Lucas Silva', 'lucas@email.com', 'senha987', '1995-04-18', '67890123456'),
('Julia Santos', 'julia@email.com', 'senha147', '1996-08-22', '78901234567'),
('Rafael Oliveira', 'rafael@email.com', 'senha258', '1994-11-30', '89012345678'),
('Mariana Costa', 'mariana@email.com', 'senha369', '1997-02-15', '90123456789'),
('Bruno Pereira', 'bruno@email.com', 'senha741', '1993-06-28', '01234567890');

-- Atribuindo Roles aos Usuários
INSERT INTO userType (userType, user_id) VALUES
-- Admin
('ADMIN', 1),

-- Organizadores
('ORGANIZADOR', 2),
('ORGANIZADOR', 3),

-- Treinadores
('TREINADOR', 4),
('TREINADOR', 5),

-- Jogadores
('JOGADOR', 6),
('JOGADOR', 7),
('JOGADOR', 8),
('JOGADOR', 9),
('JOGADOR', 10);

-- Inserindo Esportes
INSERT INTO Sport (nome, tipo) VALUES
('Futebol', 'Coletivo'),
('Basquete', 'Coletivo'),
('Vôlei', 'Coletivo'),
('Futsal', 'Coletivo'),
('Handebol', 'Coletivo');

-- Inserindo Times
INSERT INTO Team (nome, descricao, capacidade, coach_id, sport_id) VALUES
-- Times de Futebol
('Dragões FC', 'Time de futebol competitivo', 22, 4, 1),
('Águias United', 'Time de futebol amador', 22, 4, 1),

-- Times de Basquete
('Basket Stars', 'Time profissional de basquete', 12, 5, 2),
('Leões do Basquete', 'Time amador de basquete', 12, 5, 2),

-- Times de Vôlei
('Vôlei Masters', 'Time de vôlei adulto', 12, 4, 3),

-- Times de Futsal
('Futsal Elite', 'Time de futsal competitivo', 14, 5, 4);

-- Inserindo Campeonatos
INSERT INTO Championship (nome, descricao, local, dtInicio, dtFim, categoria, sport_id) VALUES
('Copa Brasília 2024', 'Campeonato Regional de Futebol', 'Estádio Municipal', '2024-03-01', '2024-04-30', 'Amador', 1),
('Liga Basquete DF', 'Torneio de Basquete', 'Ginásio Central', '2024-02-15', '2024-03-15', 'Profissional', 2),
('Torneio Vôlei 2024', 'Campeonato de Vôlei', 'Arena Vôlei', '2024-04-01', '2024-05-30', 'Amador', 3),
('Copa Futsal 2024', 'Torneio de Futsal', 'Ginásio Coberto', '2024-03-15', '2024-04-15', 'Semi-pro', 4);

-- Inserindo Partidas
INSERT INTO `Match` (dtPartida, local, status, horario, champ_id) VALUES
-- Partidas de Futebol
('2024-03-01', 'Campo Principal', 'AGENDADA', '15:00:00', 1),
('2024-03-08', 'Campo 2', 'AGENDADA', '16:00:00', 1),

-- Partidas de Basquete
('2024-02-15', 'Quadra 1', 'AGENDADA', '19:00:00', 2),
('2024-02-22', 'Quadra 2', 'AGENDADA', '20:00:00', 2),

-- Partidas de Vôlei
('2024-04-01', 'Quadra Vôlei', 'AGENDADA', '14:00:00', 3),

-- Partidas de Futsal
('2024-03-15', 'Quadra Futsal', 'AGENDADA', '18:00:00', 4);

-- Relacionando Times e Jogadores (composto)
INSERT INTO composto (id_Team, user_id) VALUES
-- Jogadores do Dragões FC
(1, 6),
(1, 7),
-- Jogadores do Basket Stars
(3, 8),
(3, 9),
-- Jogadores do Vôlei Masters
(5, 10);

-- Relacionando Times e Partidas (disputa)
INSERT INTO disputa (id_Team, match_id) VALUES
-- Partidas de Futebol
(1, 1), -- Dragões FC
(2, 1), -- Águias United
-- Partidas de Basquete
(3, 3), -- Basket Stars
(4, 3), -- Leões do Basquete
-- Partidas de Vôlei
(5, 5), -- Vôlei Masters
-- Partidas de Futsal
(6, 6); -- Futsal Elite

-- Relacionando Organizadores e Campeonatos (organiza)
INSERT INTO organiza (user_id, champ_id) VALUES
(2, 1), -- Maria organiza Copa Brasília
(2, 2), -- Maria organiza Liga Basquete
(3, 3), -- João organiza Torneio Vôlei
(3, 4); -- João organiza Copa Futsal

-- Relacionando Jogadores e Campeonatos (tem)
INSERT INTO tem (champ_id, user_id) VALUES
-- Jogadores na Copa Brasília
(1, 6),
(1, 7),
-- Jogadores na Liga Basquete
(2, 8),
(2, 9),
-- Jogadores no Torneio Vôlei
(3, 10);