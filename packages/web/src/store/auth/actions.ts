import { ThunkDispatch } from 'redux-thunk';
import { StoreState } from '..';
import { fetchUser, registerUser, logoutUser, loginUser } from '../../services';
import { setAlert } from '../alerts';
import { Action, ActionTypes } from '../types';

export interface User {
  id: number;
  email: string;
  name: string;
  avatar: string;
}

export interface Authenticate {
  isAuthenticated?: boolean;
  user: User | null;
}

export interface UserInput {
  email: string;
  name: string;
  password: string;
}

export interface RegisterUserAction {
  type: ActionTypes.registerSuccess;
  payload: Authenticate;
}

export interface UserLogInAction {
  type: ActionTypes.userLogIn;
  payload: Authenticate;
}

export interface UserLogoutAction {
  type: ActionTypes.userLogout;
}

// Register
export const register = ({ name, email, password }: UserInput) => async (
  dispatch: ThunkDispatch<StoreState, void, Action>,
) => {
  try {
    const user = await registerUser({ name, email, password });

    dispatch<RegisterUserAction>({
      type: ActionTypes.registerSuccess,
      payload: { user },
    });
  } catch (err) {
    const { error } = err.response.data;
    error.map((err: string) => dispatch(setAlert(err, 'danger')));
  }
};

export const loadUser = () => async (
  dispatch: ThunkDispatch<StoreState, void, Action>,
) => {
  try {
    const user = await fetchUser();
    dispatch<UserLogInAction>({
      type: ActionTypes.userLogIn,
      payload: { user },
    });
  } catch (e) {
    console.log(e);
  }
};

export const login = (email: string, password: string) => async (
  dispatch: ThunkDispatch<StoreState, void, Action>,
) => {
  try {
    const user = await loginUser(email, password);
    dispatch<UserLogInAction>({
      type: ActionTypes.userLogIn,
      payload: { user },
    });
  } catch (err) {
    const { error } = err.response.data;
    error.map((err: string) => dispatch(setAlert(err, 'danger')));
  }
};

export const logout = () => async (
  dispatch: ThunkDispatch<StoreState, void, Action>,
) => {
  try {
    await logoutUser();
    dispatch<UserLogoutAction>({
      type: ActionTypes.userLogout,
    });
  } catch (e) {
    console.log(e);
  }
};
