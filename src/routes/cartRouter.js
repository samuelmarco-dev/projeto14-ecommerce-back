import { Router } from "express";

import {getCart, addCart, createCart, getCartAmount, updateCart, removeCartProduct, CheckoutCart, finishedCart} from './../controllers/cartController.js';

const cartRouter = Router();

cartRouter.get('/cart/amount/:id', getCartAmount);
cartRouter.get('/cart/getCart/:id', getCart);
cartRouter.get('/cart/checkout/:id', CheckoutCart);
cartRouter.post('/cart/create', createCart);
cartRouter.post('/cart/add/:id', addCart);
cartRouter.post('/cart/newamount/:id', updateCart);
cartRouter.post('/cart/remove/:id', removeCartProduct);
cartRouter.post('/cart/finished/:id', finishedCart);
export default cartRouter;