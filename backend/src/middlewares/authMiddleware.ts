
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/* Fix: Changed res to any to bypass errors where status() was not found on the Response type */
export const protect = (req: any, res: any, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token failed' });
  }
};
