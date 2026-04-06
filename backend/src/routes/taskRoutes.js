import { Router } from 'express';
import { listTasks, createTask, updateTaskStatus } from '../controllers/taskController.js';
import { adminOnly, employeeOnly, protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);
router.get('/', listTasks);
router.post('/', adminOnly, createTask);
router.patch('/:id/status', employeeOnly, updateTaskStatus);

export default router;