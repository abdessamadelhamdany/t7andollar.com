import React from 'react';
import { Post } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';
import AppLayout from '@/components/AppLayout';
import AppPostsNavbarNav from '@/components/PageNavbar/AppPostsNavbarNav';
import AppPostsList from '@/components/AppPostsList';
import AppPageTitle from '@/components/AppPageTitle';

interface Props extends ServerProps {}

const Posts: NextPage<Props> = ({ posts }) => {
  return (
    <AppLayout pageNavbarNav={<AppPostsNavbarNav />}>
      <AppPageTitle>قائمة المقالات</AppPageTitle>

      <AppPostsList posts={posts} />
    </AppLayout>
  );
};

interface ServerProps {
  posts: Post[];
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async ({
  params,
}) => {
  const res = await fetch(`${process.env.APP_URL}/api/posts`);
  const { data: posts, error } = await res.json();

  if (error) {
    console.error(error);
    throw Error(error);
  }

  return {
    props: {
      posts,
    },
  };
};

export default Posts;
