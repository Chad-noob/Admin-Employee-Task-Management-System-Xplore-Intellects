import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import ThemeToggle from '../ui/ThemeToggle';

const PageShell = ({ title, subtitle, theme, onToggleTheme, children }) => {
  const { user, logout } = useAuth();
  const homePath = user?.role === 'admin' ? '/admin' : '/employee';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 lg:px-6">
        <header className="rounded-2xl border border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Link to={homePath} className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                TaskFlow Pro
              </Link>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
              <button
                type="button"
                onClick={logout}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900"
              >
                Logout
              </button>
            </div>
          </div>
          <nav className="mt-5 flex flex-wrap gap-2 text-sm font-medium">
            <NavLink to={homePath} className={({ isActive }) => `rounded-full px-4 py-2 transition ${isActive ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'}`}>
              Dashboard
            </NavLink>
            <a href="#employees" className="rounded-full bg-slate-100 px-4 py-2 text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">
              Employees
            </a>
            <a href="#tasks" className="rounded-full bg-slate-100 px-4 py-2 text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">
              Tasks
            </a>
          </nav>
        </header>

        <main className="flex-1 py-6">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">{user?.role === 'admin' ? 'Admin Portal' : 'Employee Portal'}</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h1>
            </div>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default PageShell;