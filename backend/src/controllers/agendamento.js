const knex = require("../database/conexao");
const bcrypt = require("bcrypt");
require("dotenv").config();

const agendar = async (req, res) => {
    const {nome_barbeiro , nome_cliente,  servicos, data_marcacao , celular, hora_inicio, hora_termino} = req.body;
  
    try {
      const funcionario = await knex('funcionario').select("*").where('nome', nome_barbeiro).first();

      if (!funcionario) {
        return res.status(400).json({ mensagem: "Funcionário não encontrado." });
      }

      for (let servico of servicos) {
        let serv = await knex('servico').select("*").where('nome', servico).first();
        if (!serv) {
          return res.status(400).json({ mensagem: "Serviço não encontrado." });
        }

      }
      

      const funcionarioId = parseInt(funcionario.id, 10);
      


      const horario = await knex("agendamento")
      .select("*")
      .where("funcionario_id", funcionarioId)
      .where("data_marcacao", data_marcacao)
      .andWhere(builder => {
        builder.where(function () {
          this.where("hora_inicio", ">=", hora_inicio)
            .andWhere("hora_inicio", "<=", hora_termino);
        }).orWhere(function () {
          this.where("hora_inicio", "<=", hora_inicio)
            .andWhere("hora_termino", ">=", hora_inicio);
        });
      })
      .first();
      
      if(horario){
        return res.status(400).json({ mensagem: "Horário ocupado." });
      }
      const agendamento = await knex("agendamento")
        .insert({
            nome_cliente,
            celular,
            data_marcacao,
            funcionario_id: funcionarioId,
            hora_inicio,
            hora_termino,
            servicos
        })
        .returning("*");
  
  
      return res.status(201).json(agendamento);
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

const listarAgendamentos = async (req, res) => {
    try {

        // const agendamento = await knex("agendamento").select("agendamento.id","agendamento.data_marcacao", "agendamento.hora_inicio","agendamento.hora_termino", "cliente.nome as nome_cliente", "funcionario.nome as barbeiro_nome","agendamento.servicos as servicos")
        // .join("cliente", "cliente.id","agendamento.cliente_id")
        // .join("funcionario","funcionario.id","agendamento.funcionario_id")
        // .orderBy("agendamento.data_marcacao")
        // .orderBy("agendamento.hora_inicio");

        const agendamento = await knex("agendamento").select("agendamento.id","agendamento.data_marcacao", "agendamento.hora_inicio","agendamento.hora_termino", "cliente.nome as nome_cliente", "funcionario.nome as barbeiro_nome","agendamento.servicos as servicos")
        .leftJoin("cliente", "cliente.id","agendamento.cliente_id")
        .leftJoin("funcionario","funcionario.id","agendamento.funcionario_id")
        .orderBy("agendamento.data_marcacao")
        .orderBy("agendamento.hora_inicio");

        return res.status(200).json(agendamento);
    
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

const excluiAgendamento = async (req, res) => {

    const { id } = req.params;
    try {
      const agendamento = await knex("agendamento")
        .select("*")
        .where({ id })
        .first();
  
      if (!agendamento) {
        return res
          .status(400)
          .json({ mensagem: "Este Cliente ainda não foi cadastrado" });
      }
  
      const agendamentoExcluido = await knex("agendamento").where({ id }).del();
  
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

const editarAgendamento = async (req, res) => {
  const { id } = req.params;

  const { nome_barbeiro, celular, nome_cliente, servicos, data_marcacao, hora_inicio, hora_termino } = req.body;

  try {
    const funcionario = await knex('funcionario').select("*").where({ nome: nome_barbeiro }).first();

    if (!funcionario) {
      return res.status(400).json({ mensagem: "Funcionário não encontrado." });
    }

    const horario = await knex("agendamento")
      .select("*")
      .where("funcionario_id", funcionario.id)
      .where("data_marcacao", data_marcacao)
      .andWhere(builder => {
        builder.where(function () {
          this.where("hora_inicio", ">=", hora_inicio)
            .andWhere("hora_inicio", "<=", hora_termino);
        }).orWhere(function () {
          this.where("hora_inicio", "<=", hora_inicio)
            .andWhere("hora_termino", ">=", hora_inicio);
        });
      })
      .first();

    if (horario) {
      return res.status(400).json({ mensagem: "Horário ocupado." });
    }

    // Cria um objeto com os dados não nulos ou vazios
    const dadosAtualizados = {
      funcionario_id: funcionario.id,
      nome_cliente,
      celular,
      servicos,
      data_marcacao,
      hora_inicio,
      hora_termino
    };

    // Remove propriedades com valores nulos ou vazios
    Object.keys(dadosAtualizados).forEach((key) => (dadosAtualizados[key] == null || dadosAtualizados[key] === '') && delete dadosAtualizados[key]);

    // Verifica se há dados para serem atualizados
    if (Object.keys(dadosAtualizados).length === 0) {
      return res.status(400).json({ mensagem: "Nenhum dado válido para atualização fornecido." });
    }

    const agendamento = await knex("agendamento")
      .update(dadosAtualizados)
      .where("id", id)
      .returning("*");

    return res.status(200).json(agendamento);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

 const listarAgendamentosBarbeiro = async (req, res) => {

    const { id } = req.params;
    try {

        const barbeiro = await knex("funcionario").select("*").where("id",id).first();

        const agendamento = await knex("agendamento").select("agendamento.data_marcacao", "agendamento.hora_inicio", "agendamento.hora_termino", "cliente.nome as nome_cliente", "funcionario.nome as barbeiro_nome", "agendamento.servicos as servicos", "agendamento.id as id")
        .leftJoin("cliente", "cliente.id","agendamento.cliente_id")
        .leftJoin("funcionario","funcionario.id","agendamento.funcionario_id")
        .where("funcionario_id",id);

        return res.status(200).json(agendamento);
    
    } catch (error) {
      console.log(error);
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

const listarAgendamentosPorData = async (req, res) => {

  const { data } = req.query;
  try {

      const agendamento = await knex("agendamento").select("agendamento.id","agendamento.data_marcacao", "agendamento.hora_inicio","agendamento.hora_termino", "cliente.nome as nome_cliente", "funcionario.nome as barbeiro_nome","agendamento.servicos as servicos")
      .leftJoin("cliente", "cliente.id","agendamento.cliente_id")
      .leftJoin("funcionario","funcionario.id","agendamento.funcionario_id")
      .where("data_marcacao",data)
      .orderBy("agendamento.hora_inicio", "asc");
      
      return res.status(200).json(agendamento);
  
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const listarAgendamentosBarbeiroPorData = async (req, res) => {

  const { id } = req.params;
  const { data } = req.query;

  try {

      const barbeiro = await knex("funcionario").select("*").where("id",id).first();

      const agendamento = await knex("agendamento").select("agendamento.data_marcacao", "agendamento.hora_inicio", "agendamento.hora_termino", "cliente.nome as nome_cliente", "funcionario.nome as barbeiro_nome", "agendamento.servicos as servicos","agendamento.id as id")
      .leftJoin("cliente", "cliente.id","agendamento.cliente_id")
      .leftJoin("funcionario","funcionario.id","agendamento.funcionario_id")
      .where("funcionario_id",id)
      .where("data_marcacao",data)
      .orderBy("agendamento.hora_inicio", "asc");

      return res.status(200).json(agendamento);
  
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
    agendar,
    listarAgendamentos,
    excluiAgendamento,
    editarAgendamento,
    listarAgendamentosBarbeiro,
    listarAgendamentosPorData,
    listarAgendamentosBarbeiroPorData
};