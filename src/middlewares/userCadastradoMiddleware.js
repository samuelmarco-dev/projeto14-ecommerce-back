import db from '../mongoDB.js';

export async function usuarioCadastrado(){
    try {
        const user = await db.collection('users').findOne({ email });
        res.locals = user;
        next();

    } catch (error) {
        console.log('Catch conexão banco de dados', error);
        res.sendStatus(500);
    }
}