import schemaDadosPagamento from "../schemas/checkoutSchema.js";
import db from "../mongoDB.js";

function validateDadosPagamento(req, res, next){
    const { street, city, state, cpf, country, cep, phone, products, total } = req.body;

    const validacao = schemaDadosPagamento.validate(
        { street, city, state, cpf, country, cep, phone, products, total }, {abortEarly: false}
    );
    console.log(validacao);

    const { error } = validacao;
    if(error){
        console.log('Erro na validação');
        return res.status(422).send(error.details.map(detail => detail.message)); 
    }
    next();
}

async function validateTokenUser(req, res, next){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();
    if(!token) return res.sendStatus(401);

    try {
        const sessionUser = await db.collection('session').findOne({ token });
        if(!sessionUser) return res.sendStatus(401); 

        const user = await db.collection('users').findOne({ _id: sessionUser.userId });
        if(!user) return res.sendStatus(404);

        res.locals = user;
        next();
    } catch (error) {
        console.log('Error in validateTokenUser: ', error);
        res.senStatus(500);
    }
}
export { validateDadosPagamento, validateTokenUser };