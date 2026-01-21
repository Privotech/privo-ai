import axios from 'axios';

export async function sendChatMessage({ message, history = [] }) {
  const res = await axios.post('/api/chat', { message, history });
  return res.data; // { ok, reply }
}