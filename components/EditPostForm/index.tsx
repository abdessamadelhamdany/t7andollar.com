import dynamic from 'next/dynamic';
import { debounce } from 'lodash';
import { updatedDiff } from 'deep-object-diff';
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
import { PostForm } from 'store/interfaces';

const Quill = dynamic(() => import('@/components/Quill'), {
  ssr: false,
});

const EditPostForm = () => {
  const [autoSaveTracker, setAutoSaveTracker] = useState<NodeJS.Timeout>();
  const {
    postForm,
    post,
    categories,
    tags,
    setPostFormField,
    savePostFormChanges,
  } = usePost();

  // Autosave after 5s when no changes and onAutoSave was provided
  useEffect(() => {
    autoSaveTracker && clearTimeout(autoSaveTracker);
    setAutoSaveTracker(
      setTimeout(async () => {
        await savePost();
      }, 5000)
    );
  }, [postForm]);

  const savePost = async () => {
    const data: Partial<PostForm> = updatedDiff(post, postForm);
    if (!post.id || Object.keys(data).length === 0) {
      return;
    }

    return savePostFormChanges(post.id, data);
  };

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          autoSaveTracker && clearTimeout(autoSaveTracker);
          await savePost();
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
                  setPostFormField({ published: false });
                  autoSaveTracker && clearTimeout(autoSaveTracker);
                  await savePost();
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
                  setPostFormField({ published: true });
                  autoSaveTracker && clearTimeout(autoSaveTracker);
                  await savePost();
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
            uploadUrl="/api/upload/photo"
            onPhotoUploaded={(uploadedPhoto) => {
              console.log('uploaded:', uploadedPhoto);
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

          {tags.length > 0 && (
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
