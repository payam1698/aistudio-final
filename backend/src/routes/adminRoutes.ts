import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import * as adminController from '../controllers/adminController';

const router = express.Router();

router.use(protect); // All admin routes need login

router.get('/users', adminController.getAllUsers);
router.patch('/users/:id', adminController.updateUserStatus);
router.post('/courses', adminController.createCourse);
router.delete('/courses/:id', adminController.deleteCourse);
router.post('/instructors', adminController.createInstructor);
router.post('/articles', adminController.createArticle);

export default router;