import { combineReducers } from 'redux';
import postReducer from './post';
import userReducer from './user';

const reducers = combineReducers({
  post: postReducer,
  user: userReducer,
});

export default reducers;
