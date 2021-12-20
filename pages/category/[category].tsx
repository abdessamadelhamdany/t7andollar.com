import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import PostPreview from '@/components/PostPreview';
import FeaturedPost from '@/components/FeaturedPost';
import AdPlaceholder from '@/components/AdPlaceholder';
import { Post } from 'store/interfaces';
import prisma from 'lib/prisma';
import { formatDate } from 'lib/helpers';
import { Category } from '@prisma/client';

const Category: NextPage<ServerProps> = ({ featuredPost, category, posts }) => {
  return (
    <>
      {featuredPost && (
        <div className="container mt-3 homepage">
          <h5 className="font-weight-bold spanborder">
            <span>مميزة في {category.name}</span>
          </h5>
          <FeaturedPost post={featuredPost} />
        </div>
      )}

      {/* <div className="container py-4 mb-3">
        <div className="row">
          <div className="col-lg-12">
            <AdPlaceholder width={1170} height={280} />
          </div>
        </div>
      </div> */}

      <div className="container mt-3">
        <div className="row justify-content-between">
          <div className="col-md-12">
            <h5 className="font-weight-bold spanborder">
              <span>كل المقالات في {category.name}</span>
            </h5>

            {posts.length > 0 ? (
              posts.map((post) => <PostPreview key={post.id} post={post} />)
            ) : (
              <h3>لا توجد مقالات</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

interface ServerProps {
  posts: Post[];
  category: Category;
  featuredPost: Post | null;
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async ({
  params,
}) => {
  const category = params
    ? await prisma.category.findUnique({
        where: {
          slug: params.category?.toString(),
        },
      })
    : null;

  if (!category) {
    return { notFound: true };
  }

  let posts: Post[] = [],
    featuredPost: Post | null = null,
    res: Response,
    data: any;

  res = await fetch(
    encodeURI(
      `${process.env.APP_URL}/api/public/posts?category=${category.slug}`
    )
  );
  data = await res.json();

  if (data.error) {
    console.error(data.error);
    throw Error(data.error);
  }

  posts = data.data.map((post) => ({
    ...post,
    createdAt: formatDate(post.createdAt),
  }));

  res = await fetch(
    encodeURI(
      `${process.env.APP_URL}/api/public/posts/featured-at-home?category=${category.slug}`
    )
  );
  data = await res.json();

  if (data.error) {
    console.error(data.error);
    throw Error(data.error);
  }

  featuredPost = data.data
    ? {
        ...data.data,
        createdAt: formatDate(data.data.createdAt),
      }
    : null;

  return {
    props: {
      posts,
      category,
      featuredPost,
    },
  };
};

export default Category;
