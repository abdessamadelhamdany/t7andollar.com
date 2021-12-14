export * from './post';
export * from './user';
import { PostState, UserState } from '.';

export interface Action {
  type: string;
  payload?: any;
}

export interface AppState {
  post: PostState;
  user: UserState;
}
