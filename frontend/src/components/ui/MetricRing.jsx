const MetricRing = ({ value, label, colorClass = 'text-cyan-500' }) => {
  const dashOffset = 251 - (251 * value) / 100;

  return (
    <div className="flex items-center gap-4 rounded-3xl border border-white/70 bg-white/80 p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900/80">
      <div className="relative h-24 w-24">
        <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
          <circle cx="50" cy="50" r="40" className="fill-none stroke-slate-200 stroke-[10] dark:stroke-slate-800" />
          <circle cx="50" cy="50" r="40" className={`fill-none stroke-[10] ${colorClass}`} strokeDasharray="251" strokeDashoffset={dashOffset} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xl font-black text-slate-900 dark:text-white">{value}%</div>
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{label}</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Circular progress for a dashboard-style overview.</p>
      </div>
    </div>
  );
};

export default MetricRing;