import React from 'react';
import Link from 'next/link';

const AppPostsNavbarNav = () => {
  return (
    <>
      <Link href="/app/posts/new">
        <a>
          <i className="fa fa-plus" aria-hidden="true"></i>
          مقال جديد
        </a>
      </Link>
      <style jsx>
        {`
          .fa-plus {
            margin-left: 0.5rem;
          }
          a {
            font-size: 0.875rem;
          }
          a:hover,
          a.active {
            text-decoration: none;
            border-bottom: 2px solid;
          }
        `}
      </style>
    </>
  );
};

export default AppPostsNavbarNav;
