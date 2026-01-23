import axios from 'axios';

// Configure base URL from environment for production deployments
const base = (import.meta?.env?.VITE_API_BASE_URL || '').replace(/\/+$/, '');
if (base) {
  axios.defaults.baseURL = base;
}

// We rely on Authorization header, not cookies
axios.defaults.withCredentials = false;

// Helper to create API clients bound to a sub-path, respecting base URL
export function apiClient(subPath = '') {
  const fullBase = base ? `${base}${subPath}` : subPath;
  return axios.create({ baseURL: fullBase || undefined });
}

export default axios;