import React, { FC } from 'react';
import AppCategory from './AppCategory';
import { Category } from '@prisma/client';

interface Props {
  categories: Category[];
}

const AppCategoriesList: FC<Props> = ({ categories }) => {
  return (
    <>
      <div className="app-categories-list">
        {categories.map((category) => (
          <AppCategory key={category.id} category={category} />
        ))}
      </div>
      <style jsx>{`
        .app-categories-list {
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: 0.25rem;
        }
      `}</style>
    </>
  );
};

export default AppCategoriesList;
