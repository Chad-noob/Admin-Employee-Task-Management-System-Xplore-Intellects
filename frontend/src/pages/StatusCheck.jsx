import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import PageShell from '../components/layout/PageShell';

const StatusCheck = () => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await api.get('/employees/me/status');
        setStatus(response.data.status);
        setEmployee(response.data.employee);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch status');
        if (error.response?.status === 401) {
          navigate('/login', { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [navigate]);

  if (loading) {
    return (
      <PageShell title="Check Status" subtitle="Loading your approval status...">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full border-4 border-slate-300 border-t-slate-900 dark:border-slate-700 dark:border-t-white h-12 w-12"></div>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Checking status...</p>
          </div>
        </div>
      </PageShell>
    );
  }

  const isApproved = status === 'approved';

  return (
    <PageShell title="Check Status" subtitle="View your employment application status">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl border-2 p-8 text-center ${
            isApproved
              ? 'border-emerald-500 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-950'
              : 'border-amber-500 bg-amber-50 dark:border-amber-600 dark:bg-amber-950'
          }`}
        >
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
              className={`flex h-24 w-24 items-center justify-center rounded-full ${
                isApproved
                  ? 'bg-emerald-500 text-white'
                  : 'bg-amber-500 text-white'
              }`}
            >
              {isApproved ? (
                <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </motion.div>
          </div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`mt-6 text-3xl font-bold ${
              isApproved
                ? 'text-emerald-900 dark:text-emerald-100'
                : 'text-amber-900 dark:text-amber-100'
            }`}
          >
            {isApproved ? 'Approved! ✓' : 'Pending Review'}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`mt-3 text-lg ${
              isApproved
                ? 'text-emerald-800 dark:text-emerald-200'
                : 'text-amber-800 dark:text-amber-200'
            }`}
          >
            {isApproved
              ? 'Congratulations! Your application has been approved. You can now access the full dashboard.'
              : 'Your application is under review. An admin will review your credentials soon. Please check back later.'}
          </motion.p>

          <div className={`mt-8 rounded-xl p-4 ${
            isApproved
              ? 'bg-emerald-100 dark:bg-emerald-900'
              : 'bg-amber-100 dark:bg-amber-900'
          }`}>
            <p className={`text-sm font-semibold ${
              isApproved
                ? 'text-emerald-900 dark:text-emerald-100'
                : 'text-amber-900 dark:text-amber-100'
            }`}>
              Name: <span className="font-normal">{employee?.name}</span>
            </p>
            <p className={`mt-2 text-sm font-semibold ${
              isApproved
                ? 'text-emerald-900 dark:text-emerald-100'
                : 'text-amber-900 dark:text-amber-100'
            }`}>
              Email: <span className="font-normal">{employee?.email}</span>
            </p>
            <p className={`mt-2 text-sm font-semibold ${
              isApproved
                ? 'text-emerald-900 dark:text-emerald-100'
                : 'text-amber-900 dark:text-amber-100'
            }`}>
              Application Date: <span className="font-normal">{new Date(employee?.createdAt).toLocaleDateString()}</span>
            </p>
          </div>

          {isApproved && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => navigate('/employee', { replace: true })}
              className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700 transition"
            >
              Go to Dashboard
            </motion.button>
          )}
        </motion.div>
      </div>
    </PageShell>
  );
};

export default StatusCheck;
