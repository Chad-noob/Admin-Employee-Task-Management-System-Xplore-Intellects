import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginType, setLoginType] = useState('employee'); // 'admin' or 'employee'
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const payload = {
        email: form.email.trim(),
        password: form.password.trim()
      };
      const user = await login(payload);
      
      // Validate role matches login type
      if (loginType === 'admin' && user.role !== 'admin') {
        toast.error('Invalid admin credentials');
        setLoading(false);
        return;
      }
      if (loginType === 'employee' && user.role !== 'employee') {
        toast.error('Invalid employee credentials');
        setLoading(false);
        return;
      }
      
      toast.success(`Welcome back, ${user.name}`);
      navigate(user.role === 'admin' ? '/admin' : '/employee', { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-600 dark:text-cyan-400">Xplore Intellects Task management sytem</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Sign in</h1>

        {/* Login Type Toggle */}
        <div className="mt-6 flex gap-3 rounded-xl bg-slate-800 p-1.5">
          <button
            type="button"
            onClick={() => {
              setLoginType('admin');
              setForm({ email: '', password: '' });
            }}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition ${
              loginType === 'admin'
                ? 'bg-slate-900 text-white'
                : 'bg-transparent text-slate-400 hover:text-white'
            }`}
          >
            Administrator
          </button>
          <button
            type="button"
            onClick={() => {
              setLoginType('employee');
              setForm({ email: '', password: '' });
            }}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition ${
              loginType === 'employee'
                ? 'bg-slate-900 text-white'
                : 'bg-transparent text-slate-400 hover:text-white'
            }`}
          >
            Employee
          </button>
        </div>

        {/* Admin Login Form */}
        {loginType === 'admin' && (
          <form onSubmit={handleSubmit} className="mt-6">
            <p className="text-sm text-slate-400 mb-4">Enter your admin credentials to access the dashboard.</p>
            <div className="space-y-4">
              <input
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                placeholder="Admin Email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
              />
              <input
                type="password"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                placeholder="Admin Password"
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
              />
            </div>
            <button
              disabled={loading}
              className="mt-6 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-900"
            >
              {loading ? 'Signing in...' : 'Sign in as Admin'}
            </button>
          </form>
        )}

        {/* Employee Login Form */}
        {loginType === 'employee' && (
          <form onSubmit={handleSubmit} className="mt-6">
            <p className="text-sm text-slate-400 mb-4">Enter your employee account credentials. Your account must be approved by an admin.</p>
            <div className="space-y-4">
              <input
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                placeholder="Employee Email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
              />
              <input
                type="password"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                placeholder="Employee Password"
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
              />
            </div>
            <button
              disabled={loading}
              className="mt-6 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-900"
            >
              {loading ? 'Signing in...' : 'Sign in as Employee'}
            </button>
            <p className="mt-5 text-sm text-slate-400">
              Don't have an account? <Link to="/register" className="font-semibold text-cyan-600 dark:text-cyan-400">Register here</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;