import schemaDadosPagamento from "../schemas/checkoutSchema.js";

function validateDadosPagamento(req, res, next){
    const { street, city, state, cpf, country, cep, phone, products, total } = req.body;

    const validacao = schemaDadosPagamento.validate(
        { street, city, state, cpf, country, cep, phone, products, total }, {abortEarly: false}
    );
    console.log(validacao);

    const { error } = validacao;
    if(error){
        return res.status(422).send(error.details.map(detail => detail.message)); 
    }
    next();
}

export { validateDadosPagamento };