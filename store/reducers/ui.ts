import { Action, UIState } from 'store/interfaces';
import { SET_LOADING, SET_ERROR } from 'store/types';

const initialState: UIState = {
  error: '',
  loading: false,
};

const uiReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };

    case SET_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default uiReducer;
