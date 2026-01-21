import axios from 'axios';
import { getAuthHeader } from '../Utils/auth';

export async function listImages() {
  const res = await axios.get('/api/images', { headers: getAuthHeader() });
  return res.data; // { ok, images }
}

export async function generateImage(prompt) {
  const res = await axios.post('/api/images', { prompt }, { headers: getAuthHeader() });
  return res.data; // { ok, image }
}