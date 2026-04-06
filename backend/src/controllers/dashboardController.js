import Employee from '../models/Employee.js';
import Task from '../models/Task.js';

const getSummary = async (req, res) => {
  if (req.user.role === 'admin') {
    const [totalEmployees, pendingApprovals, allTasks] = await Promise.all([
      Employee.countDocuments(),
      Employee.countDocuments({ isApproved: false }),
      Task.find().populate('assignedTo', 'name email isApproved')
    ]);

    const taskDistribution = {
      Pending: 0,
      'In Progress': 0,
      Completed: 0
    };

    allTasks.forEach((task) => {
      taskDistribution[task.status] += 1;
    });

    const recentEmployees = await Employee.find().sort({ createdAt: -1 }).limit(4).select('-password');

    return res.json({
      role: 'admin',
      summary: {
        totalEmployees,
        pendingApprovals,
        totalTasks: allTasks.length,
        taskDistribution,
        recentEmployees,
        tasks: allTasks.slice(0, 6)
      }
    });
  }

  const employeeId = req.user.id;
  const [tasks, employee] = await Promise.all([
    Task.find({ assignedTo: employeeId }).populate('assignedTo', 'name email isApproved'),
    Employee.findById(employeeId).select('name email isApproved createdAt')
  ]);

  const taskDistribution = {
    Pending: 0,
    'In Progress': 0,
    Completed: 0
  };

  tasks.forEach((task) => {
    taskDistribution[task.status] += 1;
  });

  const completed = taskDistribution.Completed;
  const totalTasks = tasks.length;
  const progress = totalTasks ? Math.round((completed / totalTasks) * 100) : 0;

  res.json({
    role: 'employee',
    summary: {
      employee,
      totalTasks,
      progress,
      taskDistribution,
      tasks
    }
  });
};

export { getSummary };