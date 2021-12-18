import { useDispatch, useSelector } from 'react-redux';
import {
  DELETE_CATEGORY,
  INITIALIZE_CATEGORIES,
  INITIALIZE_CATEGORY_FORM,
  SET_CATEGORY_FORM_FIELD,
  UPDATE_CATEGORY,
} from 'store/types';
import { AppState, CategoryForm } from 'store/interfaces';
import { Category } from '@prisma/client';

export const useCategory = () => {
  const dispatch = useDispatch();
  const { categoryForm, categories } = useSelector(
    ({ category }: AppState) => category
  );

  const initializeCategories = (categories: Category[]) => {
    dispatch({ type: INITIALIZE_CATEGORIES, payload: categories });
  };

  const initializeCategoryForm = (categoryForm: CategoryForm) => {
    dispatch({ type: INITIALIZE_CATEGORY_FORM, payload: categoryForm });
  };

  const createNewCategory = async () => {
    return new Promise<void>(async (resolve, reject) => {
      const { name, slug } = categoryForm;

      const res = await fetch(`/api/categories/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name, slug }),
      });
      const { data: category, error } = await res.json();

      console.log('createNewCategory:', category);

      if (error) {
        console.error(error);
        reject(Error(error));
        return;
      }

      resolve(category);
    });
  };

  const setCategoryFormField = (categoryFormPartial: Partial<CategoryForm>) => {
    dispatch({ type: SET_CATEGORY_FORM_FIELD, payload: categoryFormPartial });
  };

  const updateCategory = async () => {
    return new Promise<void>(async (resolve, reject) => {
      const { id, name, slug } = categoryForm;

      if (!id) {
        console.warn('ignored: no id was provided');
        return;
      }

      const res = await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name, slug }),
      });
      const { data: updatedCategory, error } = await res.json();

      console.log('updateCategory:', updatedCategory);

      if (error) {
        console.error(error);
        reject(Error(error));
        return;
      }

      dispatch({ type: UPDATE_CATEGORY, payload: updatedCategory });
      resolve(updatedCategory);
    });
  };

  const deleteCategory = async (id: number) => {
    return new Promise<void>(async (resolve, reject) => {
      if (!id) {
        console.warn('ignored: no id was provided');
        return;
      }

      if (!confirm('هل انت متأكد؟')) {
        console.warn('delete operation aborted');
        return;
      }

      const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const { data: deletedCategory, error } = await res.json();

      console.log('deleteCategory:', deletedCategory);

      if (error) {
        console.error(error);
        reject(Error(error));
        return;
      }

      dispatch({ type: DELETE_CATEGORY, payload: id });
      resolve(deletedCategory);
    });
  };

  return {
    categoryForm,
    categories,
    initializeCategories,
    initializeCategoryForm,
    createNewCategory,
    setCategoryFormField,
    updateCategory,
    deleteCategory,
  };
};
