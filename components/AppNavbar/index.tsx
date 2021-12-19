import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const AppNavbar = () => {
  const router = useRouter();

  return (
    <>
      <nav className="app-navbar bg-white border-bottom border-gray">
        <div className="container">
          <div className="app-navbar-nav">
            <Link href="/app/posts">
              <a className={router.asPath === '/app/posts' ? 'active' : ''}>
                المقالات
              </a>
            </Link>
            <Link href="/app/categories">
              <a
                className={router.asPath === '/app/categories' ? 'active' : ''}
              >
                التصنيفات
              </a>
            </Link>
            <Link href="/app/tags">
              <a className={router.asPath === '/app/tags' ? 'active' : ''}>
                الكلمات الدالية
              </a>
            </Link>
          </div>
        </div>
      </nav>
      <style jsx>
        {`
          .app-navbar {
            position: sticky;
            top: 69.75px;
            padding: 0.5rem 1rem;
            border-top: 5px solid #ededed !important;
            z-index: 20;
          }
          .app-navbar-nav {
            display: flex;
            align-items: center;
            column-gap: 1rem;
            flex-wrap: wrap;
          }
          .app-navbar a {
            border-bottom: 2px solid transparent;
          }
          .app-navbar a:hover,
          .app-navbar a.active {
            text-decoration: none;
            border-bottom: 2px solid;
          }
        `}
      </style>
    </>
  );
};

export default AppNavbar;
