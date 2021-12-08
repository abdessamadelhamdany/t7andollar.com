import React, { FC } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const index: FC = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default index;
