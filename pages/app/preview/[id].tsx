import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import type { GetServerSideProps, NextPage } from 'next';
import { Post } from 'store/interfaces';
import { parseCookies, title } from 'lib/helpers';

const Article: NextPage<ServerProps> = ({ post }) => {
  return (
    <>
      <Head>
        <title>{title(post.title)}</title>
        {post.keywords && post.keywords.length > 0 && (
          <meta name="keywords" content={post.keywords.join(', ')} />
        )}
        {post.excerpt && <meta name="description" content={post.excerpt} />}
      </Head>
      <div className="container">
        <div className="row mb-3 justify-content-center">
          <div className="col-12 py-4 align-self-center">
            {post.categories && (
              <p className="text-uppercase font-weight-bold">
                {post.categories.map((category) => (
                  <Link key={category.id} href={`/category/${category.slug}`}>
                    <a className="text-brand">{category.name}</a>
                  </Link>
                ))}
              </p>
            )}
            <h1 className="display-4 secondfont mb-3 font-weight-bold">
              {post.title}
            </h1>
            <div className="d-flex align-items-center">
              {post.author.image && (
                <img
                  className="rounded-circle ml-2"
                  src={post.author.image}
                  width="70"
                />
              )}
              <small>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  {post.author.name}
                </a>
                <span className="text-muted d-block">
                  {post.createdAt} &middot; {post.readingTime}
                </span>
              </small>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-9 col-xl-8">
            {post.thumbnail && (
              <img
                className="mb-3"
                src={post.thumbnail.replace('public', '')}
                alt={post.title || undefined}
                width="100%"
              />
            )}

            <article
              className="article-post"
              dangerouslySetInnerHTML={{ __html: post.body || '' }}
            ></article>
          </div>
        </div>
      </div>
    </>
  );
};

interface ServerProps {
  post: Post;
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async ({
  params,
  req,
}) => {
  const res = await fetch(
    `${process.env.APP_URL}/api/posts/preview/${params?.id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: parseCookies({ ['jwt-token']: req.cookies['jwt-token'] }),
      },
    }
  );
  const { data: post, error } = await res.json();

  if (error) {
    console.error(error);
    throw Error(error);
  }

  return {
    props: {
      post,
    },
  };
};

export default Article;
