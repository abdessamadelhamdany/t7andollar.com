import Link from 'next/link';
import React, { FC, MouseEvent } from 'react';
import { Category } from '@prisma/client';
import { TrashIcon, PencilIcon } from '@heroicons/react/solid';
import { useCategory, useUI } from 'store/hooks';

interface Props {
  category: Category;
}

const AppCategory: FC<Props> = ({ category }) => {
  const { deleteCategory } = useCategory();
  const { loading, error, setLoading, setError } = useUI();

  const removeCategory = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await deleteCategory(category.id);
    } catch (error: any) {
      console.error(error);
      setError(
        {
          'Bad Request': 'المرجو التأكد من معلوماتكم',
        }[error.message]
      );
    }
    setLoading(false);
    console.log('delete:', category.id);
  };

  return (
    <>
      <div className="app-category">
        <h3 className="app-category-title">{category.name}</h3>
        <div className="app-category-actions">
          <Link href={`/app/categories/${category.id}`}>
            <a className="app-category-edit-action" key={category.id}>
              <PencilIcon height={18} />
            </a>
          </Link>
          <a
            href="#"
            className="app-category-delete-action"
            onClick={removeCategory}
          >
            <TrashIcon height={18} />
          </a>
        </div>
      </div>
      <style jsx>{`
        .app-category {
          display: flex;
          align-items: center;
          background-color: white;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
        }

        .app-category-title {
          margin: 0;
          font-size: 1rem;
        }

        .app-category-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-right: auto;
        }

        .app-category-delete-action,
        .app-category-edit-action {
          display: block;
        }

        .app-category-delete-action {
          color: #ea2f65;
        }

        .app-category-delete-action:hover,
        .app-category-edit-action:hover {
          color: #222222;
        }
      `}</style>
    </>
  );
};

export default AppCategory;
