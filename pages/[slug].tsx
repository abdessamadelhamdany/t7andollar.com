import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import type { GetServerSideProps, NextPage } from 'next';
import { Post } from 'store/interfaces';
import NextPost from '@/components/NextPost';
import AdPlaceholder from '@/components/AdPlaceholder';
import { formatDate, title } from 'lib/helpers';
import { ReasonPhrases } from 'http-status-codes';

const Article: NextPage<ServerProps> = ({ post, nextPosts }) => {
  if (post.createdAt) {
    console.log();
  }

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
            <div className="mt-4">
              <div className="text-muted text-center mb-3">شارك المقالة</div>
              <div className="sharethis-inline-share-buttons"></div>
            </div>
          </div>
          {/* <div className="col-lg-3 col-xl-4 mb-3">
            <AdPlaceholder width={224} height={600} />
          </div> */}
        </div>
      </div>

      {/* <div className="container py-4 mb-3">
        <div className="row">
          <div className="col-lg-12">
            <AdPlaceholder width={1170} height={280} />
          </div>
        </div>
      </div> */}

      {nextPosts.length > 0 && (
        <div className="container pt-4 pb-4">
          <h5 className="font-weight-bold spanborder">
            <span>اقرأ المزيد</span>
          </h5>
          <div className="row">
            {nextPosts.map((post) => (
              <NextPost key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

interface ServerProps {
  post: Post;
  nextPosts: Post[];
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async ({
  params,
}) => {
  const slug = params ? params.slug : '';

  const res = await fetch(
    encodeURI(`${process.env.APP_URL}/api/public/posts/${slug?.toString()}`)
  );
  const data = await res.json();

  if (data.error) {
    if (data.error === ReasonPhrases.NOT_FOUND) {
      return { notFound: true };
    }

    console.error(data.error);
    throw Error(data.error);
  }

  const post: Post = {
    ...data.data.post,
    createdAt: formatDate(data.data.post.createdAt),
  };

  const nextPosts: Post[] = data.data.nextPosts.map((post) => ({
    ...post,
    createdAt: formatDate(post.createdAt),
  }));

  return {
    props: {
      post,
      nextPosts,
    },
  };
};

export default Article;
