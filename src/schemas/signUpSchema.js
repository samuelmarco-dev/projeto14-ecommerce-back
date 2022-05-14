import joi from 'joi';

const regexName = /^[a-zA-ZáéíóúàâêôãõüçÁÉÍÓÚÀÂÊÔÃÕÜÇ ]+$/;
const regexSenha = /^[0-9]{4,8}[a-zA-zçÇ]{3,12}$/;

const schemaCadastro = joi.object({
    name: joi.string().pattern(regexName).required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(regexSenha).required(),
    confirmPassword: joi.ref('password')
});

export default schemaCadastro;