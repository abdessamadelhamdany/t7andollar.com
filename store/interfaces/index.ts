export * from './post';
import { PostState } from '.';

export interface Action {
  type: string;
  payload?: any;
}

export interface AppState {
  post: PostState;
}
