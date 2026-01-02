
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

/* Fix: Changed req and res to any to ensure properties like 'body', 'status', and 'json' are accessible, bypassing type resolution issues in the current environment */
export const register = async (req: any, res: any) => {
  try {
    const { mobile, nationalCode, ...otherData } = req.body;

    const existingUser = await User.findOne({ where: { mobile } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'این شماره همراه قبلاً ثبت شده است.' });
    }

    const hashedNationalCode = await bcrypt.hash(nationalCode, 10);

    const newUser = await User.create({
      mobile,
      nationalCode: hashedNationalCode,
      ...otherData
    });

    res.status(201).json({ success: true, message: 'ثبت‌نام با موفقیت انجام شد.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* Fix: Changed req and res to any to avoid 'Property does not exist' errors on Request and Response types */
export const login = async (req: any, res: any) => {
  try {
    const { mobile, nationalCode } = req.body;

    const user = await User.findOne({ where: { mobile } });
    if (!user) {
      return res.status(404).json({ success: false, message: 'کاربر یافت نشد.' });
    }

    const isMatch = await bcrypt.compare(nationalCode, user.nationalCode);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'نام کاربری یا رمز عبور اشتباه است.' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    // Don't send hashed code back
    const userObj = user.toJSON();
    delete userObj.nationalCode;

    res.json({ success: true, user: userObj, token });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* Fix: Changed res to any to allow calling Express response methods like status() and json() */
export const getMe = async (req: any, res: any) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const userObj = user.toJSON();
    delete userObj.nationalCode;
    res.json(userObj);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
