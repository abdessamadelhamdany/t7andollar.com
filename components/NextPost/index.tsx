import Link from 'next/link';
import React, { FC } from 'react';
import { Post } from '../../interfaces';

interface Props {
  post: Post;
}

const index: FC<Props> = ({ post }) => {
  return (
    <div className="col-lg-6">
      <div className="card border-0 mb-4 box-shadow h-xl-300">
        <div
          style={{
            height: '150px',
            backgroundSize: 'cover',
            backgroundImage: `url(${post.thumbnail})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="card-body px-0 pb-0 d-flex flex-column align-items-start">
          <h2 className="h4 font-weight-bold">
            <a className="text-dark" href="#">
              {post.title}
            </a>
          </h2>
          <p className="card-text">{post.excerpt}</p>

          <div>
            <small className="d-block">
              <Link href={`/authors/${post.author.username}`}>
                <a>{post.author.name}</a>
              </Link>
            </small>
            <small className="text-muted">
              {post.publishedAt} &middot; {post.readingTime}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
