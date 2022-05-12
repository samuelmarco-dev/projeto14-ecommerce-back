import { Router } from "express";

import {createCart, getCartAmount} from './../controllers/cartController.js';

const cartRouter = Router();

cartRouter.get('/cart/amount/:id', getCartAmount);
cartRouter.post('/cart/create', createCart);

export default cartRouter;