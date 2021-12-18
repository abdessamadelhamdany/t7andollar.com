export * from './ui';
export * from './post';
export * from './tag';
export * from './category';
export * from './user';
import { UIState, PostState, UserState, CategoryState, TagState } from '.';

export interface Action {
  type: string;
  payload?: any;
}

export interface AppState {
  ui: UIState;
  post: PostState;
  tag: TagState;
  category: CategoryState;
  user: UserState;
}
