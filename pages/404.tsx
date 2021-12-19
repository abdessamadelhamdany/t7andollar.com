import Head from 'next/head';
import type { NextPage } from 'next';
import { title } from 'lib/helpers';
import Link from 'next/link';

const NotFound: NextPage = () => {
  return (
    <>
      <Head>
        <title>
          {title('404 | عذرا، لم نستطع ايجاد الصفحة التي تبحث عنها.')}
        </title>
        <meta
          name="description"
          content="طحن الدولار هو موقع إلكتروني لتعلم طرق العمل على الإنترنت في شتى المجالات كما تعليم الأدوات مثل ووردبريس، بلوجر، تطوير مواقع الويب والعديد من المصادر التعليمية."
        />
      </Head>

      <div className="container">
        <div className="row py-6 justify-content-center align-items-center">
          <div className="col-md-8 py-6">
            <h1>404</h1>
            <h2>عذرا، لم نستطع ايجاد الصفحة التي تبحث عنها.</h2>
            <Link href="/">
              <a className="homepage-link">خذني إلى الصفحة الرئيسية</a>
            </Link>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          h1 {
            color: #03a87c;
            font-weight: 700;
          }
          .homepage-link {
            background-color: #03a87c;
            padding: 0.5rem 1rem;
            color: white;
            font-weight: 700;
            margin-top: 1rem;
            display: inline-block;
          }
        `}
      </style>
    </>
  );
};

export default NotFound;
