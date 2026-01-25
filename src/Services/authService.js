import axios from '../Utils/http';
import { getAuthHeader } from '../Utils/auth';

export async function signup({ name, email, password }) {
  const res = await axios.post('/api/auth/signup', { name, email, password });
  return res.data; // { ok, token, user }
}

export async function signin({ email, password }) {
  const res = await axios.post('/api/auth/signin', { email, password });
  return res.data; // { ok, token, user }
}

export async function getMe() {
  const res = await axios.get('/api/auth/me', { headers: getAuthHeader() });
  return res.data; // { ok, user }
}

export async function updateMe({ name }) {
  const res = await axios.put('/api/auth/me', { name }, { headers: getAuthHeader() });
  return res.data; // { ok, user }
}

export async function changePassword({ currentPassword, newPassword }) {
  const res = await axios.post('/api/auth/password', { currentPassword, newPassword }, { headers: getAuthHeader() });
  return res.data; // { ok, message }
}