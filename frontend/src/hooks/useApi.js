import axios from 'axios';
import { useAuth } from './useAuth';

const BASE = import.meta.env.VITE_API_URL || '';

export function useApi() {
  const { getToken } = useAuth();

  const request = async (method, url, data = null, params = null) => {
    const token = await getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios({ method, url: BASE + url, data, params, headers });
    return response.data;
  };

  return {
    get: (url, params) => request('get', url, null, params),
    post: (url, data) => request('post', url, data),
    put: (url, data) => request('put', url, data),
    patch: (url, data) => request('patch', url, data),
    del: (url) => request('delete', url),
  };
}
