import { motion } from 'framer-motion';
import StatusBadge from '../ui/StatusBadge';
import ProgressBar from '../ui/ProgressBar';

const taskColors = {
  Pending: 'bg-amber-500',
  'In Progress': 'bg-sky-500',
  Completed: 'bg-emerald-500'
};

const statusOrder = ['Pending', 'In Progress', 'Completed'];

const TaskCard = ({ task, role, onChangeStatus }) => {
  const currentIndex = statusOrder.indexOf(task.status);
  const progressValue = ((currentIndex + 1) / statusOrder.length) * 100;

  return (
    <motion.div layout className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900" whileHover={{ y: -2 }}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">{task.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{task.description}</p>
        </div>
        <StatusBadge status={task.status} />
      </div>

      <div className="mt-4">
        <ProgressBar value={progressValue} color={taskColors[task.status]} />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
        <span>Assigned to: {task.assignedTo?.name || 'Unassigned'}</span>
        <span>{new Date(task.createdAt).toLocaleDateString()}</span>
      </div>

      {role === 'employee' && onChangeStatus ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {statusOrder.map((status) => (
            <button
              key={status}
              onClick={() => onChangeStatus(task._id, status)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${task.status === status ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}
            >
              {status}
            </button>
          ))}
        </div>
      ) : null}
    </motion.div>
  );
};

export default TaskCard;