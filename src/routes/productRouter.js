import { Router } from "express";

import { getProductsTelaInicial, getProductsByIdProduct } from "../controllers/productController.js";
import { produtosCadastrados } from "../middlewares/productArrayMiddleware.js";
import { addProduct } from "../controllers/productController.js";

const productRouter = Router();

productRouter.get('/products', produtosCadastrados, getProductsTelaInicial);
productRouter.get('/products/:id', getProductsByIdProduct);
productRouter.post('/products/add', addProduct);

export default productRouter;