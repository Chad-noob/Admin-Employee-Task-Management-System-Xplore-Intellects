import { Router } from 'express';
import { listEmployees, approveEmployee, rejectEmployee, getMyStatus } from '../controllers/employeeController.js';
import { adminOnly, protect } from '../middleware/auth.js';

const router = Router();

router.get('/me/status', protect, getMyStatus);

router.use(protect, adminOnly);
router.get('/', listEmployees);
router.patch('/:id/approve', approveEmployee);
router.delete('/:id/reject', rejectEmployee);

export default router;