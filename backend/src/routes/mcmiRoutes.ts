import express from 'express';
import { submitResult, getMyResults } from '../controllers/mcmiController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/submit', protect, submitResult);
router.get('/my-results', protect, getMyResults);

export default router;