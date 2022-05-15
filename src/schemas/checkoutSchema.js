import joi from "joi";

const regexCPF = /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/;
const regexPhone = /^\([0-9]{2}\)\s[0-9]{4,5}-[0-9]{4}$/;
const regexCEP = /^[0-9]{5}\-[0-9]{3}$/;

const schemaDadosPagamento = joi.object({
    street: joi.string().required(),
    city: joi.string().required(),
    state: joi.string().required(),
    cpf: joi.string().pattern(regexCPF).required(),
    country: joi.string().required(),
    cep: joi.string().pattern(regexCEP).required(),
    phone: joi.string().pattern(regexPhone).required(),
    products: joi.array().required(),
    total: joi.number().required(),
    typePayment: joi.string().valid('CARTÃO', 'DINHEIRO', 'CARTAO', 'BOLETO').required()
});

export default schemaDadosPagamento;