import { Action, UserState, Role } from 'store/interfaces';
import { INITIALIZE_AUTH_USER } from 'store/types';

const initialState: UserState = {
  authUser: null,
};

const postReducer = (state = initialState, action: Action) => {
  if (INITIALIZE_AUTH_USER) {
    return { ...state, authUser: action.payload };
  }

  return state;
};

export default postReducer;
