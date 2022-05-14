import { Router } from 'express';
import { checkoutPurchaseUser } from '../controllers/checkoutController.js';
import { validateDadosPagamento } from '../middlewares/checkoutMiddleware.js';

const checkoutRouter = Router();

checkoutRouter.post('/checkout', validateDadosPagamento, checkoutPurchaseUser);

export default checkoutRouter;