import { combineReducers } from 'redux';
import uiReducer from './ui';
import postReducer from './post';
import tagReducer from './tag';
import categoryReducer from './category';
import userReducer from './user';

const reducers = combineReducers({
  ui: uiReducer,
  post: postReducer,
  tag: tagReducer,
  category: categoryReducer,
  user: userReducer,
});

export default reducers;
