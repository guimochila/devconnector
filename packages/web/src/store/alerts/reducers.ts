import { Action, ActionTypes } from '../types';
import { Alert } from './actions';

export function alertReducer(state: Alert[] = [], action: Action) {
  switch (action.type) {
    case ActionTypes.setAlert:
      return [...state, action.payload];
    case ActionTypes.removeAlert:
      return state.filter((alert: Alert) => alert.id !== action.payload);
    default:
      return state;
  }
}
