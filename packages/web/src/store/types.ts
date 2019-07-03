import { SetAlertAction, RemoveAlertAction } from './alerts';
import { UserLogInAction, RegisterUserAction, UserLogoutAction } from './auth';

export enum ActionTypes {
  setAlert = 'SET_ALERT',
  removeAlert = 'REMOVE_ALERT',
  registerSuccess = 'REGISTER_SUCCESS',
  userLogIn = 'USER_LOGIN',
  userLogout = 'USER_LOGOUT',
}

export type Action =
  | RemoveAlertAction
  | SetAlertAction
  | RegisterUserAction
  | UserLogInAction
  | UserLogoutAction;
