import bcrypt from 'bcryptjs';
import Employee from '../models/Employee.js';
import adminConfig from '../config/admin.js';
import { AppError } from '../middleware/errorHandler.js';
import { generateToken } from '../middleware/auth.js';

const sanitizeEmployee = (employee) => ({
  id: employee._id,
  name: employee.name,
  email: employee.email,
  isApproved: employee.isApproved,
  createdAt: employee.createdAt
});

const registerEmployee = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new AppError('Name, email, and password are required', 400);
  }

  const existingEmployee = await Employee.findOne({ email: email.toLowerCase() });
  if (existingEmployee) {
    throw new AppError('An account with this email already exists', 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const employee = await Employee.create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    isApproved: false
  });

  res.status(201).json({
    message: 'Registration submitted. Awaiting admin approval.',
    employee: sanitizeEmployee(employee)
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('Email and password are required', 400);
  }

  const normalizedEmail = email.toLowerCase();

  if (normalizedEmail === adminConfig.email.toLowerCase()) {
    if (password !== adminConfig.password) {
      throw new AppError('Invalid admin credentials', 401);
    }

    const token = generateToken({ id: 'admin', role: 'admin', email: adminConfig.email });

    return res.json({
      token,
      user: {
        id: 'admin',
        role: 'admin',
        email: adminConfig.email,
        name: 'Admin'
      }
    });
  }

  const employee = await Employee.findOne({ email: normalizedEmail });
  if (!employee) {
    throw new AppError('Invalid email or password', 401);
  }

  const passwordMatches = await bcrypt.compare(password, employee.password);
  if (!passwordMatches) {
    throw new AppError('Invalid email or password', 401);
  }

  if (!employee.isApproved) {
    throw new AppError('Your account is awaiting admin approval', 403);
  }

  const token = generateToken({ id: employee._id.toString(), role: 'employee', email: employee.email });

  res.json({
    token,
    user: {
      id: employee._id,
      role: 'employee',
      email: employee.email,
      name: employee.name,
      isApproved: employee.isApproved
    }
  });
};

const getMe = async (req, res) => {
  if (req.user.role === 'admin') {
    return res.json({
      user: {
        id: 'admin',
        role: 'admin',
        email: adminConfig.email,
        name: 'Admin'
      }
    });
  }

  const employee = await Employee.findById(req.user.id);
  if (!employee) {
    throw new AppError('User not found', 404);
  }

  res.json({
    user: {
      id: employee._id,
      role: 'employee',
      email: employee.email,
      name: employee.name,
      isApproved: employee.isApproved
    }
  });
};

export { registerEmployee, loginUser, getMe };