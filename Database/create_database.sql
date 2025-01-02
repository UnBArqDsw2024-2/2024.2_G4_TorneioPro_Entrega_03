CREATE DATABASE IF NOT EXISTS torneiopro;
USE torneiopro;

-- Tabela User
CREATE TABLE User (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL,
    dtNascimento DATE NOT NULL,
    cpf VARCHAR(11) UNIQUE
);

-- Tabela Sport
CREATE TABLE Sport (
    sport_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(100) NOT NULL
);

-- Tabela Team
CREATE TABLE Team (
    id_Team INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(100),
    capacidade INT NOT NULL,
    coach_id INT,
    sport_id INT,
    FOREIGN KEY (coach_id) REFERENCES User(user_id),
    FOREIGN KEY (sport_id) REFERENCES Sport(sport_id)
);

-- Tabela Championship
CREATE TABLE Championship (
    champ_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(100),
    local VARCHAR(100),
    dtInicio DATE NOT NULL,
    dtFim DATE NOT NULL,
    categoria VARCHAR(100),
    sport_id INT,
    FOREIGN KEY (sport_id) REFERENCES Sport(sport_id)
);

-- Tabela Match
CREATE TABLE Match (
    match_id INT PRIMARY KEY AUTO_INCREMENT,
    dtPartida DATE NOT NULL,
    local VARCHAR(100) NOT NULL,
    status ENUM('AGENDADA', 'EM_ANDAMENTO', 'FINALIZADA', 'CANCELADA') NOT NULL,
    horario TIME NOT NULL,
    champ_id INT,
    FOREIGN KEY (champ_id) REFERENCES Championship(champ_id)
);

-- Tabela User
CREATE TABLE userType (
    userType ENUM('ADMIN', 'ORGANIZADOR', 'TREINADOR', 'JOGADOR'),
    user_id INT,
    PRIMARY KEY (userType, user_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

-- Tabelas de Relacionamento
CREATE TABLE tem (
    champ_id INT,
    user_id INT,
    PRIMARY KEY (champ_id, user_id),
    FOREIGN KEY (champ_id) REFERENCES Championship(champ_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE organiza (
    user_id INT,
    champ_id INT,
    PRIMARY KEY (user_id, champ_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (champ_id) REFERENCES Championship(champ_id)
);

CREATE TABLE composto (
    id_Team INT,
    user_id INT,
    PRIMARY KEY (id_Team, user_id),
    FOREIGN KEY (id_Team) REFERENCES Team(id_Team),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE disputa (
    id_Team INT,
    match_id INT,
    PRIMARY KEY (id_Team, match_id),
    FOREIGN KEY (id_Team) REFERENCES Team(id_Team),
    FOREIGN KEY (match_id) REFERENCES Match(match_id)
);

-- Criação das ROLES
CREATE ROLE IF NOT EXISTS 'admin';
CREATE ROLE IF NOT EXISTS 'organizador';
CREATE ROLE IF NOT EXISTS 'treinador';
CREATE ROLE IF NOT EXISTS 'jogador';

-- Privilégios para ADMIN
-- Admin tem acesso total ao sistema
GRANT ALL PRIVILEGES ON torneiopro.* TO 'admin';
GRANT CREATE USER ON *.* TO 'admin';
GRANT GRANT OPTION ON *.* TO 'admin';

-- Privilégios para ORGANIZADOR
-- Pode gerenciar campeonatos, visualizar todos os dados e gerenciar partidas
GRANT SELECT, INSERT, UPDATE, DELETE ON torneiopro.Championship TO 'organizador';
GRANT SELECT, INSERT, UPDATE, DELETE ON torneiopro.Match TO 'organizador';
GRANT SELECT ON torneiopro.User TO 'organizador';
GRANT SELECT ON torneiopro.Team TO 'organizador';
GRANT SELECT ON torneiopro.Sport TO 'organizador';
GRANT SELECT, INSERT, UPDATE, DELETE ON torneiopro.organiza TO 'organizador';
GRANT SELECT, INSERT, UPDATE, DELETE ON torneiopro.tem TO 'organizador';
GRANT SELECT, INSERT, UPDATE, DELETE ON torneiopro.disputa TO 'organizador';

-- Privilégios para TREINADOR
-- Pode gerenciar seus times e ver informações de campeonatos e jogadores
GRANT SELECT, UPDATE ON torneiopro.Team TO 'treinador';
GRANT SELECT ON torneiopro.Championship TO 'treinador';
GRANT SELECT ON torneiopro.Match TO 'treinador';
GRANT SELECT ON torneiopro.User TO 'treinador';
GRANT SELECT ON torneiopro.Sport TO 'treinador';
GRANT SELECT, INSERT, DELETE ON torneiopro.composto TO 'treinador';

-- Privilégios para JOGADOR
-- Pode apenas visualizar informações
GRANT SELECT ON torneiopro.Championship TO 'jogador';
GRANT SELECT ON torneiopro.Match TO 'jogador';
GRANT SELECT ON torneiopro.Team TO 'jogador';
GRANT SELECT ON torneiopro.Sport TO 'jogador';
