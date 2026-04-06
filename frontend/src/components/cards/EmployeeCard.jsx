import { motion } from 'framer-motion';
import StatusBadge from '../ui/StatusBadge';

const EmployeeCard = ({ employee, onApprove, onReject, onAssign }) => {
  return (
    <motion.div
      layout
      className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-base font-semibold text-slate-900 dark:text-white">{employee.name}</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{employee.email}</p>
        </div>
        <StatusBadge status={employee.isApproved ? 'Completed' : 'Pending'} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {!employee.isApproved ? (
          <>
            <button onClick={() => onApprove(employee._id)} className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600">
              Approve
            </button>
            <button onClick={() => onReject(employee._id)} className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600">
              Reject
            </button>
          </>
        ) : (
          <button onClick={() => onAssign(employee)} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900">
            Assign task
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default EmployeeCard;