import { Tag } from '@prisma/client';
import { useDispatch, useSelector } from 'react-redux';
import {
  DELETE_TAG,
  INITIALIZE_TAGS,
  INITIALIZE_TAG_FORM,
  SET_TAG_FORM_FIELD,
  UPDATE_TAG,
} from 'store/types';
import { AppState, TagForm } from 'store/interfaces';

export const useTag = () => {
  const dispatch = useDispatch();
  const { tagForm, tags } = useSelector(({ tag }: AppState) => tag);

  const initializeTags = (tags: Tag[]) => {
    dispatch({ type: INITIALIZE_TAGS, payload: tags });
  };

  const initializeTagForm = (tagForm: TagForm) => {
    dispatch({ type: INITIALIZE_TAG_FORM, payload: tagForm });
  };

  const createNewTag = async () => {
    return new Promise<void>(async (resolve, reject) => {
      const { name, slug } = tagForm;

      const res = await fetch(`/api/tags/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name, slug }),
      });
      const { data: tag, error } = await res.json();

      console.log('createNewTag:', tag);

      if (error) {
        console.error(error);
        reject(Error(error));
        return;
      }

      resolve(tag);
    });
  };

  const setTagFormField = (tagFormPartial: Partial<TagForm>) => {
    dispatch({ type: SET_TAG_FORM_FIELD, payload: tagFormPartial });
  };

  const updateTag = async () => {
    return new Promise<void>(async (resolve, reject) => {
      const { id, name, slug } = tagForm;

      if (!id) {
        console.warn('ignored: no id was provided');
        return;
      }

      const res = await fetch(`/api/tags/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name, slug }),
      });
      const { data: updatedTag, error } = await res.json();

      console.log('updateTag:', updatedTag);

      if (error) {
        console.error(error);
        reject(Error(error));
        return;
      }

      dispatch({ type: UPDATE_TAG, payload: updatedTag });
      resolve(updatedTag);
    });
  };

  const deleteTag = async (id: number) => {
    return new Promise<void>(async (resolve, reject) => {
      if (!id) {
        console.warn('ignored: no id was provided');
        return;
      }

      if (!confirm('هل انت متأكد؟')) {
        console.warn('delete operation aborted');
        return;
      }

      const res = await fetch(`/api/tags/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const { data: deletedTag, error } = await res.json();

      console.log('deleteTag:', deletedTag);

      if (error) {
        console.error(error);
        reject(Error(error));
        return;
      }

      dispatch({ type: DELETE_TAG, payload: id });
      resolve(deletedTag);
    });
  };

  return {
    tagForm,
    tags,
    initializeTags,
    initializeTagForm,
    createNewTag,
    setTagFormField,
    updateTag,
    deleteTag,
  };
};
