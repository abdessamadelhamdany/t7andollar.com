import React, { FC, ReactNode } from 'react';
import AppNavbar from '@/components/AppNavbar';
import PageNavbar from '@/components/PageNavbar';
import { useUser } from 'store/hooks';

interface Props {
  pageNavbarNav?: ReactNode;
}

const AppLayout: FC<Props> = ({ children, pageNavbarNav }) => {
  const { authUser } = useUser();

  return (
    <>
      <div className="app-layout">
        {authUser && <AppNavbar />}

        <div className="container">
          {pageNavbarNav && <PageNavbar>{pageNavbarNav}</PageNavbar>}
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
