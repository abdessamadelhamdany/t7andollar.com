import { combineReducers } from 'redux';
import uiReducer from './ui';
import postReducer from './post';
import categoryReducer from './category';
import userReducer from './user';

const reducers = combineReducers({
  ui: uiReducer,
  post: postReducer,
  category: categoryReducer,
  user: userReducer,
});

export default reducers;
