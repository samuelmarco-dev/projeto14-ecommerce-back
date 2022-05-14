import db from '../mongoDB.js';

export async function produtosCadastrados(req, res, next){
    try {
        const produtos = await db.collection('products').find().toArray();
        res.locals = produtos;
        next();
        
    } catch (error) {
        console.log('Catch conexão banco de dados', error);
        res.sendStatus(500);
    }
}