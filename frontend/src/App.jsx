import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NotFound from './pages/NotFound';

const App = () => {
  const { user } = useAuth();
  const [theme, setTheme] = useState(() => localStorage.getItem('taskflow-theme') || 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('taskflow-theme', theme);
  }, [theme]);

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/employee'} replace /> : <Landing />} />
      <Route path="/login" element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/employee'} replace /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/employee'} replace /> : <Register />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={[ 'admin' ]}>
            <AdminDashboard theme={theme} setTheme={setTheme} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee"
        element={
          <ProtectedRoute allowedRoles={[ 'employee' ]}>
            <EmployeeDashboard theme={theme} setTheme={setTheme} />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;