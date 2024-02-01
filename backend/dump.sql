CREATE DATABASE phionavalha_db;

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


CREATE TABLE SERVICO (
	id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    preco INTEGER
);

CREATE TABLE AGENDAMENTO (
    id SERIAL PRIMARY KEY,
    data_marcacao VARCHAR(10) NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_termino TIME,
    funcionario_id INTEGER NOT NULL,
    nome_cliente TEXT,
    celular TEXT NOT NULL,
    servicos TEXT[],
    FOREIGN KEY (funcionario_id) REFERENCES FUNCIONARIO(id)
);

CREATE TABLE COMANDA (
  id SERIAL PRIMARY KEY,
  funcionario_id INTEGER NOT NULL,
  servicos TEXT[],
  preco DECIMAL(10,2) NOT NULL,
  data_registro VARCHAR(10) DEFAULT TO_CHAR(CURRENT_DATE, 'DD/MM/YYYY'),
  comissao DECIMAL(10,2) NOT NULL,
  total_barberia DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (funcionario_id) REFERENCES FUNCIONARIO(id)
);


INSERT INTO servico (nome, preco) VALUES
  ('Corte', 30.00),
  ('Barbaterapia', 25.00),
  ('Corte + Barbaterapia', 50.00),
  ('Botox', 40.00),
  ('Corte + Botox', 60.00),
  ('Selagem', 60.00),
  ('Corte + Selagem', 80.00),
  ('Hidratação', 20.00),
  ('Corte + Hidratação', 40.00),
  ('Sobrancelha com Navalha', 10.00),
  ('Sobrancelha com Pinça', 15.00),
  ('Remoção de Cravo (Máscara Negra)', 20.00);
 