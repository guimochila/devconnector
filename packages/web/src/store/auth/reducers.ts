import { Action, ActionTypes } from '../types';
import { Authenticate } from './actions';
import { Reducer } from 'redux';

const initialState: Authenticate = {
  isAuthenticated: false,
  user: null,
};

export const authReducer: Reducer<Authenticate, Action> = (
  state: Authenticate = initialState,
  action: Action,
) => {
  switch (action.type) {
    case ActionTypes.registerSuccess:
    case ActionTypes.userLogIn:
      return { isAuthenticated: true, user: action.payload.user };
    case ActionTypes.userLogout:
      return { isAuthenticated: false, user: null };
    default:
      return state;
  }
};
