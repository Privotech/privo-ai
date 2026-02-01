import React, { createContext, useContext, useEffect, useState } from 'react';
import { signin, signup, getMe } from '../Services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem('token');
    const u = localStorage.getItem('user');
    if (t && u) {
      setToken(t);
      try { setUser(JSON.parse(u)); } catch { setUser(null); }
    }
    setLoading(false);
  }, []);

  const doSignin = async (email, password) => {
    const res = await signin({ email, password });
    if (res.ok) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      setToken(res.token);
      setUser(res.user);
    }
    return res;
  };

  const doSignup = async (name, email, password) => {
    const res = await signup({ name, email, password });
    if (res.ok) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      setToken(res.token);
      setUser(res.user);
    }
    return res;
  };

  const signout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const signinWithToken = async (t) => {
    localStorage.setItem('token', t);
    setToken(t);
    try {
      const res = await getMe();
      if (res.ok && res.user) {
        localStorage.setItem('user', JSON.stringify(res.user));
        setUser(res.user);
        return { ok: true };
      }
      return { ok: false, error: res.error || 'Failed to fetch user' };
    } catch (e) {
      return { ok: false, error: 'Failed to fetch user' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signin: doSignin, signup: doSignup, signout, signinWithToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}