import { Action, TagState } from 'store/interfaces';
import {
  INITIALIZE_TAGS,
  INITIALIZE_TAG_FORM,
  SET_TAG_FORM_FIELD,
  UPDATE_TAG,
  DELETE_TAG,
} from 'store/types';

const initialState: TagState = {
  tagForm: {
    id: 0,
    name: '',
    slug: '',
  },
  tags: [],
};

const tagReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case INITIALIZE_TAGS:
      return { ...state, tags: action.payload };

    case INITIALIZE_TAG_FORM:
      return { ...state, tagForm: action.payload };

    case SET_TAG_FORM_FIELD:
      const newFields = { ...action.payload };
      const newTagForm = { ...state.tagForm, ...newFields };

      return { ...state, tagForm: newTagForm };

    case UPDATE_TAG:
      for (let i = 0; i < state.tags.length; i++) {
        if (state.tags[i].id === action.payload.id) {
          state.tags[i] = action.payload;
          return { ...state, tags: [...state.tags] };
        }
      }

    case DELETE_TAG:
      const newTags = state.tags.filter((tag) => tag.id !== action.payload);

      return { ...state, tags: newTags };

    default:
      return state;
  }
};

export default tagReducer;
