import User from '../models/User';

export const getAllUsers = async (req: any, res: any) => {
  const users = await User.find();
  res.json(users);
};

