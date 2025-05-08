import express, { Request, Response, NextFunction } from 'express';
import { OrderController } from '../controllers/order.controller';


const router = express.Router();
const orderController = new OrderController();

router.post('/cart/checkout', async(req: Request, res: Response, next: NextFunction) => {
    try {
        await orderController.checkoutCart(req, res);
    } catch (error) {
        next(error);
    }
})

export default router;