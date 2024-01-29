CREATE DATABASE barbearia_db;

CREATE TABLE FUNCIONARIO (
	id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  senha TEXT NOT NULL,
  cpf_cnpj CHAR(15) NOT NULL UNIQUE,
  data_nascimento DATE,
  celular TEXT NOT NULL,
  naturalidade TEXT,
  cidade TEXT,
  endereco TEXT,
  cargo TEXT NOT NULL
);

CREATE TABLE CLIENTE (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT,
    cpf_cnpj CHAR(15),
    data_nascimento DATE,
    data_de_cadastro DATE,
    celular TEXT NOT NULL,
    instagram TEXT,
    naturalidade TEXT,
    cidade TEXT,
    endereco TEXT
);

CREATE TABLE SERVICO (
	id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    preco INTEGER
);

CREATE TABLE AGENDAMENTO (
    id SERIAL PRIMARY KEY,
    data_marcacao VARCHAR(10) NOT NULL, -- Use VARCHAR para armazenar a data como string
    hora_inicio TIME NOT NULL,
    hora_termino TIME,
    cliente_id INTEGER,
    funcionario_id INTEGER NOT NULL,
    servicos TEXT[],
    FOREIGN KEY (cliente_id) REFERENCES CLIENTE(id), 
    FOREIGN KEY (funcionario_id) REFERENCES FUNCIONARIO(id)
);

CREATE TABLE COMANDA (
  id SERIAL PRIMARY KEY,
  cliente_nome TEXT,
  funcionario_id INTEGER NOT NULL,
  servicos TEXT[],
  preco DECIMAL(10,2) NOT NULL,
  data_registro VARCHAR(10) DEFAULT TO_CHAR(CURRENT_DATE, 'DD/MM/YYYY'),
  comissao DECIMAL(10,2) NOT NULL,
  total_barberia DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (funcionario_id) REFERENCES FUNCIONARIO(id)
);

INSERT INTO servico (nome, preco) VALUES
  ('Corte Adulto', 00.00),
  ('Corte Kids', 45.00),
  ('Corte Feminino', 00.00),
  ('Corte Navalhados', 50.00),
  ('Babrboterapia', 45.00),
  ('Pé e Mão', 00.00),
  ('Pé', 00.00),
  ('Mão', 00.00),
  ('SPA dos Pés', 50.00),
  ('SPA completo', 65.00),
  ('Depilação Nasal', 25.00),
  ('Depilação de Orelha', 25.00),
  ('Sobrancelha Pinça/Cera', 00.00),
  ('Acabamento', 20.00),
  ('Selagem', 00.00),
  ('Botox', 00.00),
  ('Alisamento', 00.00),
  ('Tintura Cabelo (Tinta Barbearia)', 00.00),
  ('Tintura Cabelo (Tinta Cliente)', 00.00),
  ('Tintura Barba (Tinta Cliente)', 00.00),
  ('Tintura Barba (Tinta Barbearia)', 00.00),
  ('Platinado', 00.00),
  ('Hidratação', 00.00),
  ('Lavagem Especial', 30.00),
  ('Penteado', 30.00),
  ('Revitalização Facial', 50.00);