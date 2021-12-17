import { useDispatch, useSelector } from 'react-redux';
import { SET_LOADING, SET_ERROR } from 'store/types';
import { AppState } from 'store/interfaces';

export const useUI = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(({ ui }: AppState) => ui);

  const setError = (error: string) => {
    dispatch({ type: SET_ERROR, payload: error });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: SET_LOADING, payload: loading });
  };

  return {
    error,
    setError,
    loading,
    setLoading,
  };
};
