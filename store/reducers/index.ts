import { combineReducers } from 'redux';
import postReducer from './post';

const reducers = combineReducers({
  post: postReducer,
});

export default reducers;
