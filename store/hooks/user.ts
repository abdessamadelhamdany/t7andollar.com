import { useDispatch, useSelector } from 'react-redux';
import { INITIALIZE_AUTH_USER } from 'store/types';
import { AppState, AuthUser } from 'store/interfaces';

export const useUser = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector(({ user }: AppState) => user);

  const login = (email: string, password: string, remember?: string) => {
    return new Promise<AuthUser>(async (resolve, reject) => {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, remember }),
      });
      const { data: authUser, error } = await res.json();

      if (error) {
        reject(
          Error(
            {
              Unauthorized: 'المعلومات غير صحيحة',
              'Not Found': 'المستخدم غير مسجل',
            }[error] || 'نعتذر حدث خطأ ما.'
          )
        );
        return;
      }

      initializeAuthUser(authUser);

      resolve(authUser);
    });
  };

  const logout = () => {
    return new Promise<void>(async (resolve, reject) => {
      const res = await fetch('/api/logout', { method: 'POST' });
      const { error } = await res.json();
      if (error) {
        reject(error);
        return;
      }

      initializeAuthUser(null);

      resolve();
    });
  };

  const initializeAuthUser = (payload: AuthUser | null) => {
    dispatch({ type: INITIALIZE_AUTH_USER, payload });
  };

  return {
    login,
    logout,
    initializeAuthUser,
    authUser,
  };
};
