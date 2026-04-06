import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const features = [
  { title: 'Approval-gated onboarding', copy: 'Employees register once and gain access only after admin approval.' },
  { title: 'Role-aware dashboards', copy: 'Admin and employee portals adapt to the responsibilities of each user.' },
  { title: 'Task visibility', copy: 'Status cards, filters, and progress indicators replace cluttered tables.' }
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 lg:px-6">
        <header className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4">
          <div>
            <p className="text-xl font-bold tracking-tight">Xplore Intellects Task management sytem</p>
            <p className="text-sm text-slate-400">Employee task management</p>
          </div>
          <div className="flex gap-3">
            <Link to="/login" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-200">
              Sign in
            </Link>
            <Link to="/register" className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800">
              Employee registration
            </Link>
          </div>
        </header>

        <main className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:py-14">
          <section>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mt-5 max-w-3xl text-4xl font-bold tracking-tight lg:text-6xl">
              Task management for teams.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 max-w-2xl text-base leading-7 text-slate-300">
              Xplore Intellects Task management sytem keeps approvals, assignments, and task progress in one simple place for admins and employees.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-8 flex flex-wrap gap-4">
              <Link to="/login" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200">
                Open dashboard
              </Link>
              <Link to="/register" className="rounded-full border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800">
                Register as employee
              </Link>
            </motion.div>
          </section>

          <motion.section initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="grid gap-3">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{feature.copy}</p>
                </div>
              ))}
            </div>
          </motion.section>
        </main>
      </div>
    </div>
  );
};

export default Landing;