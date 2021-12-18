import dynamic from 'next/dynamic';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { usePost } from 'store/hooks';
import Slug from '@/components/Slug';
import Label from '@/components/Label';
import Input from '@/components/Input';
import TextArea from '@/components/TextArea';
import FormBody from '@/components/FormBody';
import FormHeader from '@/components/FormHeader';
import FormAction from '@/components/FormAction';
import KeywordArea from '@/components/KeywordArea';
import PhotoUploader from '@/components/PhotoUploader';
import ManyRelationArea from '@/components/ManyRelationArea';

const Quill = dynamic(() => import('@/components/Quill'), {
  ssr: false,
});

const EditPostForm = () => {
  const [autoSaveTracker, setAutoSaveTracker] = useState<NodeJS.Timeout>();
  const { postForm, post, categories, tags, setPostFormField, updatePost } =
    usePost();

  // Autosave after 5s when no changes and onAutoSave was provided
  // useEffect(() => {
  //   autoSaveTracker && clearTimeout(autoSaveTracker);
  //   setAutoSaveTracker(
  //     setTimeout(async () => {
  //       console.log('auto save');
  //       await updatePost();
  //     }, 3000)
  //   );
  // }, [postForm]);

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await updatePost();
        }}
      >
        <FormHeader>
          <div>
            <FormAction type="submit">حفظ</FormAction>
          </div>
          <div>
            {postForm.published ? (
              <FormAction
                type="button"
                variant="accent"
                onClick={async (e) => {
                  e.preventDefault();
                  await updatePost({ published: false });
                }}
              >
                العودة إلى المسودة
              </FormAction>
            ) : (
              <FormAction
                type="button"
                variant="accent"
                onClick={async (e) => {
                  e.preventDefault();
                  await updatePost({ published: true });
                }}
              >
                نشر
              </FormAction>
            )}
          </div>
        </FormHeader>

        <FormBody>
          <Slug
            title={postForm.title || undefined}
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
            name="photo"
            value={postForm.thumbnail}
            uploadUrl="/api/upload/photo"
            onChange={(thumbnail) => {
              setPostFormField({ thumbnail });
            }}
          />

          <Label htmlFor="excerpt">المقتبس</Label>
          <TextArea
            id="excerpt"
            rows={3}
            placeholder="المقتبس"
            value={postForm.excerpt || ''}
            onChange={({ target: { value } }) => {
              setPostFormField({ excerpt: value });
            }}
          />

          <Label htmlFor="keywords">الكلمات المفتاحية</Label>
          <KeywordArea
            keywords={postForm.keywords}
            onChange={(keywords) => {
              setPostFormField({ keywords });
            }}
          />

          {tags.length > 0 && (
            <>
              <Label htmlFor="tags">الكلمات الدالية</Label>
              <ManyRelationArea
                options={tags}
                placeholder="الكلمات الدالية"
                selectedOptions={postForm.tags}
                selectedOptionsChange={(options) => {
                  const tagIds = options.map((opt) => opt.id);
                  setPostFormField({
                    tags: tags.filter((tag) => tagIds.includes(tag.id)),
                  });
                }}
              />
            </>
          )}

          {categories.length > 0 && (
            <>
              <Label htmlFor="categories">التصنيفات</Label>
              <ManyRelationArea
                options={categories}
                placeholder="التصنيفات"
                selectedOptions={postForm.categories}
                selectedOptionsChange={(options) => {
                  const categoryIds = options.map((opt) => opt.id);
                  setPostFormField({
                    categories: categories.filter((category) =>
                      categoryIds.includes(category.id)
                    ),
                  });
                }}
              />
            </>
          )}
        </FormBody>
      </form>
    </>
  );
};

export default EditPostForm;
