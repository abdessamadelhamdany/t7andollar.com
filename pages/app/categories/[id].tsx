import React, { useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { CategoryForm } from 'store/interfaces';
import AppLayout from '@/components/AppLayout';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { useCategory, useUI } from 'store/hooks';
import FormAction from '@/components/FormAction';
import FormHeader from '@/components/FormHeader';
import FormBody from '@/components/FormBody';
import Label from '@/components/Label';
import Input from '@/components/Input';
import Slug from '@/components/Slug';
import FormError from '@/components/FormError';

interface Props extends ServerProps {}

const EditCategory: NextPage<Props> = ({ category }) => {
  const router = useRouter();
  const { loading, error, setLoading, setError } = useUI();
  const {
    categoryForm,
    initializeCategoryForm,
    setCategoryFormField,
    updateCategory,
  } = useCategory();

  useEffect(() => {
    initializeCategoryForm(category);
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
            await updateCategory();
            await router.push('/app/categories');
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
            title={categoryForm.name}
            visible={false}
            onChange={debounce((slug) => {
              setCategoryFormField({ slug });
            }, 500)}
          />

          <Label htmlFor="name">الاسم</Label>
          <Input
            id="name"
            type="text"
            value={categoryForm.name}
            onChange={({ target: { value } }) => {
              setCategoryFormField({ name: value });
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
  category: CategoryForm;
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async ({
  params,
}) => {
  const res = await fetch(
    `${process.env.APP_URL}/api/categories/${params?.id}`
  );
  const { data: category, error } = await res.json();

  if (error) {
    console.error(error);
    throw Error(error);
  }

  return {
    props: {
      category,
    },
  };
};

export default EditCategory;
