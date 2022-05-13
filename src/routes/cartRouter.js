import { Router } from "express";

import {getCart, addCart, createCart, getCartAmount} from './../controllers/cartController.js';

const cartRouter = Router();

cartRouter.get('/cart/amount/:id', getCartAmount);
cartRouter.get('/cart/getCart/:id', getCart);
cartRouter.post('/cart/create', createCart);
cartRouter.post('/cart/add/:id', addCart);

export default cartRouter;