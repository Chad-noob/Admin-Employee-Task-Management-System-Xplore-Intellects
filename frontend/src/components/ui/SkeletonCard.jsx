const SkeletonCard = () => {
  return (
    <div className="animate-pulse rounded-3xl border border-white/70 bg-white/70 p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900/70">
      <div className="h-4 w-24 rounded-full bg-slate-200 dark:bg-slate-800" />
      <div className="mt-4 h-8 w-2/3 rounded-2xl bg-slate-200 dark:bg-slate-800" />
      <div className="mt-3 h-3 w-full rounded-full bg-slate-200 dark:bg-slate-800" />
      <div className="mt-2 h-3 w-5/6 rounded-full bg-slate-200 dark:bg-slate-800" />
    </div>
  );
};

export default SkeletonCard;