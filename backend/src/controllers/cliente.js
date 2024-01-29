const knex = require("../database/conexao");
require("dotenv").config();

const cadastrarCliente = async (req, res) => {
  const { nome, email, cpf_cnpj, data_nascimento, data_de_cadastro, celular, instagram, naturalidade, cidade, endereco } = req.body;

  const semESpacosCpf = cpf_cnpj.trim();
  const semESpacosEmail = email.trim();

  try {

    if(semESpacosCpf.length!==0){

      const cpfExiste = await knex('cliente').select('cpf_cnpj').where('cpf_cnpj', cpf_cnpj).first();

      if (cpfExiste) {
        return res.status(400).json({ mensagem: "O número de cpf ou cnpj informado já está sendo utilizado por outro usuário." });
      }   

    }

    if(semESpacosEmail.length!==0){

      const clienteEncontrado = await knex("cliente").where({ email }).first();

      if (clienteEncontrado) {
        return res.status(400).json({
          mensagem: "O e-mail informado já está sendo utilizado por outro usuário."
        });
      }

    }
    


    const dataNascimentoFormatada = data_nascimento ? new Date(data_nascimento) : null;

    const dataCadastroFormatada = data_de_cadastro ? new Date(data_de_cadastro) : null;

    const cliente = await knex("cliente")
      .insert({
        nome,
        email,
        cpf_cnpj,
        data_nascimento: dataNascimentoFormatada,
        data_de_cadastro: dataCadastroFormatada,
        celular,
        instagram,
        naturalidade,
        cidade,
        endereco
      })
      .returning("*");

    return res.status(201).json(cliente);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const editarCliente = async (req, res) => {
  const { id } = req.params;

  const { nome, email, cpf_cnpj, data_nascimento, data_de_cadastro, celular, instagram, naturalidade, cidade, endereco } = req.body;

  const semESpacosCpf = cpf_cnpj.trim();
  const semESpacosEmail = email.trim();

  try {
    
    if(semESpacosCpf.length!==0){

      const cpfExiste = await knex('cliente').select('*').where('cpf_cnpj', cpf_cnpj).whereNot('id',id);
      if (cpfExiste.length > 0) {
        return res.status(400).json({ mensagem: "O número de CPF ou CNPJ informado já está sendo utilizado por outro usuário." });
      }

    }
    
    if(semESpacosEmail.length!==0){
    
      const emailExiste = await knex('cliente').select('*').where('email', email).whereNot('id', id);

      if (emailExiste.length > 0) {
        
        return res.status(400).json({ mensagem: "O e-mail informado já está sendo utilizado por outro usuário." });
      }
  }
   

    // Cria um objeto com os dados não nulos ou vazios
    const dadosAtualizados = {
      nome,
      email,
      cpf_cnpj,
      data_nascimento,
      data_de_cadastro,
      celular,
      instagram,
      naturalidade,
      cidade,
      endereco
    };

    // Remove propriedades com valores nulos ou vazios
    Object.keys(dadosAtualizados).forEach((key) => (dadosAtualizados[key] == null || dadosAtualizados[key] === '') && delete dadosAtualizados[key]);

    // Verifica se há dados para serem atualizados
    if (Object.keys(dadosAtualizados).length === 0) {
      return res.status(400).json({ mensagem: "Nenhum dado válido para atualização fornecido." });
    }

    const cliente = await knex("cliente")
      .update(dadosAtualizados)
      .where("id",id)
      .returning("*");

    return res.status(200).json(cliente);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const excluiCliente = async (req, res) => {
    const { id } = req.params;

    try {
      const cliente = await knex("cliente")
        .select("*")
        .where({ id })
        .first();
  
      if (!cliente) {
        return res
          .status(400)
          .json({ mensagem: "Este Cliente ainda não foi cadastrado" });
      }
  
      const clienteExcluido = await knex("cliente").where({ id }).del();
  
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

const listarClientes = async (req, res) => {
  try {
      const clientes = await knex("cliente").select("*")

      return res.status(200).json(clientes);
  
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  editarCliente,
  cadastrarCliente,
  excluiCliente,
  listarClientes
};
