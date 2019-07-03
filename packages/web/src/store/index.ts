import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { alertReducer, Alert } from './alerts';
import { Action } from './types';
import { authReducer, Authenticate } from './auth';

export interface StoreState {
  alerts: Alert[];
  auth: Authenticate;
}

const rootReducer = combineReducers<StoreState, Action>({
  alerts: alertReducer,
  auth: authReducer,
});

export default function configureStore() {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer),
  );

  return store;
}
