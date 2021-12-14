import React from 'react';
import Link from 'next/link';

const AppNavbar = () => {
  return (
    <>
      <nav className="app-navbar bg-white border-bottom border-gray">
        <div className="container ">
          <Link href="/app/posts/new">
            <a>
              <i className="fa fa-plus" aria-hidden="true"></i>
              مقال جديد
            </a>
          </Link>
        </div>
      </nav>
      <style jsx>
        {`
          .app-navbar {
            position: sticky;
            top: 69.75px;
            padding: 0.5rem 1rem;
            border-top: 5px solid #ededed !important;
          }
          .app-navbar .fa-plus {
            margin-left: 0.5rem;
          }
        `}
      </style>
    </>
  );
};

export default AppNavbar;
