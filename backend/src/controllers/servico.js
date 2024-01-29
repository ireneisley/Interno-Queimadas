const knex = require("../database/conexao");
require("dotenv").config();

const cadastrarServico = async (req, res) => {

    const { nome, preco} = req.body;
  
    try {
  
      const servicoEncontrado = await knex("servico").where({ nome }).first();
    
      if (servicoEncontrado) {
        return res.status(400).json({
          mensagem: "O  nome do serviço informado já está existe."
        });
      }
     
      const servico = await knex("servico")
        .insert({
          nome,
          preco
        })
        .returning("*");
  
      return res.status(201).json(servico);
  
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  };
  
  
  const editarServico = async (req, res) => {
     const { nome, preco } = req.body;
     const { id } = req.params;
  
     try {
  
        const servicoEncontrado = await knex("servico").where({ nome }).first();
    
        if (servicoEncontrado) {
          return res.status(400).json({
            mensagem: "O  nome do serviço informado já está existe."
          });
        }
  
       const servico = await knex("servico")
         .update({ nome,preco }).where("id", id).returning("*");
  
       
  
       return res.status(200).json(servico);
  
     } catch (error) {
       return res.status(500).json({ mensagem: "Erro interno do servidor" });
     }
  };
  
  const excluirServico = async (req, res) => {
      const { id } = req.params;
      try {
        const servico = await knex("servico")
          .select("*")
          .where({ id })
          .first();
    
        if (!servico) {
          return res
            .status(400)
            .json({ mensagem: "Este serviço ainda não foi cadastrado" });
        }
    
    
        const servicoExcluido = await knex("servico").where({ id }).del();
    
    
        return res.status(204).json();
      } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
      }
  };
  
  const listarServico = async (req, res) => {
    try {
  
        const servico = await knex("servico").select("*")
  
        return res.status(200).json(servico);
    
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  };

  const listarPrecoServico = async (req,res) =>{

    const { nome } = req.query;

    try{

      const preco = await knex("servico").select("preco").where("nome",nome)
  
        return res.status(200).json(preco);

    }catch(error){
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  };
  
  module.exports = {
    cadastrarServico,
    editarServico,
    listarServico,
    excluirServico,
    listarPrecoServico
  };