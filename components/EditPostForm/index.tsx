import dynamic from 'next/dynamic';
import React, { FormEvent, useState } from 'react';
import Input from '@/components/Input';
import FormBody from '@/components/FormBody';
import FormHeader from '@/components/FormHeader';
import FormSubmit from '@/components/FormSubmit';
import { parseForm } from 'lib/helpers';
import { usePost } from 'store/hooks';

const Quill = dynamic(() => import('@/components/Quill'), {
  ssr: false,
});

const EditPostForm = () => {
  const { postForm, setPostFormField, savePostFormChanges } = usePost();

  console.log('EditPostForm', postForm);

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
          defaultValue={postForm.title}
          placeholder="العنوان"
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
