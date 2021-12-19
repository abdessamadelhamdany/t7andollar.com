import { diff } from 'deep-object-diff';
import { useDispatch, useSelector } from 'react-redux';
import {
  INITIALIZE_POSTS,
  INITIALIZE_POST_STATE,
  SET_POST_FORM_FIELD,
  UPDATE_POST,
  DELETE_POST,
} from 'store/types';
import { AppState, InitialPostState, Post, PostForm } from 'store/interfaces';

export const usePost = () => {
  const dispatch = useDispatch();
  const { post, posts, postForm, categories, tags } = useSelector(
    ({ post }: AppState) => post
  );

  const initializePosts = (initialPosts: Post[]) => {
    dispatch({ type: INITIALIZE_POSTS, payload: initialPosts });
  };

  const initializePostState = (initialState: InitialPostState) => {
    dispatch({ type: INITIALIZE_POST_STATE, payload: initialState });
  };

  const setPostFormField = (postFormPartial: Partial<PostForm>) => {
    dispatch({ type: SET_POST_FORM_FIELD, payload: postFormPartial });
  };

  const updatePost = async (customData?: Partial<PostForm>) => {
    return new Promise<void>(async (resolve, reject) => {
      const data: Partial<PostForm> = customData ?? diff(post, postForm);

      if (!post.id || Object.keys(data).length === 0) {
        console.warn('ignored: no id or data was provided');
        return;
      }

      if (data.keywords) {
        data.keywords = postForm.keywords;
      }

      if (data.tags) {
        data.tags = postForm.tags?.map((tag) => tag.id) as any;
      }

      if (data.categories) {
        data.categories = postForm.categories?.map(
          (category) => category.id
        ) as any;
      }

      const res = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      const { data: updatedPost, error } = await res.json();

      if (error) {
        console.error(error);
        reject(Error(error));
        return;
      }

      dispatch({ type: UPDATE_POST, payload: updatedPost });
      resolve(updatedPost);
    });
  };

  const deletePost = async (id: number) => {
    return new Promise<void>(async (resolve, reject) => {
      if (!id) {
        console.warn('ignored: no id was provided');
        return;
      }

      if (!confirm('هل انت متأكد؟')) {
        console.warn('delete operation aborted');
        return;
      }

      const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const { data: deletedPost, error } = await res.json();

      console.log('deletePost:', deletedPost);

      if (error) {
        console.error(error);
        reject(Error(error));
        return;
      }

      dispatch({ type: DELETE_POST, payload: id });
      resolve(deletedPost);
    });
  };

  return {
    post,
    posts,
    postForm,
    categories,
    tags,
    initializePosts,
    initializePostState,
    setPostFormField,
    updatePost,
    deletePost,
  };
};
