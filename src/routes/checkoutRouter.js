import { Router } from 'express';
import { checkoutPurchaseUser } from '../controllers/checkoutController.js';
import { validateDadosPagamento, validateTokenUser } from '../middlewares/checkoutMiddleware.js';

const checkoutRouter = Router();

checkoutRouter.post('/checkout', validateTokenUser, validateDadosPagamento, checkoutPurchaseUser);

export default checkoutRouter;