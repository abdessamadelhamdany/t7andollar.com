import { Action, PostState } from 'store/interfaces';
import { INITIALIZE_POST_FORM, SET_POST_FORM_FIELD } from 'store/types';

const initialState: PostState = {
  postForm: {
    id: 0,
    createdAt: '',
    updatedAt: '',
    title: '',
    slug: '',
    excerpt: '',
    thumbnail: '',
    body: '',
    published: false,
    keywords: [],
    categories: [],
    tags: [],
  },
};

const postReducer = (state = initialState, action: Action) => {
  if (INITIALIZE_POST_FORM) {
    return { ...state, postForm: action.payload };
  }

  if (SET_POST_FORM_FIELD) {
    return { ...state, postForm: { ...state.postForm, ...action.payload } };
  }

  return state;
};

export default postReducer;
