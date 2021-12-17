export * from './ui';
export * from './post';
export * from './category';
export * from './user';
import { UIState, PostState, UserState, CategoryState } from '.';

export interface Action {
  type: string;
  payload?: any;
}

export interface AppState {
  ui: UIState;
  post: PostState;
  category: CategoryState;
  user: UserState;
}
