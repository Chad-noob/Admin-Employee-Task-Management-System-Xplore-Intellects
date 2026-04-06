import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../services/api';
import useAuth from '../hooks/useAuth';
import PageShell from '../components/layout/PageShell';
import StatCard from '../components/ui/StatCard';
import SkeletonCard from '../components/ui/SkeletonCard';
import EmptyState from '../components/ui/EmptyState';
import SectionHeader from '../components/ui/SectionHeader';
import Modal from '../components/ui/Modal';
import EmployeeCard from '../components/cards/EmployeeCard';
import TaskCard from '../components/cards/TaskCard';

const taskTabs = ['All', 'Pending', 'In Progress', 'Completed'];

const AdminDashboard = ({ theme, setTheme }) => {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [taskSearch, setTaskSearch] = useState('');
  const [activeTaskTab, setActiveTaskTab] = useState('All');
  const [assignmentOpen, setAssignmentOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [assignmentForm, setAssignmentForm] = useState({ title: '', description: '', assignedTo: '' });
  const [actionLoading, setActionLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [summaryResponse, employeesResponse, tasksResponse] = await Promise.all([
        api.get('/dashboard/summary'),
        api.get('/employees'),
        api.get('/tasks')
      ]);

      setSummary(summaryResponse.data.summary);
      setEmployees(employeesResponse.data.employees);
      setTasks(tasksResponse.data.tasks);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to load admin dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApprove = async (id) => {
    try {
      await api.patch(`/employees/${id}/approve`);
      toast.success('Employee approved');
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to approve employee');
    }
  };

  const handleReject = async (id) => {
    try {
      await api.delete(`/employees/${id}/reject`);
      toast.success('Employee rejected');
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to reject employee');
    }
  };

  const openAssignModal = (employee) => {
    setSelectedEmployee(employee);
    setAssignmentForm({ title: '', description: '', assignedTo: employee._id });
    setAssignmentOpen(true);
  };

  const handleAssignTask = async (event) => {
    event.preventDefault();
    setActionLoading(true);
    try {
      await api.post('/tasks', assignmentForm);
      toast.success('Task assigned successfully');
      setAssignmentOpen(false);
      setSelectedEmployee(null);
      setAssignmentForm({ title: '', description: '', assignedTo: '' });
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to assign task');
    } finally {
      setActionLoading(false);
    }
  };

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch = `${employee.name} ${employee.email}`.toLowerCase().includes(employeeSearch.toLowerCase());
      return matchesSearch;
    });
  }, [employees, employeeSearch]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesTab = activeTaskTab === 'All' || task.status === activeTaskTab;
      const text = `${task.title} ${task.description} ${task.assignedTo?.name || ''}`.toLowerCase();
      const matchesSearch = text.includes(taskSearch.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [tasks, activeTaskTab, taskSearch]);

  const approvedEmployees = employees.filter((employee) => employee.isApproved);
  const completedRate = summary?.totalTasks ? Math.round((summary.taskDistribution.Completed / summary.totalTasks) * 100) : 0;

  return (
    <PageShell
      title="Admin dashboard"
      subtitle="Approve employees, assign tasks, and review status at a glance."
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
            <StatCard label="Total Employees" value={summary?.totalEmployees ?? 0} accent="bg-cyan-500" subtitle="All registrations captured in the system" />
            <StatCard label="Pending Approvals" value={summary?.pendingApprovals ?? 0} accent="bg-amber-400" subtitle="Applicants waiting for admin review" />
            <StatCard label="Total Tasks" value={summary?.totalTasks ?? 0} accent="bg-sky-500" subtitle="Company-wide task volume" />
            <StatCard label="Completion Rate" value={`${completedRate}%`} accent="bg-emerald-500" subtitle="Completed tasks against total assignments" />
          </>
        )}
      </section>

      <section className="mt-8 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <SectionHeader title="Employee approvals" description="Search registrations, approve access, or reject requests." />
          <div className="mb-4 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
            <input value={employeeSearch} onChange={(event) => setEmployeeSearch(event.target.value)} placeholder="Search employees by name or email" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" />
          </div>

          {loading ? (
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />)}
            </div>
          ) : filteredEmployees.length ? (
            <motion.div layout className="grid gap-4 md:grid-cols-2" id="employees">
              <AnimatePresence>
                {filteredEmployees.map((employee) => (
                  <EmployeeCard key={employee._id} employee={employee} onApprove={handleApprove} onReject={handleReject} onAssign={openAssignModal} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <EmptyState title="No employees found" description="Try a different search or wait for new registrations." />
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <SectionHeader title="Task status distribution" description="A quick read on how work is moving across the company." />
            <div className="space-y-4">
              {['Pending', 'In Progress', 'Completed'].map((status) => (
                <div key={status} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span className="text-slate-700 dark:text-slate-200">{status}</span>
                    <span className="text-slate-500 dark:text-slate-400">{summary?.taskDistribution?.[status] ?? 0}</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                    <div
                      className={`h-2 rounded-full ${status === 'Pending' ? 'bg-amber-500' : status === 'In Progress' ? 'bg-sky-500' : 'bg-emerald-500'}`}
                      style={{ width: `${summary?.totalTasks ? Math.max(8, ((summary.taskDistribution?.[status] ?? 0) / summary.totalTasks) * 100) : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <SectionHeader title="Approved employees" description="Only approved employees can receive tasks." />
            <div className="flex flex-wrap gap-2">
              <div className="rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300">Approved: {approvedEmployees.length}</div>
              <div className="rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">Pending: {summary?.pendingApprovals ?? 0}</div>
            </div>
            <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">Use the Assign task action on a card to launch a modal and push work instantly.</div>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900" id="tasks">
        <SectionHeader title="Task operations" description="View all assigned work and track status changes across employees." />

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
                <TaskCard key={task._id} task={task} role="admin" />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <EmptyState title="No tasks match your filters" description="Adjust the status tab or search term to review other assignments." />
        )}
      </section>

      <Modal open={assignmentOpen} title={`Assign task ${selectedEmployee ? `to ${selectedEmployee.name}` : ''}`} onClose={() => setAssignmentOpen(false)}>
        <form onSubmit={handleAssignTask} className="space-y-4">
          <input required value={assignmentForm.title} onChange={(event) => setAssignmentForm({ ...assignmentForm, title: event.target.value })} placeholder="Task title" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
          <textarea required rows="4" value={assignmentForm.description} onChange={(event) => setAssignmentForm({ ...assignmentForm, description: event.target.value })} placeholder="Task description" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
          <select value={assignmentForm.assignedTo} onChange={(event) => setAssignmentForm({ ...assignmentForm, assignedTo: event.target.value })} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white">
            <option value="">Select employee</option>
            {approvedEmployees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.name} - {employee.email}
              </option>
            ))}
          </select>
          <button disabled={actionLoading} className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-900">
            {actionLoading ? 'Assigning...' : 'Assign task'}
          </button>
        </form>
      </Modal>
    </PageShell>
  );
};

export default AdminDashboard;