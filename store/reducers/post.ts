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
  switch (action.type) {
    case INITIALIZE_POST_FORM:
      return { ...state, postForm: action.payload };

    case SET_POST_FORM_FIELD:
      return { ...state, postForm: { ...state.postForm, ...action.payload } };

    default:
      return state;
  }
};

export default postReducer;
