import api from './api';
import { UserInput, User } from '../store/user';

export async function registerUser(userInput: UserInput) {
  const { data } = await api.post<User>('/signup', userInput);

  return data;
}
