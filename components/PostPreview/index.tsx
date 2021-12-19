import Link from 'next/link';
import React, { FC } from 'react';
import { Post } from '../../store/interfaces';
import classes from './post-review.module.scss';

interface Props {
  post: Post;
}

const index: FC<Props> = ({ post }) => {
  return (
    <div className="mb-3 d-flex flex-column flex-md-row justify-content-between">
      {post.thumbnail && (
        <img
          className={classes.thumbnail}
          height="150"
          src={post.thumbnail.replace('public', '')}
          alt={post.title || undefined}
        />
      )}

      <div className="pt-3 pt-md-0 pr-md-3">
        <h2 className="mb-1 h4 font-weight-bold">
          <Link href={`/${post.slug}`}>
            <a className="text-dark">{post.title}</a>
          </Link>
        </h2>
        <p>{post.excerpt}</p>
        <div className="card-text text-muted small">
          <a href="#" onClick={(e) => e.preventDefault()}>
            {post.author.name}
          </a>
          <span> في </span>
          {post.categories?.map((category, idx) => (
            <Link key={category.id} href={`/category/${category.slug}`}>
              <a>{category.name}</a>
            </Link>
          ))}
        </div>
        <small className="text-muted">
          {post.createdAt} &middot; {post.readingTime}
        </small>
      </div>
    </div>
  );
};

export default index;
