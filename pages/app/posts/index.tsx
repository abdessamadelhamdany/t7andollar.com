import React, { useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import AppLayout from '@/components/AppLayout';
import AppPostsNavbarNav from '@/components/PageNavbar/AppPostsNavbarNav';
import AppPostsList from '@/components/AppPostsList';
import AppPageTitle from '@/components/AppPageTitle';
import { usePost } from 'store/hooks';
import { parseCookies } from '../../../lib/helpers';
import { Post } from '../../../store/interfaces';

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

export const getServerSideProps: GetServerSideProps<ServerProps> = async ({
  req,
}) => {
  const res = await fetch(`${process.env.APP_URL}/api/posts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: parseCookies({ ['jwt-token']: req.cookies['jwt-token'] }),
    },
  });
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
