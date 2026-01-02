import { Request, Response } from 'express';
import User from '../models/User';
import Course from '../models/Course';
import Instructor from '../models/Instructor';
import Article from '../models/Article';

// User Management
export const getAllUsers = async (req: any, res: any) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['nationalCode'] } });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserStatus = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { role, mcmiStatus } = req.body;
    await User.update({ role, mcmiStatus }, { where: { id } });
    res.json({ success: true, message: 'User updated.' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Course Management
export const createCourse = async (req: any, res: any) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCourse = async (req: any, res: any) => {
  try {
    await Course.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Instructor Management
export const createInstructor = async (req: any, res: any) => {
  try {
    const instructor = await Instructor.create(req.body);
    res.status(201).json(instructor);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Article Management
export const createArticle = async (req: any, res: any) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};