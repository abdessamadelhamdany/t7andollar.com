import React, { FC } from 'react';
import AppNavbar from '@/components/AppNavbar';

const AppLayout: FC = ({ children }) => {
  return (
    <>
      <div className="app-layout">
        <AppNavbar />
        <div className="container">{children}</div>
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
