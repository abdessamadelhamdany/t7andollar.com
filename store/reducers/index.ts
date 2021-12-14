import { combineReducers } from 'redux';
import uiReducer from './ui';
import postReducer from './post';
import userReducer from './user';

const reducers = combineReducers({
  ui: uiReducer,
  post: postReducer,
  user: userReducer,
});

export default reducers;
