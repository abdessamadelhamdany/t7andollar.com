import React, { useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { usePost } from 'store/hooks';
import { PostForm } from 'store/interfaces';
import AppLayout from '@/components/AppLayout';
import EditPostForm from '@/components/EditPostForm';

interface Props extends ServerProps {}

const EditPost: NextPage<Props> = ({ post }) => {
  const { initializePostForm } = usePost();

  useEffect(() => {
    initializePostForm(post);
  }, []);

  return (
    <AppLayout>
      <EditPostForm />
    </AppLayout>
  );
};

interface ServerProps {
  post: PostForm;
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async ({
  params,
}) => {
  const res = await fetch(`${process.env.APP_URL}/api/posts/${params?.id}`);
  const { data: post, error } = await res.json();

  if (error) {
    console.log('error:', error);
    throw Error(error);
  }

  return {
    props: {
      post,
    },
  };
};

export default EditPost;
