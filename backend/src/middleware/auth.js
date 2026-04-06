import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler.js';

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const protect = (req, _res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError('Not authorized, token missing', 401);
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (_error) {
    throw new AppError('Not authorized, token invalid', 401);
  }
};

const adminOnly = (req, _res, next) => {
  if (req.user?.role !== 'admin') {
    throw new AppError('Admin access required', 403);
  }
  next();
};

const employeeOnly = (req, _res, next) => {
  if (req.user?.role !== 'employee') {
    throw new AppError('Employee access required', 403);
  }
  next();
};

export { generateToken, protect, adminOnly, employeeOnly };