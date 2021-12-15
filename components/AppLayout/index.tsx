import React, { FC, ReactNode } from 'react';
import AppNavbar from '@/components/AppNavbar';
import PageNavbar from '@/components/PageNavbar';

interface Props {
  pageNavbarNav: ReactNode;
}

const AppLayout: FC<Props> = ({ children, pageNavbarNav }) => {
  return (
    <>
      <div className="app-layout">
        <AppNavbar />

        <div className="container">
          <PageNavbar>{pageNavbarNav}</PageNavbar>
          {children}
        </div>
      </div>

      <style jsx>
        {`
          .app-layout {
            min-height: 100vh;
            background: #ededed;
          }
        `}
      </style>
    </>
  );
};

export default AppLayout;
