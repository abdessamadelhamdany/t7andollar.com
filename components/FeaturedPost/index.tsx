import React, { FC } from 'react';
import Link from 'next/link';
import { Post } from '../../interfaces';
import classes from './featured-post.module.scss';

interface Props {
  post: Post;
}

const index: FC<Props> = ({ post }) => {
  return (
    <div className="pl-0 pr-0 pr-md-4 h-100 tofront">
      <div className="row justify-content-between">
        <div className="col-lg-6 py-3 py-md-6 align-self-center">
          <Link href={`/${post.slug}`} passHref>
            <a className={classes.postLink}>
              <h1
                className={[
                  'secondfont mb-3 font-weight-bold',
                  classes.title,
                ].join(' ')}
              >
                {post.title}
              </h1>
              <img
                className="mb-3 w-100 d-block d-lg-none"
                src={post.thumbnail}
                alt={post.title}
              />
            </a>
          </Link>
          <p className="text-justify m-0">{post.excerpt}</p>
        </div>
        <div className="d-none d-lg-block col-lg-6">
          <Link href={`/${post.slug}`} passHref>
            <a>
              <img
                className={classes.desktopThumbnail}
                src={post.thumbnail}
                alt={post.title}
              />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default index;
