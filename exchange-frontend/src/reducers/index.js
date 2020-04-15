import { combineReducers } from 'redux';
import userReducer from './userReducer';
import contractReducer from './contractReducer';

export default combineReducers({
  user: userReducer,
  contract: contractReducer,
});
