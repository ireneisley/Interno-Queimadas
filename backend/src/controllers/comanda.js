const knex = require("../database/conexao");
const bcrypt = require("bcrypt");
require("dotenv").config();

const cadastrarComanda = async (req, res) => {

    const { barbeiroNome, clienteNome , servicoLista, preco} = req.body;
  
    try {

        const barbeiro = await knex("funcionario").select("*").where("nome",barbeiroNome).first();

        for (let servico of servicoLista){

            let resultado = await knex("servico").select("*").where("nome",servico).first();

            if(!resultado){
                return res.status(400).json({ mensagem: "Serviço não encontrado."});
            }
        }

        if(!barbeiro){
            return res.status(400).json({ mensagem: "Barbeiro não encontrado."});
        }

        let comissao = 0;
        let comanda = null;
        let totalBarberia = 0; 

        if (barbeiro.cargo === "Barbeiro"){
          comissao = ((40/100)*preco);
          totalBarberia = preco - comissao;
          comanda = await knex("comanda")
          .insert({
            funcionario_id: barbeiro.id,
            servicos: servicoLista,
            preco,
            cliente_nome: clienteNome,
            comissao,
            total_barberia:totalBarberia
          })
          .returning("*");
        }
        else if(barbeiro.cargo==='Manicure' || barbeiro.cargo==='Cabeleireiro(a)'){
          comissao = ((50/100)*preco);
          totalBarberia = preco - comissao;
          comanda = await knex("comanda")
          .insert({
            funcionario_id: barbeiro.id,
            servicos: servicoLista,
            preco,
            cliente_nome: clienteNome,
            comissao,
            total_barberia:totalBarberia
          })
          .returning("*");
        }
        
  
      
  
      return res.status(201).json(comanda);
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  };
  
  
  const editarComanda = async (req, res) => {

    const { id } = req.params;
    console.log("Id",id);
    const { barbeiroNome, clienteNome, servicoLista, preco } = req.body;
  
    try {
      // Cria um objeto com os dados não nulos ou vazios
      const dadosAtualizados = {
        barbeiroNome,
        clienteNome,
        servicoLista,
        preco
      };
  
      // Remove propriedades com valores nulos ou vazios
      Object.keys(dadosAtualizados).forEach((key) => (dadosAtualizados[key] == null || dadosAtualizados[key] === '') && delete dadosAtualizados[key]);
  
      // Verifica se há dados para serem atualizados
      if (Object.keys(dadosAtualizados).length === 0) {
        return res.status(400).json({ mensagem: "Nenhum dado válido para atualização fornecido." });
      }
  
      const comanda = await knex("comanda")
        .update(dadosAtualizados)
        .where("id", id)
        .returning("*");
  
      return res.status(200).json(comanda);
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  };
  
const excluiComanda = async (req, res) => {
    const { id } = req.params;
    try {
    const comanda = await knex("comanda")
        .select("*")
        .where({ id })
        .first();

    if (!comanda) {
        return res
        .status(400)
        .json({ mensagem: "Esta Comanda ainda não foi cadastrado" });
    }


    const comandaExcluido = await knex("comanda").where({ id }).del();


    return res.status(204).json();
    } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

const listarcomandas = async (req, res) => {
    try {

        const comanda = await knex("comanda").select("funcionario.nome as barbeiro_nome","comanda.servicos as servicos","comanda.preco", "comanda.id as id", "comanda.comissao as comissao", "comanda.total_barberia as total_barberia")
        .join("funcionario","funcionario.id","comanda.funcionario_id")
        return res.status(200).json(comanda);
    
    } catch (error) {

      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

const listarComandasPorData = async (req,res) =>{

  const { data } = req.query;

  try {

    const somaPrecos = await knex("comanda")
      .select(knex.raw("SUM(preco) as total_precos"),
      knex.raw("SUM(comissao) as total_comissao"),
      knex.raw("SUM(total_barberia) as total_barberia"))
      .where("data_registro", data);
  
    return res.status(200).json(somaPrecos);

} catch (error) {

  console.log(error);

  return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

const faturamentoPorMes = async (req,res) =>{

  const { data } = req.query;
  const [dia, mes, ano] = data.split('/');
  const dataFormatada = `${mes}/${ano}`;

  try{

    const resultado = await knex("comanda")
  .select(
    knex.raw("TO_CHAR(TO_DATE(data_registro, 'DD/MM/YYYY'), 'MM/YYYY') as mes"),
    knex.raw("SUM(preco) as total_precos"),
    knex.raw("SUM(comissao) as total_comissao"),
    knex.raw("SUM(total_barberia) as total_barberia")
  )
  .whereRaw("TO_CHAR(TO_DATE(data_registro, 'DD/MM/YYYY'), 'MM/YYYY') = ?", [dataFormatada])
  .groupByRaw("TO_CHAR(TO_DATE(data_registro, 'DD/MM/YYYY'), 'MM/YYYY')");


      return res.status(200).json(resultado);


  }catch (error) {

  console.log(error);

  return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }

}

const faturamentoPorSemana = async (req, res) => {
  const { data } = req.query;

  try {
    const somaPrecos = await knex("comanda")
      .select(
        knex.raw("EXTRACT(WEEK FROM TO_DATE(data_registro, 'DD/MM/YYYY')) as semana"),
        knex.raw("SUM(preco) as total_precos"),
        knex.raw("SUM(comissao) as total_comissao"),
        knex.raw("SUM(total_barberia) as total_barberia")
      )
      .whereRaw("EXTRACT(WEEK FROM TO_DATE(data_registro, 'DD/MM/YYYY')) = EXTRACT(WEEK FROM TO_DATE(?, 'DD/MM/YYYY'))", [data])
      .groupByRaw("EXTRACT(WEEK FROM TO_DATE(data_registro, 'DD/MM/YYYY'))");

    return res.status(200).json(somaPrecos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
    cadastrarComanda,
    editarComanda,
    excluiComanda,
    listarcomandas,
    listarComandasPorData,
    faturamentoPorMes,
    faturamentoPorSemana
}