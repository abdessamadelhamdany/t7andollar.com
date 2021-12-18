import React from 'react';
import { NextPage } from 'next';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { useTag, useUI } from 'store/hooks';
import AppLayout from '@/components/AppLayout';
import FormAction from '@/components/FormAction';
import FormHeader from '@/components/FormHeader';
import FormBody from '@/components/FormBody';
import Label from '@/components/Label';
import Input from '@/components/Input';
import Slug from '@/components/Slug';
import FormError from '@/components/FormError';

const NewTag: NextPage = () => {
  const router = useRouter();
  const { loading, error, setLoading, setError } = useUI();
  const { tagForm, setTagFormField, createNewTag } = useTag();

  return (
    <AppLayout>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setError('');
          setLoading(true);
          try {
            await createNewTag();
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

export default NewTag;
