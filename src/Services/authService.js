import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
});

// 🔐 Automatically attach token on every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export async function signup({ name, email, password }) {
  try {
    const res = await API.post("/api/auth/signup", {
      name,
      email,
      password,
    });
    return res.data; // { ok, token, user }
  } catch (e) {
    return {
      ok: false,
      error:
        e?.response?.data?.error ||
        e?.message ||
        "Signup failed",
    };
  }
}


export async function signin({ email, password }) {
  try {
    const res = await API.post("/api/auth/signin", {
      email,
      password,
    });
    return res.data; // { ok, token, user }
  } catch (e) {
    return {
      ok: false,
      error:
        e?.response?.data?.error ||
        e?.message ||
        "Login failed",
    };
  }
}


export async function getMe() {
  try {
    const res = await API.get("/api/auth/me");
    return res.data; // { ok, user }
  } catch {
    return { ok: false };
  }
}


export async function updateMe({ name }) {
  const res = await API.put("/api/auth/me", { name });
  return res.data;
}


export async function changePassword({ currentPassword, newPassword }) {
  const res = await API.post("/api/auth/password", {
    currentPassword,
    newPassword,
  });
  return res.data;
}


export async function updateMe({ name }) {
  const res = await axios.put('/api/auth/me', { name }, { headers: getAuthHeader() });
  return res.data;
}

export async function changePassword({ currentPassword, newPassword }) {
  const res = await axios.post('/api/auth/password', { currentPassword, newPassword }, { headers: getAuthHeader() });
  return res.data;
}