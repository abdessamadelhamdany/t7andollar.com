import { useDispatch, useSelector } from 'react-redux';
import { SET_LOADING } from 'store/types';
import { AppState } from 'store/interfaces';

export const useUI = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(({ ui }: AppState) => ui);

  const setLoading = (loading: boolean) => {
    dispatch({ type: SET_LOADING, payload: loading });
  };

  return {
    loading,
    setLoading,
  };
};
