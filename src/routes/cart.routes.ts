import express, { Request, Response, NextFunction } from 'express';
import { CartController } from "../controllers/cart.controller";

const router = express.Router();
const cartController = new CartController();

router.post('/cart', async(req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body)
        await cartController.addProductsToCart(req, res);
    } catch (error) {
        next(error);
    }
})

router.get('/cart/:userId', async(req: Request, res: Response, next: NextFunction) => {
    try {
        await cartController.getCart(req, res);
    } catch (error) {
        next(error);
    }
})

export default router;