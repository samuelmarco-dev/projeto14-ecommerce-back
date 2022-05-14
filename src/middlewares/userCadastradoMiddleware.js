import db from '../mongoDB.js';

export async function usuarioCadastrado(req, res, next){
    const { email } = req.body;
    try {
        const user = await db.collection('users').findOne({ email });
        res.locals = user;
        next();

    } catch (error) {
        console.log('Catch conexão banco de dados', error);
        res.sendStatus(500);
    }
}