import Link from 'next/link';
import React, { FC, useEffect, useRef } from 'react';
import { useUser } from 'store/hooks';
import LogoutButton from '@/components/LogoutButton';
import { useRouter } from 'next/router';

const Navbar: FC = () => {
  const router = useRouter();
  const { authUser } = useUser();
  const navbarRef = useRef<HTMLDivElement>(null);
  const navbarTogglerRef = useRef<HTMLButtonElement>(null);

  const activeLinkClasses = (href: string) => {
    let classes = ['nav-link'];

    if (decodeURI(router.asPath) === href) {
      classes.push('active');
    }

    return classes.join(' ');
  };

  const hideNavbar = () => {
    const { innerWidth: width, innerHeight: height } = window;

    navbarRef.current?.classList.remove('show');
    navbarRef.current?.classList.add('collapsing');
    setTimeout(() => {
      navbarRef.current?.classList.remove('collapsing');
    }, 300);

    navbarTogglerRef.current?.setAttribute('aria-expanded', 'false');
  };

  return (
    <>
      <nav className="topnav navbar navbar-expand-lg navbar-light bg-white fixed-top border-bottom border-gray">
        <div className="container">
          <Link href="/">
            <a className="navbar-brand">
              <img src="/images/brand/logo.png" alt="شعار طحن الدولار" />
            </a>
          </Link>

          <button
            ref={navbarTogglerRef}
            className="navbar-toggler collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#main-navbar"
            aria-controls="main-navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            ref={navbarRef}
            className="navbar-collapse collapse"
            id="main-navbar"
          >
            <ul className="navbar-nav mr-auto d-flex align-items-center">
              <li className="nav-item">
                <Link href="/category/العمل-على-الإنترنت">
                  <a
                    className={activeLinkClasses(
                      '/category/العمل-على-الإنترنت'
                    )}
                    onClick={(e) => {
                      hideNavbar();
                    }}
                  >
                    العمل على الإنترنت
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/category/تحسين-محركات-البحث">
                  <a
                    className={activeLinkClasses(
                      '/category/تحسين-محركات-البحث'
                    )}
                    onClick={(e) => {
                      hideNavbar();
                    }}
                  >
                    تحسين محركات البحث
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/category/انشاء-المواقع-الالكترونية">
                  <a
                    className={activeLinkClasses(
                      '/category/انشاء-المواقع-الالكترونية'
                    )}
                    onClick={(e) => {
                      hideNavbar();
                    }}
                  >
                    انشاء المواقع الالكترونية
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/category/أخبار-تقنية">
                  <a
                    className={activeLinkClasses('/category/أخبار-تقنية')}
                    onClick={(e) => {
                      hideNavbar();
                    }}
                  >
                    أخبار تقنية
                  </a>
                </Link>
              </li>
              {authUser && (
                <li className="nav-item">
                  <LogoutButton />
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <style jsx>
        {`
          @media (min-width: 992px) {
            #main-navbar.collapsing.collapse:not(.show) {
              height: initial;
              overflow: initial;
            }

            #main-navbar.collapse:not(.show) {
              display: flex;
            }
          }
        `}
      </style>
    </>
  );
};

export default Navbar;
