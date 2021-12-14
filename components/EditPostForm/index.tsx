import React from 'react';
import dynamic from 'next/dynamic';
import Slug from '@/components/Slug';
import Input from '@/components/Input';
import FormBody from '@/components/FormBody';
import FormHeader from '@/components/FormHeader';
import FormSubmit from '@/components/FormSubmit';
import { usePost } from 'store/hooks';
import { debounce } from 'lodash';

const Quill = dynamic(() => import('@/components/Quill'), {
  ssr: false,
});

const EditPostForm = () => {
  const { postForm, setPostFormField, savePostFormChanges } = usePost();

  return (
    <form
      onSubmit={async () => {
        // const data = parseForm(e);
        await savePostFormChanges();
        console.log('saved');
      }}
    >
      <FormBody>
        <Input
          type="text"
          name="title"
          value={postForm.title}
          onChange={({ target: { value } }) => {
            setPostFormField({ title: value });
          }}
          placeholder="العنوان"
        />

        <Slug
          title={postForm.title}
          onChange={debounce((slug) => {
            setPostFormField({ slug });
          }, 500)}
        />

        <Quill
          content={postForm.body || ''}
          setContent={(content) => setPostFormField({ body: content })}
        />
      </FormBody>

      <FormHeader>
        <FormSubmit>حفظ</FormSubmit>
      </FormHeader>
    </form>
  );
};

export default EditPostForm;
