import { useDispatch, useSelector } from 'react-redux';
import { INITIALIZE_POST_FORM, SET_POST_FORM_FIELD } from 'store/types';
import { AppState, PostForm } from 'store/interfaces';

export const usePost = () => {
  const dispatch = useDispatch();
  const { postForm } = useSelector(({ post }: AppState) => post);

  const initializePostForm = (postForm: PostForm) => {
    dispatch({ type: INITIALIZE_POST_FORM, payload: postForm });
  };

  const setPostFormField = (postFormPartial: Partial<PostForm>) => {
    dispatch({ type: SET_POST_FORM_FIELD, payload: postFormPartial });
  };

  const savePostFormChanges = async () => {
    console.log('savePostFormChanges:', postForm);
  };

  return {
    postForm,
    initializePostForm,
    setPostFormField,
    savePostFormChanges,
  };
};
