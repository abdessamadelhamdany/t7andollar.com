import React, { FC } from 'react';
import AppPost from './AppPost';
import { Post } from '@prisma/client';

interface Props {
  posts: Post[];
}

const AppPostsList: FC<Props> = ({ posts }) => {
  return (
    <>
      <div className="app-posts-list">
        {posts.map((post) => (
          <AppPost key={post.id} post={post} />
        ))}
      </div>
      <style jsx>{`
        .app-posts-list {
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: 0.25rem;
        }
      `}</style>
    </>
  );
};

export default AppPostsList;
