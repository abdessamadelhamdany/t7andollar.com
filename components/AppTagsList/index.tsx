import React, { FC } from 'react';
import AppTag from './AppTag';
import { Tag } from '@prisma/client';

interface Props {
  tags: Tag[];
}

const AppTagsList: FC<Props> = ({ tags }) => {
  return (
    <>
      <div className="app-tags-list">
        {tags.map((tag) => (
          <AppTag key={tag.id} tag={tag} />
        ))}
      </div>
      <style jsx>{`
        .app-tags-list {
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: 0.25rem;
        }
      `}</style>
    </>
  );
};

export default AppTagsList;
