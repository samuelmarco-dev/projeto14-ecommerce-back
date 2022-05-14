import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import db from '../mongoDB.js';

async function postCadastroUsuario(req, res) {
    const { name, email, password, confirmPassword } = req.body;
    console.log(name, email, password, confirmPassword);

    try {
        const { user } = res.locals;
        console.log(user);

        if(user) {
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

    try {
        const { user } = res.locals;
        console.log(user);

        if(user && bcrypt.compareSync(password, user.password)){
            const token = uuid();
            await db.collection('sessions').insertOne({ token, userId: user._id });
            return res.status(200).send(token);
        }
        return res.sendStatus(401);
    } catch (error) {
        console.log('Catch conexão banco de dados', error);
        res.sendStatus(500);
    }
}

export { postCadastroUsuario, postLoginUsuario };