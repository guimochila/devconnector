import nanoid from 'nanoid';
import { Dispatch } from 'redux';
import { ActionTypes } from '../types';
export interface Alert {
  id?: string;
  type: string;
  message: string;
}

export interface SetAlertAction {
  type: ActionTypes.setAlert;
  payload: Alert;
}

export interface RemoveAlertAction {
  type: ActionTypes.removeAlert;
  payload: string;
}

export function setAlert(message: string, type: string) {
  return (dispatch: Dispatch) => {
    const id = nanoid();
    dispatch<SetAlertAction>({
      type: ActionTypes.setAlert,
      payload: {
        id,
        type,
        message,
      },
    });

    setTimeout(() => dispatch<RemoveAlertAction>(removeAlert(id)), 5000);
  };
}

export function removeAlert(id: string): RemoveAlertAction {
  return {
    type: ActionTypes.removeAlert,
    payload: id,
  };
}
