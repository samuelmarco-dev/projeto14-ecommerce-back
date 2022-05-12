import joi from 'joi';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import db from '../mongoDB.js';

async function postCadastroUsuario(req, res) {
    const { name, email, password, confirmPassword } = req.body;
    console.log(name, email, password, confirmPassword);

    const regexName = /^[a-zA-ZáéíóúàâêôãõüçÁÉÍÓÚÀÂÊÔÃÕÜÇ ]+$/;
    const regexSenha = /^[0-9]{4,8}[a-zA-zçÇ]{3,12}$/;

    const schemaCadastro = joi.object({
        name: joi.string().pattern(regexName).required(),
        email: joi.string().email().required(),
        password: joi.string().pattern(regexSenha).required(),
        confirmPassword: joi.ref('password')
    });
    const validacao = schemaCadastro.validate({ name, email, password, confirmPassword }, { abortEarly: false });
    console.log(validacao);
    
    const { error } = validacao;
    if (error) {
        console.log('Erro na validação');
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    try {
        const userJaCadastrado = await db.collection('users').findOne({ email });
        if(userJaCadastrado) {
            console.log('Usuário já cadastrado');
            return res.sendStatus(409);
        }

        console.log('Usuário não cadastrado, pode se cadastrar');
        const senhaCriptografada = bcrypt.hashSync(password, 10);
        await db.collection('users').insertOne({ name, email, password: senhaCriptografada });

        console.log('Usuário cadastrado com sucesso');
        return res.sendStatus(201);
    } catch (error) {
        console.log('Catch conexão banco de dados', error);
        res.sendStatus(500);
    }
}

async function postLoginUsuario(req, res) {
    const { email, password } = req.body;
    console.log(email, password);

    const regexSenha = /^[0-9]{4,8}[a-zA-zçÇ]{3,12}$/;
    const schemaLogin = joi.object({
        email: joi.string().email().required(),
        password: joi.string().pattern(regexSenha).required()
    });
    const validacao = schemaLogin.validate({ email, password }, { abortEarly: false });
    console.log(validacao);
    const { error } = validacao;

    if(error){
        console.log('Erro na validação');
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    try {
        const usuarioCadastrado = await db.collection('users').findOne({ email });
        if(usuarioCadastrado && bcrypt.compareSync(password, usuarioCadastrado.password)){
            const token = uuid();
            await db.collection('sessions').insertOne({ token, userId: usuarioCadastrado._id });
            return res.status(200).send(token);
        }
        return res.sendStatus(401);
    } catch (error) {
        console.log('Catch conexão banco de dados', error);
        res.sendStatus(500);
    }
}

export { postCadastroUsuario, postLoginUsuario };