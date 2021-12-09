import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React, { FormEvent } from 'react';
import Input from '@/components/Input';
import FormBody from '@/components/FormBody';
import AppLayout from '@/components/AppLayout';
import FormHeader from '@/components/FormHeader';
import FormSubmit from '@/components/FormSubmit';
import { parseForm } from 'lib/helpers';

const RichText = dynamic(() => import('@/components/RichText/RichText'), {
  ssr: false,
});

interface Props {
  post: {
    id: number;
  };
}

const EditPost: NextPage<Props> = ({ post }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = parseForm(e);
    // TODO: save data
  };

  console.log('post', post);

  return (
    <AppLayout>
      <form onSubmit={handleSubmit}>
        <FormHeader>
          <FormSubmit>حفظ</FormSubmit>
        </FormHeader>

        <FormBody>
          <Input type="text" name="title" placeholder="العنوان" />
          <RichText dir="RTL" />
        </FormBody>
      </form>
    </AppLayout>
  );
};

export async function getStaticProps({ params }) {
  if (params.id === 'new') {
    const newPost = { id: 1 };

    // TODO: create new post, and redirect to post detail

    return {
      redirect: {
        destination: `/app/posts/${newPost.id}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      post: {
        id: 1,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = [{ id: '1' }, { id: '2' }].concat({ id: 'new' });
  const paths = posts.map(({ id }) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default EditPost;
