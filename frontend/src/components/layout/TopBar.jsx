import ThemeToggle from '../ui/ThemeToggle';

const TopBar = ({ theme, onToggleTheme, onLogout, roleLabel }) => {
  return (
    <div className="mb-6 flex flex-col gap-3 rounded-[28px] border border-white/70 bg-white/75 px-5 py-4 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{roleLabel}</p>
        <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">Operational dashboard</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <button onClick={onLogout} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-900">
          Logout
        </button>
      </div>
    </div>
  );
};

export default TopBar;