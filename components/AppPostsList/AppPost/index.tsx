import Link from 'next/link';
import React, { FC } from 'react';
import { TrashIcon, PencilIcon } from '@heroicons/react/solid';
import { usePost } from 'store/hooks';
import { Post } from 'store/interfaces';

interface Props {
  post: Post;
}

const AppPost: FC<Props> = ({ post }) => {
  const { deletePost } = usePost();

  return (
    <>
      <div className="app-post">
        <h3 className="app-post-title">
          {post.title || 'هذه المقالة ليس لها على عنوان'}
        </h3>
        <div className="app-post-actions">
          <Link href={`/app/posts/${post.id}`}>
            <a className="app-post-edit-action" key={post.id}>
              <PencilIcon height={18} />
            </a>
          </Link>
          <a
            href="#"
            className="app-post-delete-action"
            onClick={async (e) => {
              e.preventDefault();
              await deletePost(post.id);
            }}
          >
            <TrashIcon height={18} />
          </a>
        </div>
      </div>
      <style jsx>{`
        .app-post {
          display: flex;
          align-items: center;
          background-color: white;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
        }

        .app-post-title {
          margin: 0;
          font-size: 1rem;
        }

        .app-post-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-right: auto;
        }

        .app-post-delete-action,
        .app-post-edit-action {
          display: block;
        }

        .app-post-delete-action {
          color: #ea2f65;
        }

        .app-post-delete-action:hover,
        .app-post-edit-action:hover {
          color: #222222;
        }
      `}</style>
    </>
  );
};

export default AppPost;
