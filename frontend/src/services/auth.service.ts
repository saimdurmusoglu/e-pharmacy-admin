import api from './api';
import type { LoginCredentials } from '../types';

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const { data } = await api.post('/user/login', credentials);
    return data; // { token, user }
  },

  logout: async () => {
    await api.get('/user/logout');
    localStorage.removeItem('auth_token');
  },

  getUserInfo: async () => {
    const { data } = await api.get('/user/user-info');
    return data; // { id, name, email }
  },
};
