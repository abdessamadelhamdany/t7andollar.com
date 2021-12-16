import { useDispatch, useSelector } from 'react-redux';
import {
  INITIALIZE_POST_DEPS,
  INITIALIZE_POST_FORM,
  SET_POST_FORM_FIELD,
} from 'store/types';
import { AppState, PostForm } from 'store/interfaces';
import { Category, Tag } from '@prisma/client';

export const usePost = () => {
  const dispatch = useDispatch();
  const { postForm, categories, tags } = useSelector(
    ({ post }: AppState) => post
  );

  const initializePostForm = (postForm: PostForm) => {
    dispatch({ type: INITIALIZE_POST_FORM, payload: postForm });
  };

  const setPostFormField = (postFormPartial: Partial<PostForm>) => {
    dispatch({ type: SET_POST_FORM_FIELD, payload: postFormPartial });
  };

  const saveEditorContent = async () => {};

  const savePostFormChanges = async () => {
    console.log('savePostFormChanges:', postForm.body);
  };

  const initializePostDeps = (categories: Category[], tags: Tag[]) => {
    dispatch({
      type: INITIALIZE_POST_DEPS,
      payload: {
        categories,
        tags,
      },
    });
  };
  return {
    postForm,
    categories,
    tags,
    initializePostForm,
    setPostFormField,
    savePostFormChanges,
    initializePostDeps,
  };
};
