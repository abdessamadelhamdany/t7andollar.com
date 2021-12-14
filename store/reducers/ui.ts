import { Action, UIState } from 'store/interfaces';
import { SET_LOADING } from 'store/types';

const initialState: UIState = {
  error: '',
  loading: false,
};

const uiReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};

export default uiReducer;
