import React from 'react';
import Link from 'next/link';

const PageNavbar = () => {
  return (
    <>
      <nav className="page-navbar bg-white border-bottom border-gray">
        <div className="page-navbar-nav">
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
          .page-navbar {
            padding: 0.5rem 1rem;
            border-top: 5px solid #ededed !important;
            z-index: 10;
          }
          .page-navbar .fa-plus {
            margin-left: 0.5rem;
          }
          .page-navbar-nav {
            display: flex;
            align-items: center;
            column-gap: 1rem;
            flex-wrap: wrap;
          }
          .page-navbar a {
            font-size: 0.875rem;
          }
          .page-navbar a:hover,
          .page-navbar a.active {
            text-decoration: none;
            border-bottom: 2px solid;
          }
        `}
      </style>
    </>
  );
};

export default PageNavbar;
