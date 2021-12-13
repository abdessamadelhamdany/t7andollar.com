import dynamic from 'next/dynamic';
import React, { FormEvent, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Input from '@/components/Input';
import FormBody from '@/components/FormBody';
import AppLayout from '@/components/AppLayout';
import FormHeader from '@/components/FormHeader';
import FormSubmit from '@/components/FormSubmit';
import { parseForm } from 'lib/helpers';

const RichText = dynamic(() => import('@/components/RichText'), {
  ssr: false,
});

interface Props extends ServerProps {}

const EditPost: NextPage<Props> = ({ post }) => {
  const [body, setBody] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = parseForm(e);
    data.body = body;

    console.log(data);

    // TODO: save data
  };

  return (
    <AppLayout>
      <form onSubmit={handleSubmit}>
        <FormHeader>
          <FormSubmit>حفظ</FormSubmit>
        </FormHeader>

        <FormBody>
          <Input
            type="text"
            name="title"
            defaultValue={post.title}
            placeholder="العنوان"
          />
          <RichText
            dir="RTL"
            initialHTML="<p>مرحبا بكم بجوجل</p>"
            onChange={(content) => setBody(content)}
          />
        </FormBody>
      </form>
    </AppLayout>
  );
};

interface ServerProps {
  post: any;
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
