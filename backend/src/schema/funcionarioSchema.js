const joi = require("joi");

const funcionarioSchema = joi.object({
  nome: joi.string().min(2).required().messages({
    "string.min": "O campo nome deve ser preenchido corretamente",
    "any.required": "O campo nome é obrigatório.",
    "string.empty": "O campo nome é obrigatório.",
  }),
  email: joi.string().email().required().messages({
    "string.email": "E-mail inválido",
    "string.empty": "O campo e-mail é obrigatório.",
    "any.required": "O campo e-mail é obrigatório.",
  }),
  senha: joi.string().min(4).required().messages({
    'any.required': 'O campo senha é obrigatório.',
    'string.empty': 'O campo senha é obrigatório.',
    'string.min': 'O campo senha deve conter no mínimo 5 caracteres.'
}),
  cpf_cnpj: joi.string().min(11).required().messages({
    "any.required": "O campo cpf/cnpj é obrigatório.",
    "string.empty": "O campo cpf/cnpj é obrigatório.",
    "string.min": "O campo cpf/cnpj deve conter no mínimo 11 caracteres.",
  }),
  data_nascimento: joi.date().allow('').optional(),
  celular: joi.string().min(11).required().messages({
    "any.required": "O campo celular é obrigatório.",
    "string.empty": "O campo celular é obrigatório.",
    "string.min": "O campo celular deve conter no mínimo 11 caracteres.",
  }),
  naturalidade: joi.string().allow('').optional(),
  cidade: joi.string().allow('').optional(),
  endereco: joi.string().allow('').optional(),
  cargo: joi.string().min(3).required().messages({
    "any.required": "O campo cargo é obrigatório.",
    "string.empty": "O campo cargo é obrigatório.",
    "string.min": "O campo cargo deve conter no mínimo 3 caracteres.",
  })
});

module.exports = funcionarioSchema;