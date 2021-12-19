import React, { FC, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthUser } from 'store/interfaces';
import { useUser } from 'store/hooks';

const index: FC<{ authUser?: AuthUser }> = ({ children, authUser }) => {
  const { initializeAuthUser } = useUser();

  useEffect(() => {
    if (authUser) {
      initializeAuthUser(authUser);
    }
  }, []);

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default index;
