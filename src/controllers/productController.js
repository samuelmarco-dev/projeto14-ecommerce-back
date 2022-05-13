import db from "../mongoDB.js";
import { ObjectId } from "mongodb";

async function getProductsTelaInicial(req, res) {
    const { filtro } = req.query;
    
    if(filtro) {
        const filtroTitle = filtro.charAt(0).toUpperCase() + filtro.slice(1);
        console.log(filtro, filtroTitle);
        
        const produtos = await db.collection('products').find().toArray();
        const produtosFiltrados = produtos.filter(produto => {
            return produto.name.includes(filtroTitle) || produto.description.includes(filtroTitle) || 
            produto.category.includes(filtroTitle) || produto.price.includes(filtroTitle) ||
            produto.name.includes(filtro) || produto.description.includes(filtro) || 
            produto.category.includes(filtro) || produto.price.includes(filtro);
        });
        return res.status(200).send(produtosFiltrados);
    }else{
        try {
            const produtosCadastrados = await db.collection('products').find().toArray();
            return res.status(200).send(produtosCadastrados);
        } catch (error) {
            console.log('Catch conexão banco de dados', error);
            res.sendStatus(500);
        }
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