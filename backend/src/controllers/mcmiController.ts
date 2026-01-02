
import { Request, Response } from 'express';
import MCMIResult from '../models/MCMIResult';
import User from '../models/User';

/* Fix: Changed res to any to allow access to Express response methods like status() and json() */
export const submitResult = async (req: any, res: any) => {
  try {
    const { reportData } = req.body;
    const userId = req.user.id;

    const result = await MCMIResult.create({
      userId,
      reportData
    });

    // Update user status
    await User.update({ mcmiStatus: 'approved' }, { where: { id: userId } });

    res.status(201).json({ success: true, result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* Fix: Changed res to any to resolve TypeScript error regarding the json() method */
export const getMyResults = async (req: any, res: any) => {
  try {
    const results = await MCMIResult.findAll({
      where: { userId: req.user.id },
      order: [['testDate', 'DESC']]
    });
    res.json(results);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
