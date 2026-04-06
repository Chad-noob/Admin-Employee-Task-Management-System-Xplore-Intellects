import { Router } from 'express';
import { getSummary } from '../controllers/dashboardController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/summary', protect, getSummary);

export default router;