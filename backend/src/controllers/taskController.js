import Task from '../models/Task.js';
import Employee from '../models/Employee.js';
import { AppError } from '../middleware/errorHandler.js';

const listTasks = async (req, res) => {
  const filter = req.user.role === 'admin' ? {} : { assignedTo: req.user.id };
  const tasks = await Task.find(filter)
    .populate('assignedTo', 'name email isApproved')
    .sort({ createdAt: -1 });

  res.json({ tasks });
};

const createTask = async (req, res) => {
  const { title, description, assignedTo } = req.body;

  if (!title || !description || !assignedTo) {
    throw new AppError('Title, description, and assignee are required', 400);
  }

  const employee = await Employee.findById(assignedTo);
  if (!employee) {
    throw new AppError('Assigned employee not found', 404);
  }

  if (!employee.isApproved) {
    throw new AppError('Task can only be assigned to approved employees', 400);
  }

  const task = await Task.create({
    title,
    description,
    assignedTo,
    status: 'Pending'
  });

  const populatedTask = await Task.findById(task._id).populate('assignedTo', 'name email isApproved');

  res.status(201).json({
    message: 'Task assigned successfully',
    task: populatedTask
  });
};

const updateTaskStatus = async (req, res) => {
  const { status } = req.body;
  const allowedStatuses = ['Pending', 'In Progress', 'Completed'];

  if (!allowedStatuses.includes(status)) {
    throw new AppError('Invalid task status', 400);
  }

  const task = await Task.findById(req.params.id);
  if (!task) {
    throw new AppError('Task not found', 404);
  }

  if (req.user.role === 'employee' && task.assignedTo.toString() !== req.user.id) {
    throw new AppError('You can only update your own tasks', 403);
  }

  task.status = status;
  await task.save();

  const populatedTask = await Task.findById(task._id).populate('assignedTo', 'name email isApproved');
  res.json({
    message: 'Task status updated',
    task: populatedTask
  });
};

export { listTasks, createTask, updateTaskStatus };