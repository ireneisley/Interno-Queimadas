const express = require('express');
const funcionarioSchema = require("../schema/funcionarioSchema");
const loginSchema = require("../schema/loginSchema");
const clienteSchema = require("../schema/clienteSchema");
const agendamentoSchema = require("../schema/agendamentoSchema");
const comandaSchema = require("../schema/comandaSchema");
const { editarFuncionario,cadastrarFuncionario, excluiFuncionario, listarFuncionarios, listarFuncionarioCargo, listarTrabalhadores} = require("../controllers/funcionario")
const { agendar, editarAgendamento, excluiAgendamento, listarAgendamentos, listarAgendamentosBarbeiro, listarAgendamentosPorData,listarAgendamentosBarbeiroPorData } = require("../controllers/agendamento");
const { cadastrarComanda, editarComanda, excluiComanda, listarcomandas, listarComandasPorData, faturamentoPorMes, faturamentoPorSemana} = require("../controllers/comanda");
const { cadastrarServico, editarServico, listarServico, excluirServico, listarPrecoServico } = require("../controllers/servico")
const login = require("../controllers/login");
const validarRequisicao = require("../middleware/validarRequisicao");
const loginAutenticacao = require("../middleware/loginAutenticacao");

const router = express();

router.post("/funcionario", validarRequisicao(funcionarioSchema), cadastrarFuncionario);
router.post("/login", validarRequisicao(loginSchema), login);

router.post("/agendamento", validarRequisicao(agendamentoSchema),agendar);
router.get("/servico",listarServico);
router.get("/servico/preco",listarPrecoServico);
router.get("/funcionario",listarFuncionarios);

router.use(loginAutenticacao);
router.put("/funcionario/:id", editarFuncionario);
router.delete("/funcionario/:id", excluiFuncionario);
router.get("/funcionarios",listarTrabalhadores);
router.get("/funcionario/cargo",listarFuncionarioCargo);

//tem que ter login de ad
router.put("/agendamento/:id",editarAgendamento);
router.delete("/agendamento/:id", excluiAgendamento);
router.get("/agendamento",listarAgendamentos);
router.get("/agendamento/:id",listarAgendamentosBarbeiro);
router.get("/agendamentos/data",listarAgendamentosPorData);
router.get("/agendamentos/datas/:id",listarAgendamentosBarbeiroPorData);

router.post("/comanda", validarRequisicao(comandaSchema),cadastrarComanda);
router.put("/comanda/:id",editarComanda);
router.delete("/comanda/:id", excluiComanda);
router.get("/comanda",listarcomandas);
router.get("/comanda/data",listarComandasPorData);
router.get("/comanda/semana",faturamentoPorSemana);
router.get("/comanda/mes",faturamentoPorMes);





module.exports = router;


