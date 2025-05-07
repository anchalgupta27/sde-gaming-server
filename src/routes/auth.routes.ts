import express, { Request, Response, NextFunction } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = express.Router();
const authController = new AuthController();

router.post('/google/login', async(req: Request, res: Response, next: NextFunction) => {
   try {
    await authController.authorizeGoogleLogin(req, res);
   } catch (error) {
    next(error);
   }
})

export default router