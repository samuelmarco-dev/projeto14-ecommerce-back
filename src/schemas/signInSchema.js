import joi from 'joi';

const regexSenha = /^[0-9]{4,8}[a-zA-zçÇ]{3,12}$/;

const schemaLogin = joi.object({
    email: joi.string().email().required(),
    password: joi.string().pattern(regexSenha).required()
});

export default schemaLogin;