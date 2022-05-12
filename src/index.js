import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

import chalk from "chalk";

import { postCadastroUsuario, postLoginUsuario } from './controllers/authController.js';
import { getProductsTelaInicial } from './controllers/productController.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(json());

app.post('/sign-up', postCadastroUsuario);
app.post('/sign-in', postLoginUsuario);
app.get('/products', getProductsTelaInicial);

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(chalk.green(`Server is running on port ${port}`));
});