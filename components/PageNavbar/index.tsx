import React, { FC } from 'react';

const PageNavbar: FC = ({ children }) => {
  return (
    <>
      <nav className="page-navbar bg-white border-bottom border-gray">
        <div className="page-navbar-nav">{children}</div>
      </nav>
      <style jsx>
        {`
          .page-navbar {
            padding: 0.5rem 1rem;
            border-top: 5px solid #ededed !important;
            z-index: 10;
            margin-bottom: 1rem;
          }
          .page-navbar-nav {
            display: flex;
            align-items: center;
            column-gap: 1rem;
            flex-wrap: wrap;
          }
        `}
      </style>
    </>
  );
};

export default PageNavbar;
