import api from './api';

export async function fetchUser() {
  const { data } = await api.get('/user/me');

  return data.data;
}

export async function loginUser(email: string, password: string) {
  const { data } = await api.post('/signin', { email, password });

  return data.data;
}

export async function logoutUser() {
  return await api.get('/logout');
}
