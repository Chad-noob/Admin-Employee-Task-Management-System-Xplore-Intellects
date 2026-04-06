const statusStyles = {
  Pending: 'bg-amber-100 text-amber-800 ring-amber-200',
  'In Progress': 'bg-sky-100 text-sky-800 ring-sky-200',
  Completed: 'bg-emerald-100 text-emerald-800 ring-emerald-200'
};

const StatusBadge = ({ status }) => {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusStyles[status] || 'bg-slate-100 text-slate-700 ring-slate-200'}`}>
      {status}
    </span>
  );
};

export default StatusBadge;