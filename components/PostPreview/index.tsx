import Link from 'next/link';
import React, { FC } from 'react';
import { Post } from 'interfaces';
import classes from './post-review.module.scss';

interface Props {
  post: Post;
}

const index: FC<Props> = ({ post }) => {
  return (
    <div className="mb-3 d-flex flex-column flex-md-row justify-content-between">
      <img
        className={classes.thumbnail}
        height="150"
        src={post.thumbnail}
        alt={post.title}
      />
      <div className="pt-3 pt-md-0 pr-md-3">
        <h2 className="mb-1 h4 font-weight-bold">
          <Link href={`/${post.slug}`}>
            <a className="text-dark">{post.title}</a>
          </Link>
        </h2>
        <p>{post.excerpt}</p>
        <div className="card-text text-muted small">
          <Link href={`/authors/${post.author.username}`}>
            <a>{post.author.name}</a>
          </Link>
          <span> في </span>
          <Link href={`/category/${post.category.slug}`}>
            <a>{post.category.name}</a>
          </Link>
        </div>
        <small className="text-muted">
          {post.publishedAt} &middot; {post.readingTime}
        </small>
      </div>
    </div>
  );
};

export default index;
