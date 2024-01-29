const joi = require("joi");

const clienteSchema = joi.object({
  nome: joi.string().min(2).required().messages({
    "string.min": "O campo nome deve ser preenchido corretamente",
    "any.required": "O campo nome é obrigatório.",
    "string.empty": "O campo nome é obrigatório.",
  }),
  email: joi.string().email().allow('').optional(),
  cpf_cnpj: joi.string().allow('').optional(),
  data_nascimento: joi.date().allow('').optional(),
  data_de_cadastro: joi.date().allow('').optional(),
  celular: joi.string().min(9).required().messages({
    "string.min": "O campo celular deve ser preenchido corretamente",
    "any.required": "O campo celular é obrigatório.",
    "string.empty": "O campo celular é obrigatório.",
  }),
  instagram: joi.string().allow('').optional(),
  naturalidade: joi.string().allow('').optional(),
  cidade: joi.string().allow('').optional(),
  endereco: joi.string().allow('').optional(),
});

module.exports = clienteSchema;