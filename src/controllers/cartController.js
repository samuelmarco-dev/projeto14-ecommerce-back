import {ObjectId} from "mongodb";
import chalk from "chalk";

import db from './../mongoDB.js';
import { v4 as uuid } from 'uuid';

export async function getCart(req, res) {
    const {id}=req.params;
    try{
        const cart = await db.collection('productsCart').find({id}).toArray();
        if(cart){
            return res.status(200).send(cart);
        }
    }catch(error){
        console.log(chalk.red('Catch conexão banco de dados'), error);
        res.sendStatus(500);
    }
}
export async function createCart(req, res) {
    const cartId = uuid();
    const cart = {
        products: [],
        id : cartId
    };
    try{
    const data = await db.collection('carts').insertOne(cart);   
    const result = data.insertedId.toString().replace('new ObjectId("','').replace('")','')
    res.send(cartId);
    } catch (error) {
        console.log(chalk.red('Error ao criar carrinho', error));
        res.sendStatus(500);
    }
}

export async function removeCart(req, res) {}

export async function addCart(req, res) {
    const {id}=req.params;
    const product=req.body;
    try{
        const cart = await db.collection('carts').findOne({id});
        if(!cart){
            return res.status(404).send('Carrinho não encontrado');
        }
        // const data = await db.collection('carts').find({product})
        // if(data){
        //     return res.status(404).send('Produto já adicionado');
        // }
        const productCart = await db.collection('productsCart').insertOne({id, ...product});
        res.send(productCart).status(201);
    }catch (error) {
        console.log(chalk.red('Catch conexão banco de dados'), error);
    }
}


export async function clearCart(req, res) {}

export async function removeCartProduct(req, res) {
    const {id}=req.params;
    const {idProduct}=req.body; 
    console.log(id, idProduct);
    try{
        const cart = await db.collection('carts').findOne({id});
        if(!cart){
            return res.status(404).send('Carrinho não encontrado');
        }
        const data = await db.collection('productsCart').findOne({_id: new ObjectId(idProduct)});
        if(!data){
            return res.status(404).send('Produto não encontrado');
        }
        const productCart = await db.collection('productsCart').deleteOne({_id: new ObjectId(idProduct)});
        const products = await db.collection('productsCart').find({id}).toArray();
        res.send(products).status(201);
    }catch (error) {
        console.log(chalk.red('Catch conexão banco de dados'), error);
    }
}

export async function updateCart(req, res) {
    const {id}=req.params;
    const {idProduct, amountItem}=req.body;
    console.log(req.body);
    try{
        const cart = await db.collection('carts').findOne({id});
        if(!cart){
            return res.status(404).send('Carrinho não encontrado');
        }
        const productsCart = await db.collection('productsCart').findOne({_id: new ObjectId(idProduct)});
        if(!productsCart){
            return res.status(404).send('Produto não encontrado');
        }
        await db.collection('productsCart').updateOne({_id: new ObjectId(idProduct)}, {$set:{quantidade:amountItem} });
        console.log(chalk.green.bold("Quantidade alterada", idProduct, amountItem));
        

        const products = await db.collection('productsCart').find({id}).toArray();
        res.send(products).status(201);
    }catch (error) {
        console.log(chalk.red('Catch conexão banco de dados'), error);
    }
}

export async function getCartTotal(req, res) {
    const {id}=req.params;
    try {
    const cart=await db.collection('carts').findOne({id});
    const total=cart.products.reduce((all,curr)=>{
        return all+curr.price;
    },0);
    } catch (error) {
        console.log(chalk.red('Error ao pegar valor total', error));
    }
}

export async function getCartAmount(req, res) {
    const {id}=req.params;
    try {
        const cart=await db.collection('productsCart').find({id}).toArray();
        let amount = cart.length;
        res.send(amount.toString()).status(200);
        
    } catch (error) {
        console.log(chalk.red('Error ao pegar produtos: ', error));
        res.sendStatus(500);
    }
}