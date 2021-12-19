import { Action, CategoryState } from 'store/interfaces';
import {
  INITIALIZE_CATEGORIES,
  INITIALIZE_CATEGORY_FORM,
  SET_CATEGORY_FORM_FIELD,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from 'store/types';

const initialState: CategoryState = {
  categoryForm: {
    id: 0,
    name: '',
    slug: '',
  },
  categories: [],
};

const categoryReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case INITIALIZE_CATEGORIES:
      return { ...state, categories: action.payload };

    case INITIALIZE_CATEGORY_FORM:
      return { ...state, categoryForm: action.payload };

    case SET_CATEGORY_FORM_FIELD:
      const newFields = { ...action.payload };
      const newCategoryForm = { ...state.categoryForm, ...newFields };

      return { ...state, categoryForm: newCategoryForm };

    case UPDATE_CATEGORY:
      for (let i = 0; i < state.categories.length; i++) {
        if (state.categories[i].id === action.payload.id) {
          state.categories[i] = action.payload;
          return { ...state, categories: [...state.categories] };
        }
      }

    case DELETE_CATEGORY:
      const newCategories = state.categories.filter(
        (category) => category.id !== action.payload
      );

      return { ...state, categories: newCategories };

    default:
      return state;
  }
};

export default categoryReducer;
