import Link from 'next/link';
import React, { FC } from 'react';
import { Post } from 'store/interfaces';

interface Props {
  post: Post;
}

const index: FC<Props> = ({ post }) => {
  return (
    <div className="col-lg-6">
      <div className="card border-0 mb-4 box-shadow">
        <div
          style={{
            height: '150px',
            backgroundSize: 'cover',
            backgroundImage: `url(${post.thumbnail?.replace('public', '')})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="card-body px-0 pb-0 d-flex flex-column align-items-start">
          <h2 className="h4 font-weight-bold">
            <Link href={`/${post.slug}`}>
              <a className="text-dark">{post.title}</a>
            </Link>
          </h2>
          {post.excerpt && <p className="card-text">{post.excerpt}</p>}

          <div>
            <small className="d-block">
              <a href="#" onClick={(e) => e.preventDefault()}>
                {post.author.name}
              </a>
            </small>
            <small className="text-muted">
              {post.createdAt} &middot; {post.readingTime}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
