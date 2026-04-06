import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../services/api';
import PageShell from '../components/layout/PageShell';
import StatCard from '../components/ui/StatCard';
import SkeletonCard from '../components/ui/SkeletonCard';
import EmptyState from '../components/ui/EmptyState';
import SectionHeader from '../components/ui/SectionHeader';
import TaskCard from '../components/cards/TaskCard';

const taskTabs = ['All', 'Pending', 'In Progress', 'Completed'];

const EmployeeDashboard = ({ theme, setTheme }) => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskSearch, setTaskSearch] = useState('');
  const [activeTaskTab, setActiveTaskTab] = useState('All');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [summaryResponse, tasksResponse] = await Promise.all([api.get('/dashboard/summary'), api.get('/tasks')]);
      setSummary(summaryResponse.data.summary);
      setTasks(tasksResponse.data.tasks);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to load employee dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (taskId, status) => {
    try {
      await api.patch(`/tasks/${taskId}/status`, { status });
      toast.success(`Task marked as ${status.toLowerCase()}`);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to update task status');
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesTab = activeTaskTab === 'All' || task.status === activeTaskTab;
      const text = `${task.title} ${task.description}`.toLowerCase();
      const matchesSearch = text.includes(taskSearch.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [tasks, activeTaskTab, taskSearch]);

  const completed = summary?.taskDistribution?.Completed ?? 0;
  const totalTasks = summary?.totalTasks ?? 0;
  const progress = summary?.progress ?? 0;

  return (
    <PageShell
      title="My tasks"
      subtitle="Review assignments, update status, and follow your progress."
      theme={theme}
      onToggleTheme={() => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))}
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <StatCard label="Total Tasks" value={totalTasks} accent="bg-cyan-500" subtitle="Assignments currently in your queue" />
            <StatCard label="Pending" value={summary?.taskDistribution?.Pending ?? 0} accent="bg-amber-400" subtitle="Work waiting to be started" />
            <StatCard label="In Progress" value={summary?.taskDistribution?.['In Progress'] ?? 0} accent="bg-sky-500" subtitle="Tasks actively being worked on" />
            <StatCard label="Completion" value={`${progress}%`} accent="bg-emerald-500" subtitle={`${completed} tasks completed`} />
          </>
        )}
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <SectionHeader title="Your progress" description="A glance at your task balance and current momentum." />
        <div className="grid gap-4 md:grid-cols-3">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)
          ) : (
            <>
              {['Pending', 'In Progress', 'Completed'].map((status) => (
                <div key={status} className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-950">
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{status}</p>
                  <p className="mt-2 text-3xl font-black text-slate-900 dark:text-white">{summary?.taskDistribution?.[status] ?? 0}</p>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                    <div
                      className={`h-2 rounded-full ${status === 'Pending' ? 'bg-amber-500' : status === 'In Progress' ? 'bg-sky-500' : 'bg-emerald-500'}`}
                      style={{ width: `${totalTasks ? Math.max(8, ((summary?.taskDistribution?.[status] ?? 0) / totalTasks) * 100) : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900" id="tasks">
        <SectionHeader title="Your tasks" description="Filter by status and update cards without leaving the page." />

        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {taskTabs.map((tab) => (
              <button key={tab} onClick={() => setActiveTaskTab(tab)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeTaskTab === tab ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>
                {tab}
              </button>
            ))}
          </div>
          <input value={taskSearch} onChange={(event) => setTaskSearch(event.target.value)} placeholder="Search tasks" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none placeholder:text-slate-400 lg:max-w-sm dark:border-slate-800 dark:bg-slate-950" />
        </div>

        {loading ? (
          <div className="grid gap-4 xl:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />)}
          </div>
        ) : filteredTasks.length ? (
          <motion.div layout className="grid gap-4 xl:grid-cols-2">
            <AnimatePresence>
              {filteredTasks.map((task) => (
                <TaskCard key={task._id} task={task} role="employee" onChangeStatus={updateStatus} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <EmptyState title="No tasks match your filters" description="Try another status tab or search term." />
        )}
      </section>
    </PageShell>
  );
};

export default EmployeeDashboard;