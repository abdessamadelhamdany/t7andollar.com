import React, { FC } from 'react';

const AppLayout: FC = ({ children }) => {
  return (
    <>
      <div className="app-posts container">{children}</div>
      <style jsx>
        {`
          .app-posts {
            min-height: 100vh;
            padding-top: 1rem;
            padding-bottom: 1rem;
          }
        `}
      </style>
    </>
  );
};

export default AppLayout;
