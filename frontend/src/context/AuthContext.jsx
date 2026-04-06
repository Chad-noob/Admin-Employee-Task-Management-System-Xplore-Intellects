import { createContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api';

export const AuthContext = createContext(null);

const readStoredUser = () => {
  const storedUser = localStorage.getItem('taskflow-user');
  return storedUser ? JSON.parse(storedUser) : null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredUser);
  const [token, setToken] = useState(localStorage.getItem('taskflow-token'));
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        setInitializing(false);
        return;
      }

      try {
        const response = await api.get('/auth/me');
        setUser(response.data.user);
        localStorage.setItem('taskflow-user', JSON.stringify(response.data.user));
      } catch (_error) {
        localStorage.removeItem('taskflow-token');
        localStorage.removeItem('taskflow-user');
        setUser(null);
        setToken(null);
      } finally {
        setInitializing(false);
      }
    };

    bootstrap();
  }, [token]);

  const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    localStorage.setItem('taskflow-token', response.data.token);
    localStorage.setItem('taskflow-user', JSON.stringify(response.data.user));
    setToken(response.data.token);
    setUser(response.data.user);
    return response.data.user;
  };

  const register = async (payload) => {
    const response = await api.post('/auth/register', payload);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('taskflow-token');
    localStorage.removeItem('taskflow-user');
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, token, initializing, login, register, logout, setUser }),
    [user, token, initializing]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};