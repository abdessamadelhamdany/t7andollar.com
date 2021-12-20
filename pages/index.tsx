import Head from 'next/head';
import type { GetServerSideProps, NextPage } from 'next';
import { formatDate, title } from 'lib/helpers';
import PostPreview from '@/components/PostPreview';
import FeaturedPost from '@/components/FeaturedPost';
import AdPlaceholder from '@/components/AdPlaceholder';
import { Post } from '../store/interfaces';

const Home: NextPage<ServerProps> = ({ featuredPost, posts }) => {
  return (
    <>
      <Head>
        <title>{title('تعرف على طرق الربح من الانترنت')}</title>
        <meta
          name="description"
          content="طحن الدولار هو موقع إلكتروني لتعلم طرق العمل على الإنترنت في شتى المجالات كما تعليم الأدوات مثل ووردبريس، بلوجر، تطوير مواقع الويب والعديد من المصادر التعليمية."
        />
      </Head>

      {featuredPost && (
        <div className="container mt-5 homepage">
          <FeaturedPost post={featuredPost} />
        </div>
      )}

      {/* <div className="container py-4 mb-3">
        <div className="row">
          <div className="col-lg-12">
            <AdPlaceholder width={1170} height={280} />
          </div>
        </div>
      </div> */}

      <div className="container mt-5">
        <div className="row justify-content-between">
          <div className="col-md-12">
            <h5 className="font-weight-bold spanborder">
              <span>كل المقالات</span>
            </h5>

            {posts.length > 0 ? (
              posts.map((post) => <PostPreview key={post.id} post={post} />)
            ) : (
              <h3>لا توجد مقالات</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

interface ServerProps {
  posts: Post[];
  featuredPost: Post | null;
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async () => {
  let posts: Post[] = [],
    featuredPost: Post | null = null,
    res: Response,
    data: any,
    error: string;

  res = await fetch(`${process.env.APP_URL}/api/public/posts`);
  data = await res.json();

  if (data.error) {
    console.error(data.error);
    throw Error(data.error);
  }

  posts = data.data.map((post) => ({
    ...post,
    createdAt: formatDate(post.createdAt),
  }));

  res = await fetch(`${process.env.APP_URL}/api/public/posts/featured-at-home`);
  data = await res.json();

  if (data.error) {
    console.error(data.error);
    throw Error(data.error);
  }

  featuredPost = data.data
    ? {
        ...data.data,
        createdAt: formatDate(data.data.createdAt),
      }
    : null;

  return {
    props: {
      posts,
      featuredPost,
    },
  };
};

export default Home;
