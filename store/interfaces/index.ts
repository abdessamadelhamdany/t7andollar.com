export * from './ui';
export * from './post';
export * from './user';
import { UIState, PostState, UserState } from '.';

export interface Action {
  type: string;
  payload?: any;
}

export interface AppState {
  ui: UIState;
  post: PostState;
  user: UserState;
}
