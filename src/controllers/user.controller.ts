import { User } from '../models/User';
import { Request, Response } from 'express';

export class UserController {
  public async addNewUser(req: Request, res: Response) {
    try {
      const newUser = new User(req.body);
      const savedUser = await newUser.save();
      return res.status(201).json(savedUser);
    } catch (err: any) {
      if (err.code === 11000) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      return res.status(500).send(err);
    }
  }

  public async findRiders(req: Request, res: Response) {
    try {
      const riders = await User.find({ roles: 'rider' }, '_id name email');
      res.status(200).json(riders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch riders' });
    }
  }
}