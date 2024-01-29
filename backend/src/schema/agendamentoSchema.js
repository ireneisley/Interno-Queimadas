const joi = require("joi");

const agendamentoSchema = joi.object({
  celular_cliente: joi.string().min(9).allow('').optional(),
  nome_barbeiro: joi.string().min(4).required().messages({
    "string.min": "Nome do Funcionário deve ser preenchido corretamente.",
    "string.empty": "Nome do Funcionário é obrigatório.",
    "any.required": "Nome do Funcionário é obrigatório.",
  }),
  servicos: joi.array().allow('').optional(),
  data_marcacao: joi.string().min(8).required().messages({
    "string.empty": "Data do serviço é obrigatória.",
    "any.required": "Data do serviço é obrigatória.",
  }),
  //ajeitar porque aqui é hora
  hora_inicio: joi.string().required().messages({
    "string.empty": "Hora do serviço é obrigatória.",
    "any.required": "Hora do serviço é obrigatória.",
  }),
  hora_termino: joi.string().allow('').optional()
});

module.exports = agendamentoSchema;