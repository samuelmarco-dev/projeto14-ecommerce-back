import db from "../mongoDB.js";
import joi from "joi";

export async function checkoutPurchaseUser(req, res){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();
    if(!token) return res.sendStatus(401);
    const { street, city, state, cpf, country, cep, phone, products, total } = req.body;

    try {
        const sessionUser = await db.collection('session').findOne({ token });
        if(!sessionUser) return res.sendStatus(401);

        const user = await db.collection('users').findOne({ _id: sessionUser.userId });
        if(!user) return res.sendStatus(404);
        
        await db.collection('sale').insertOne({
            userId: user._id,
            tokenUser: token,
            infoUser: { name: user.name, email: user.email, cpf, phone },
            adress: { street, city, state, country, cep },
            products: products.map(product => ({
                name: product.name, value: product.value, token: product.id,
                quantidade: product.quantidade
            })),
            total
        });
        return res.sendStatus(200);
    } catch (error) {
        console.log('Error in checkoutPurchaseUser: ', error);
        res.senStatus(500);
    }
}