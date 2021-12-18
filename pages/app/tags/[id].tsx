import React, { useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { TagForm } from 'store/interfaces';
import AppLayout from '@/components/AppLayout';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { useTag, useUI } from 'store/hooks';
import FormAction from '@/components/FormAction';
import FormHeader from '@/components/FormHeader';
import FormBody from '@/components/FormBody';
import Label from '@/components/Label';
import Input from '@/components/Input';
import Slug from '@/components/Slug';
import FormError from '@/components/FormError';

interface Props extends ServerProps {}

const EditTag: NextPage<Props> = ({ tag }) => {
  const router = useRouter();
  const { loading, error, setLoading, setError } = useUI();
  const { tagForm, initializeTagForm, setTagFormField, updateTag } = useTag();

  useEffect(() => {
    initializeTagForm(tag);
  }, []);

  return (
    <AppLayout>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (loading) {
            console.warn('same operation is in progress');
            return;
          }

          setError('');
          setLoading(true);
          try {
            await updateTag();
            await router.push('/app/tags');
          } catch (error: any) {
            setError(
              {
                'Bad Request': 'المرجو التأكد من معلوماتكم',
              }[error.message]
            );
          }
          setLoading(false);
        }}
      >
        <FormHeader>
          <div>
            <FormAction type="submit">حفظ</FormAction>
          </div>
        </FormHeader>

        <FormBody>
          <Slug
            title={tagForm.name}
            visible={false}
            onChange={debounce((slug) => {
              setTagFormField({ slug });
            }, 500)}
          />

          <Label htmlFor="name">الاسم</Label>
          <Input
            id="name"
            type="text"
            value={tagForm.name}
            onChange={({ target: { value } }) => {
              setTagFormField({ name: value });
            }}
            placeholder="الاسم"
          />

          {error && <FormError>{error}</FormError>}
        </FormBody>
      </form>
    </AppLayout>
  );
};

interface ServerProps {
  tag: TagForm;
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async ({
  params,
}) => {
  const res = await fetch(`${process.env.APP_URL}/api/tags/${params?.id}`);
  const { data: tag, error } = await res.json();

  if (error) {
    console.error(error);
    throw Error(error);
  }

  return {
    props: {
      tag,
    },
  };
};

export default EditTag;
