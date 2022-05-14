import schemaCadastro from '../schemas/signUpSchema.js';
import schemaLogin from '../schemas/signInSchema.js';

function validateCadastro(req, res, next){
    const { name, email, password, confirmPassword } = req.body;

    const validacao = schemaCadastro.validate({ name, email, password, confirmPassword }, { abortEarly: false });
    console.log(validacao);
    
    const { error } = validacao;
    if (error) {
        console.log('Erro na validação');
        return res.status(422).send(error.details.map(detail => detail.message));
    }
    next();
}

function validateLogin(req, res, next){
    const { email, password } = req.body;

    const validacao = schemaLogin.validate({ email, password }, { abortEarly: false });
    console.log(validacao);
    const { error } = validacao;
    
    if(error){
        console.log('Erro na validação');
        return res.status(422).send(error.details.map(detail => detail.message));
    }
    next();
}

export { validateCadastro, validateLogin };