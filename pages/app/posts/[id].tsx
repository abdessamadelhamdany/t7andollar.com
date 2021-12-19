import React, { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { usePost } from 'store/hooks';
import { InitialPostState, PostForm } from 'store/interfaces';
import AppLayout from '@/components/AppLayout';
import EditPostForm from '@/components/EditPostForm';

interface Props extends ServerProps {}

const EditPost: NextPage<Props> = ({ initialState }) => {
  const { postForm, initializePostState } = usePost();

  useEffect(() => {
    initializePostState(initialState);
  }, []);

  return <AppLayout>{!!postForm.id ? <EditPostForm /> : null}</AppLayout>;
};

interface ServerProps {
  initialState: InitialPostState;
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async ({
  params,
}) => {
  const postRes = await fetch(`${process.env.APP_URL}/api/posts/${params?.id}`);
  const { data: post, error: postError } = await postRes.json();

  const categoriesRes = await fetch(`${process.env.APP_URL}/api/categories`);
  const { data: categories, error: categoriesError } =
    await categoriesRes.json();

  const tagsRes = await fetch(`${process.env.APP_URL}/api/tags`);
  const { data: tags, error: tagsError } = await tagsRes.json();

  if (postError || categoriesError | tagsError) {
    const error = `
    postError: ${postError}
    categoriesError: ${categoriesError}
    tagsError: ${tagsError}
    `;
    console.error(error);
    throw Error(error);
  }

  return {
    props: {
      initialState: {
        post,
        categories,
        tags,
      },
    },
  };
};

export default EditPost;
