const joi = require("joi");

const comandaSchema = joi.object({
  barbeiroNome: joi.string().min(2).required().messages({
    "string.min": "O campo Funcionário deve ser preenchido corretamente",
    "any.required": "O campo Funcionário é obrigatório.",
    "string.empty": "O campo Funcionário é obrigatório.",
  }),
  clienteNome: joi.string().allow('').optional(),
  servicoLista: joi.array().allow('').optional(),
  preco: joi.number().required().messages({
    "any.required": "O campo preco é obrigatório.",
  })
});

module.exports = comandaSchema;