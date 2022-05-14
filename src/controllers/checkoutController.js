import db from "../mongoDB.js";

export async function checkoutPurchaseUser(req, res){
    console.log('checkoutPurchaseUser request');
    const { street, city, state, cpf, country, cep, phone, products, total } = req.body;

    try {
        const { user, token } = res.locals;
        console.log(user, token);

        await db.collection('sale').insertOne({
            userId: user._id,
            tokenUser: token,
            infoUser: { name: user.name, email: user.email, cpf, phone },
            adress: { street, city, state, country, cep },
            products: products.map(product => ({
                name: product.name, value: product.value, tokenCart: product.id,
                quantidade: product.quantidade, idProduct: product._id
            })),
            total
        });
        return res.sendStatus(200);
    } catch (error) {
        console.log('Error in checkoutPurchaseUser: ', error);
        res.sendStatus(500);
    }
}