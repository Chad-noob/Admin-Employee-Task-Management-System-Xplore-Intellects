const StatCard = ({ label, value, accent, subtitle }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{value}</h3>
        </div>
        <div className={`h-3 w-3 rounded-full ${accent}`} />
      </div>
      {subtitle ? <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p> : null}
    </div>
  );
};

export default StatCard;