import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import * as adminController from '../controllers/adminController';

const router = express.Router();

// Middleware checking for admin role could be added here
router.use(protect); 

// User Management
router.get('/users', adminController.getAllUsers);
router.patch('/users/:id', adminController.updateUserStatus);

// Content Management
router.post('/courses', adminController.createCourse);
router.delete('/courses/:id', adminController.deleteCourse);
router.post('/instructors', adminController.createInstructor);
router.post('/articles', adminController.createArticle);

export default router;