import React from 'react';
import dynamic from 'next/dynamic';
import Slug from '@/components/Slug';
import Input from '@/components/Input';
import FormBody from '@/components/FormBody';
import FormHeader from '@/components/FormHeader';
import FormAction from '@/components/FormAction';
import { usePost } from 'store/hooks';
import { debounce } from 'lodash';
import TextArea from '@/components/TextArea';
import Label from '@/components/Label';
import PhotoUploader from '@/components/PhotoUploader';

const Quill = dynamic(() => import('@/components/Quill'), {
  ssr: false,
});

const EditPostForm = () => {
  const { postForm, setPostFormField, savePostFormChanges } = usePost();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        savePostFormChanges();
      }}
    >
      <FormHeader>
        <div>
          <FormAction type="button">حفظ</FormAction>
        </div>
        <div>
          {postForm.published ? (
            <FormAction type="button" variant="accent">
              العودة إلى المسودة
            </FormAction>
          ) : (
            <FormAction type="button" variant="accent">
              نشر
            </FormAction>
          )}
        </div>
      </FormHeader>

      <FormBody>
        <Slug
          title={postForm.title}
          visible={false}
          onChange={debounce((slug) => {
            setPostFormField({ slug });
          }, 500)}
        />

        <Label htmlFor="title">العنوان</Label>
        <Input
          id="title"
          type="text"
          value={postForm.title || ''}
          onChange={({ target: { value } }) => {
            setPostFormField({ title: value });
          }}
          placeholder="العنوان"
        />

        <Label>المحتوى</Label>
        <Quill
          placeholder="المحتوى"
          content={postForm.body || ''}
          setContent={(content) => setPostFormField({ body: content })}
        />

        <Label htmlFor="thumbnail">الصورة المصغرة</Label>
        <PhotoUploader
          id="thumbnail"
          uploadUrl="/api/upload/photo"
          onPhotoUploaded={(url) => {
            console.log('uploaded:', url);
          }}
        />

        <Label htmlFor="excerpt">المقتبس</Label>
        <TextArea
          id="excerpt"
          rows={3}
          value={postForm.excerpt || ''}
          onChange={({ target: { value } }) => {
            setPostFormField({ excerpt: value });
          }}
          placeholder="المقتبس"
        />

        <Label htmlFor="keywords">الكلمات المفتاحية</Label>
        <Label htmlFor="tags">الكلمات الدالية</Label>
        <Label htmlFor="categories">التصنيفات</Label>
      </FormBody>
    </form>
  );
};

export default EditPostForm;
