import React, { FC } from 'react';
import Link from 'next/link';

const index: FC = () => {
  return (
    <nav className="topnav navbar navbar-expand-lg navbar-light bg-white fixed-top">
      <div className="container">
        <Link href="/" passHref>
          <a className="navbar-brand">
            <img src="/images/brand/logo.png" alt="شعار طحن الدولار" />
          </a>
        </Link>
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="navbarColor02">
          <ul className="navbar-nav mr-auto d-flex align-items-center">
            <li className="nav-item">
              <Link href="/category/freelancing" passHref>
                <a className="nav-link active">العمل على الانترنت</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/category/make-money-online" passHref>
                <a className="nav-link">ربح المال من الانترنت</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/category/search-engine-optimization" passHref>
                <a className="nav-link">تحسين محركات البحث</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/category/how-to-make-websites" passHref>
                <a className="nav-link">انشاء المواقع الالكترونية</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/category/latest-tech-news" passHref>
                <a className="nav-link">أخبار تقنية</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about" passHref>
                <a className="nav-link">من نحن؟</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default index;
