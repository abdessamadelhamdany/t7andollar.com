import { Action, PostState } from 'store/interfaces';
import {
  SET_POST_FORM_FIELD,
  INITIALIZE_POST_STATE,
  UPDATE_POST,
} from 'store/types';

const initialPost = {
  id: 0,
  title: null,
  slug: null,
  excerpt: null,
  thumbnail: null,
  body: null,
  published: false,
  authorId: 0,
  readingTime: null,
  keywords: [],
  categories: [],
  tags: [],
};

const initialState: PostState = {
  post: initialPost,
  postForm: initialPost,
  categories: [],
  tags: [],
};

const postReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case INITIALIZE_POST_STATE:
      return {
        ...state,
        post: action.payload.post,
        postForm: action.payload.post,
        categories: action.payload.categories,
        tags: action.payload.tags,
      };

    case SET_POST_FORM_FIELD:
      const newFields = { ...action.payload };
      const newPostForm = { ...state.postForm, ...newFields };

      return { ...state, postForm: newPostForm };

    case UPDATE_POST:
      return { ...state, post: action.payload, postForm: action.payload };

    default:
      return state;
  }
};

export default postReducer;
