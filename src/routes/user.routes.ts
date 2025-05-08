import express, { Request, Response, NextFunction } from 'express';
import { UserController } from '../controllers/user.controller';

const router = express.Router();
const userController = new UserController();

router.post('/user', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userController.addNewUser(req, res);
  } catch (error) {
    next(error);  
  }
});

router.get("/rider", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userController.findRiders(req, res);
  } catch (error) {
    next(error);
  }
})

export default router;
