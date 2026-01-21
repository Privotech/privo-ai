export function getAuthHeader() {
  try {
    const token = JSON.parse(localStorage.getItem('token')) || localStorage.getItem('token');
    const raw = typeof token === 'string' ? token : token?.value || token;
    return raw ? { Authorization: `Bearer ${raw}` } : {};
  } catch {
    const raw = localStorage.getItem('token');
    return raw ? { Authorization: `Bearer ${raw}` } : {};
  }
}