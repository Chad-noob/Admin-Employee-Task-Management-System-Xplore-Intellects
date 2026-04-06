import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import StatusCheck from './pages/StatusCheck';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NotFound from './pages/NotFound';

const App = () => {
  const { user } = useAuth();

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/employee'} replace /> : <Landing />} />
      <Route path="/login" element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/employee'} replace /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/employee'} replace /> : <Register />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={[ 'admin' ]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee"
        element={
          <ProtectedRoute allowedRoles={[ 'employee' ]}>
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/status"
        element={
          <ProtectedRoute allowedRoles={[ 'employee' ]}>
            <StatusCheck />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;