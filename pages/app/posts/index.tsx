import React, { useEffect } from 'react';
import { Post } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';
import AppLayout from '@/components/AppLayout';
import AppPostsNavbarNav from '@/components/PageNavbar/AppPostsNavbarNav';
import AppPostsList from '@/components/AppPostsList';
import AppPageTitle from '@/components/AppPageTitle';
import { usePost } from 'store/hooks';

interface Props extends ServerProps {}

const Posts: NextPage<Props> = ({ initialPosts }) => {
  const { posts, initializePosts } = usePost();

  useEffect(() => {
    initializePosts(initialPosts);
  }, []);

  return (
    <AppLayout pageNavbarNav={<AppPostsNavbarNav />}>
      <AppPageTitle>قائمة المقالات</AppPageTitle>

      <AppPostsList posts={posts} />
    </AppLayout>
  );
};

interface ServerProps {
  initialPosts: Post[];
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async () => {
  const res = await fetch(`${process.env.APP_URL}/api/posts`);
  const { data: initialPosts, error } = await res.json();

  if (error) {
    console.error(error);
    throw Error(error);
  }

  return {
    props: {
      initialPosts,
    },
  };
};

export default Posts;
