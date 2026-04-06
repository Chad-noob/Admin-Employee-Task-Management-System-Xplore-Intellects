import Employee from '../models/Employee.js';
import { AppError } from '../middleware/errorHandler.js';

const listEmployees = async (_req, res) => {
  const employees = await Employee.find().sort({ createdAt: -1 }).select('-password');
  res.json({ employees });
};

const approveEmployee = async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) {
    throw new AppError('Employee not found', 404);
  }

  employee.isApproved = true;
  await employee.save();

  res.json({
    message: 'Employee approved successfully',
    employee: {
      id: employee._id,
      name: employee.name,
      email: employee.email,
      isApproved: employee.isApproved,
      createdAt: employee.createdAt
    }
  });
};

const rejectEmployee = async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) {
    throw new AppError('Employee not found', 404);
  }

  await employee.deleteOne();
  res.json({ message: 'Employee rejected and removed' });
};

const getMyStatus = async (req, res) => {
  const employee = await Employee.findById(req.user.id).select('-password');
  if (!employee) {
    throw new AppError('Employee not found', 404);
  }

  res.json({
    status: employee.isApproved ? 'approved' : 'pending',
    employee: {
      id: employee._id,
      name: employee.name,
      email: employee.email,
      isApproved: employee.isApproved,
      createdAt: employee.createdAt
    }
  });
};

export { listEmployees, approveEmployee, rejectEmployee, getMyStatus };