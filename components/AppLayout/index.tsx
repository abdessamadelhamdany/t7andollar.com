import React, { FC } from 'react';

const AppLayout: FC = ({ children }) => {
  return (
    <>
      <div className="app-layout">
        <div className="container">{children}</div>
      </div>

      <style jsx>
        {`
          .app-layout {
            min-height: 100vh;
            padding-top: 1rem;
            padding-bottom: 1rem;
            background: rgb(246, 246, 249);
          }
        `}
      </style>
    </>
  );
};

export default AppLayout;
