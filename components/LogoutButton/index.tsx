import router from 'next/router';
import React, { MouseEvent } from 'react';
import { useUser } from 'store/hooks';

const LogoutButton = () => {
  const { logout } = useUser();

  const handleLogout = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await logout();
    } catch (error) {
      console.error(error);
    }

    await router.push('/');
  };

  return (
    <>
      <button type="button" onClick={handleLogout}>
        الخروج
      </button>
      <style jsx>
        {`
          button {
            padding: 0.25rem 1rem;
            font-size: 0.875rem;
            transition: all 0.15s;
            border: 1px solid #5da731;
            color: rgb(255, 255, 255);
            background-color: #5da731;
            box-shadow: 0 0 4px -3px rgba(0, 0, 0, 0.62);
          }

          button:focus {
            outline: none;
          }

          button:focus,
          button:hover {
            color: #5da731;
            background-color: transparent;
            box-shadow: 0 0 4px -3px rgba(0, 0, 0, 0.92);
          }
        `}
      </style>
    </>
  );
};

export default LogoutButton;
