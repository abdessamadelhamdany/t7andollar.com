import React from 'react';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/solid';

const AppPostsNavbarNav = () => {
  return (
    <>
      <Link href="/app/posts/new">
        <a>
          <span className="plus-icon">
            <PlusIcon height={18} />
          </span>
          مقال جديد
        </a>
      </Link>
      <style jsx>
        {`
          .plus-icon {
            margin-left: 0.5rem;
          }
          a {
            border-bottom: 2px solid transparent;
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
