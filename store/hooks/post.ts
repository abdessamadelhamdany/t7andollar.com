import { useDispatch, useSelector } from 'react-redux';
import {
  INITIALIZE_POST_STATE,
  SET_POST_FORM_FIELD,
  UPDATE_POST,
} from 'store/types';
import { AppState, InitialPostState, PostForm } from 'store/interfaces';

export const usePost = () => {
  const dispatch = useDispatch();
  const { post, postForm, categories, tags } = useSelector(
    ({ post }: AppState) => post
  );

  const initializePostSate = (initialState: InitialPostState) => {
    dispatch({ type: INITIALIZE_POST_STATE, payload: initialState });
  };

  const setPostFormField = (postFormPartial: Partial<PostForm>) => {
    dispatch({ type: SET_POST_FORM_FIELD, payload: postFormPartial });
  };

  const savePostFormChanges = async (id: number, data: Partial<PostForm>) => {
    return new Promise<void>(async (resolve, reject) => {
      if (!id) {
        console.warn('ignored: no id was provided');
        return;
      }

      const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      const { data: updatedPost, error } = await res.json();

      console.log({ updatedPost });

      if (error) {
        console.error(error);
        reject(Error(error));
        return;
      }

      dispatch({ type: UPDATE_POST, payload: updatedPost });
      resolve(updatedPost);
    });

    console.log({ data });
  };

  return {
    post,
    postForm,
    categories,
    tags,
    initializePostSate,
    setPostFormField,
    savePostFormChanges,
  };
};
