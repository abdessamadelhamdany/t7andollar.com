import Link from 'next/link';
import React, { FC } from 'react';
import { useUser } from 'store/hooks';
import LogoutButton from '@/components/LogoutButton';
import { useRouter } from 'next/router';

const Navbar: FC = () => {
  const { authUser } = useUser();
  const router = useRouter();

  const activeLinkClasses = (href: string) => {
    let classes = ['nav-link'];

    if (router.asPath === href) {
      classes.push('active');
    }

    return classes.join(' ');
  };

  return (
    <nav className="topnav navbar navbar-expand-lg navbar-light bg-white fixed-top border-bottom border-gray">
      <div className="container">
        <Link href="/">
          <a className="navbar-brand">
            <img src="/images/brand/logo.png" alt="شعار طحن الدولار" />
          </a>
        </Link>

        <button
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
        <div className="navbar-collapse collapse" id="main-navbar">
          <ul className="navbar-nav mr-auto d-flex align-items-center">
            <li className="nav-item">
              <Link href="/category/جني-المال-من-الإنترنت">
                <a
                  className={activeLinkClasses(
                    '/category/جني-المال-من-الإنترنت'
                  )}
                >
                  جني المال من الإنترنت
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/category/تحسين-محركات-البحث">
                <a
                  className={activeLinkClasses('/category/تحسين-محركات-البحث')}
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
                >
                  انشاء المواقع الالكترونية
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/category/أخبار-تقنية">
                <a className={activeLinkClasses('/category/أخبار-تقنية')}>
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
  );
};

export default Navbar;
