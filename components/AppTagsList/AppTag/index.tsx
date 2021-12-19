import Link from 'next/link';
import React, { FC, MouseEvent } from 'react';
import { Tag } from '@prisma/client';
import { TrashIcon, PencilIcon } from '@heroicons/react/solid';
import { useTag, useUI } from 'store/hooks';

interface Props {
  tag: Tag;
}

const AppTag: FC<Props> = ({ tag }) => {
  const { deleteTag } = useTag();
  const { loading, error, setLoading, setError } = useUI();

  const removeTag = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await deleteTag(tag.id);
    } catch (error: any) {
      console.error(error);
      setError(
        {
          'Bad Request': 'المرجو التأكد من معلوماتكم',
        }[error.message]
      );
    }
    setLoading(false);
    console.log('delete:', tag.id);
  };

  return (
    <>
      <div className="app-tag">
        <h3 className="app-tag-title">{tag.name}</h3>
        <div className="app-tag-actions">
          <Link href={`/app/tags/${tag.id}`}>
            <a className="app-tag-edit-action" key={tag.id}>
              <PencilIcon height={18} />
            </a>
          </Link>
          <a href="#" className="app-tag-delete-action" onClick={removeTag}>
            <TrashIcon height={18} />
          </a>
        </div>
      </div>
      <style jsx>{`
        .app-tag {
          display: flex;
          align-items: center;
          background-color: white;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
        }

        .app-tag-title {
          margin: 0;
          font-size: 1rem;
        }

        .app-tag-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-right: auto;
        }

        .app-tag-delete-action,
        .app-tag-edit-action {
          display: block;
        }

        .app-tag-delete-action {
          color: #ea2f65;
        }

        .app-tag-delete-action:hover,
        .app-tag-edit-action:hover {
          color: #222222;
        }
      `}</style>
    </>
  );
};

export default AppTag;
