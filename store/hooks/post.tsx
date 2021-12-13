import { useDispatch, useSelector } from 'react-redux';
import { INITIALIZE_POST_FORM } from 'store/types';
import { AppState, PostForm } from 'store/interfaces';

export const usePost = () => {
  const dispatch = useDispatch();
  const { postForm } = useSelector(({ post }: AppState) => post);

  const initializePostForm = async (payload: PostForm) => {
    dispatch({ type: INITIALIZE_POST_FORM, payload });
  };

  return {
    postForm,
    initializePostForm,
  };
};
