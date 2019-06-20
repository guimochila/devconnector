import axios from 'axios';
import { changeAlert } from './changeAlert';
import setAuthToken from '../utils/setAuthToken';

// Register
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/signup', body, config);
    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: res.data,
    });
  } catch (err) {
    const { error } = err.response.data;

    dispatch(changeAlert(error, 'danger'));
    dispatch({
      type: 'REGISTER_FAIL',
    });
  }
};

// LoadUser
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/user/me');
    dispatch({
      type: 'USER_LOADED',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'AUTH_ERROR',
    });
  }
};

// Login
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/signin', body, config);
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const { error } = err.response.data;

    dispatch(changeAlert(error, 'danger'));
    dispatch({
      type: 'LOGIN_FAIL',
    });
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch({ type: 'LOGOUT' });
};
