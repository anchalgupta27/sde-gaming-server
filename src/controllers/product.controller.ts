import { Request, Response } from 'express';
import { Product } from '../models/Product';

export class ProductController {
    public async getAllProducts(req: Request, res: Response) {
        try {
            const products = await Product.find();
            return res.status(200).json(products);
        } catch (err) {
            return res.status(500).send(err);
        }
    }
}