import express, { Request, Response, NextFunction } from 'express';
import { ProductController } from '../controllers/product.controller';

const router = express.Router();
const productController = new ProductController();

router.get('/products', async (req: Request,res: Response, next: NextFunction) => {
    try {   
        await productController.getAllProducts(req, res);
    } catch (error) {
        next(error);  
    }
}) 

router.get('/products/:id', async (req: Request,res: Response, next: NextFunction) => {
    try {  
        await productController.getProductById(req, res);
    } catch (error) {
        next(error);  
    }
}) 

export default router;