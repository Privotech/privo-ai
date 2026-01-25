import { apiClient } from '../Utils/http';
import { getAuthHeader } from '../Utils/auth';

const api = apiClient('/api/chats');

export async function createChat(title = 'New Chat') {
  const res = await api.post('/', { title }, { headers: getAuthHeader() });
  return res.data;
}

export async function listChats() {
  const res = await api.get('/', { headers: getAuthHeader() });
  return res.data;
}

export async function getChat(id) {
  const res = await api.get(`/${id}`, { headers: getAuthHeader() });
  return res.data;
}

export async function sendMessage(id, message) {
  const res = await api.post(`/${id}/messages`, { message }, { headers: getAuthHeader() });
  return res.data;
}

export async function deleteChat(id) {
  const res = await api.delete(`/${id}`, { headers: getAuthHeader() });
  return res.data;
}