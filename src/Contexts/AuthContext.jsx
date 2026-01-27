import React, { createContext, useContext, useEffect, useState } from "react";
import { signin, signup, getMe } from "../Services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const t = localStorage.getItem("token");
      if (!t) {
        setLoading(false);
        return;
      }

      setToken(t);
      try {
        const res = await getMe();
        if (res.ok && res.user) {
          setUser(res.user);
          localStorage.setItem("user", JSON.stringify(res.user));
        } else {
          localStorage.clear();
        }
      } catch {
        localStorage.clear();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const doSignin = async (email, password) => {
    const res = await signin({ email, password });
    if (res.ok) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      setToken(res.token);
      setUser(res.user);
    }
    return res;
  };

  const doSignup = async (name, email, password) => {
    const res = await signup({ name, email, password });
    if (res.ok) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      setToken(res.token);
      setUser(res.user);
    }
    return res;
  };

  const signout = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        signin: doSignin,
        signup: doSignup,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
