import { combineReducers } from 'redux';
import alert from './altert';
import auth from './auth';

export default combineReducers({
  alert,
  auth,
});
