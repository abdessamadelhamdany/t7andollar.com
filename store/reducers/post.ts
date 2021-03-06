import { Action, Post, PostState } from 'store/interfaces';
import {
  SET_POST_FORM_FIELD,
  INITIALIZE_POST_STATE,
  UPDATE_POST,
  DELETE_POST,
  INITIALIZE_POSTS,
} from 'store/types';

const initialPost: Post = {
  id: 0,
  title: null,
  slug: null,
  excerpt: null,
  thumbnail: null,
  body: null,
  published: false,
  authorId: 0,
  author: { name: '' },
  readingTime: null,
  keywords: [],
  categories: [],
  tags: [],
};

const initialState: PostState = {
  post: initialPost,
  posts: [],
  postForm: initialPost,
  categories: [],
  tags: [],
};

const postReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case INITIALIZE_POSTS:
      return { ...state, posts: action.payload };

    case INITIALIZE_POST_STATE:
      const newState = { ...state };

      if (action.payload.post) {
        newState.post = action.payload.post;
        newState.postForm = action.payload.post;
      }

      if (action.payload.categories) {
        newState.categories = action.payload.categories;
      }

      if (action.payload.tags) {
        newState.tags = action.payload.tags;
      }

      return newState;

    case SET_POST_FORM_FIELD:
      const newFields = { ...action.payload };
      const newPostForm = { ...state.postForm, ...newFields };

      return { ...state, postForm: newPostForm };

    case UPDATE_POST:
      return { ...state, post: action.payload, postForm: action.payload };

    case DELETE_POST:
      const newPosts = state.posts.filter((post) => post.id !== action.payload);
      return { ...state, posts: newPosts };

    default:
      return state;
  }
};

export default postReducer;
