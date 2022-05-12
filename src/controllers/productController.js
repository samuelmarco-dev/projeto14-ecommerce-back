import db from "../mongoDB.js";

async function getProductsTelaInicial(req, res) {
    try {
        const produtosCadastrados = await db.collection('products').find().toArray();
        return res.status(200).send(produtosCadastrados);
    } catch (error) {
        console.log('Catch conexão banco de dados', error);
        res.sendStatus(500);
    }
}

export { getProductsTelaInicial };