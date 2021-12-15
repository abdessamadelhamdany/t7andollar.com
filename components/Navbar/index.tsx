import Link from 'next/link';
import React, { FC } from 'react';
import { useUser } from 'store/hooks';
import LogoutButton from '@/components/LogoutButton';

const Navbar: FC = () => {
  const { authUser } = useUser();

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
              <Link href="/category/freelancing">
                <a className="nav-link active">العمل على الانترنت</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/category/make-money-online">
                <a className="nav-link">ربح المال من الانترنت</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/category/search-engine-optimization">
                <a className="nav-link">تحسين محركات البحث</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/category/how-to-make-websites">
                <a className="nav-link">انشاء المواقع الالكترونية</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/category/latest-tech-news">
                <a className="nav-link">أخبار تقنية</a>
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
