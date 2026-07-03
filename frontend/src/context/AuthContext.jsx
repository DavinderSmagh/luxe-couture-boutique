import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      // Set default header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    } else {
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [user]);

  // Sync token to axios defaults on initial load if user exists
  useEffect(() => {
     if(user) {
         axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
     }
  }, []);

  const login = async (emailOrPhone, password) => {
    const { data } = await axios.post(`${API_URL}/api/users/login`, {
      emailOrPhone,
      password,
    });
    setUser(data);
    return data;
  };

  const register = async (name, emailOrPhone, password, method) => {
    const payload = { name, password };
    if (method === 'email') {
      payload.email = emailOrPhone;
    } else {
      payload.phone = emailOrPhone;
    }
    const { data } = await axios.post(`${API_URL}/api/users/register`, payload);
    setUser(data);
    return data;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
