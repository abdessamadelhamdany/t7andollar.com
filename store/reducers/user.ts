import { Action, UserState, Role } from 'store/interfaces';
import { INITIALIZE_AUTH_USER } from 'store/types';

const initialState: UserState = {
  authUser: null,
};

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case INITIALIZE_AUTH_USER:
      return { ...state, authUser: action.payload };

    default:
      return state;
  }
};

export default userReducer;
