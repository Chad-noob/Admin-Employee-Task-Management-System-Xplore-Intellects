import { Router } from 'express';
import { loginUser, registerEmployee, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/register', registerEmployee);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

export default router;