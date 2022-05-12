import db from "../mongoDB.js";
import { ObjectId } from "mongodb";

async function getProductsTelaInicial(req, res) {
    try {
        const produtosCadastrados = await db.collection('products').find().toArray();
        return res.status(200).send(produtosCadastrados);
    } catch (error) {
        console.log('Catch conexão banco de dados', error);
        res.sendStatus(500);
    }
}

async function getProductsByIdProduct(req, res) {
    const { id } = req.params;
    try {
        const produtoPage = await db.collection('products').findOne({ _id: new ObjectId(id) });
        return res.status(200).send(produtoPage);
    } catch (error) {
        console.log('Catch conexão banco de dados', error);
        res.sendStatus(500);
    }
}

export { getProductsTelaInicial, getProductsByIdProduct };