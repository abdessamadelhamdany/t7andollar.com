import { Action, PostState } from 'store/interfaces';
import {
  INITIALIZE_POST_DEPS,
  INITIALIZE_POST_FORM,
  SET_POST_FORM_FIELD,
} from 'store/types';

const initialState: PostState = {
  postForm: {
    id: 0,
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
  categories: [],
  tags: [],
};

const postReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case INITIALIZE_POST_FORM:
      return { ...state, postForm: action.payload };

    case SET_POST_FORM_FIELD:
      const newFields = { ...action.payload };
      const newPostForm = { ...state.postForm, ...newFields };

      return { ...state, postForm: newPostForm };

    case INITIALIZE_POST_DEPS:
      return {
        ...state,
        categories: action.payload.categories,
        tags: action.payload.tags,
      };

    default:
      return state;
  }
};

export default postReducer;
