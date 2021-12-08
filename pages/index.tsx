import Head from 'next/head';
import type { NextPage } from 'next';
import { gql, useQuery } from '@apollo/client';
import { title } from 'lib/helpers';
import PostPreview from '@/components/PostPreview';
import FeaturedPost from '@/components/FeaturedPost';
import AdPlaceholder from '@/components/AdPlaceholder';
import { Post } from '../interfaces';

const AllPostsQuery = gql`
  query allPostsQuery($first: Int!, $after: Int) {
    posts(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          title
          slug
        }
      }
    }
  }
`;

const featuredPost: Post = {
  id: 1,
  title: 'مجموعة تطبيقات ستمكنك من ربح المال من الانترنت',
  category: {
    name: 'ربح المال من الانترنت',
    slug: 'ربح-المال-من-الانترنت',
  },
  slug: 'مجموعة-تطبيقات-ستمكنك-من-ربح-المال-من-الانترنت',
  excerpt:
    'هل تبحث عن تطبيقات تساعدك على جني المال من الانترنت؟ هذه التطبيقات ستمكنك من ربح المال من الانترنت في اوقات الفراغ، يمكنك استعمالها عندما تكون جالس ولا تفعل اي شئ او وانت تنتظر في مكان ما. انها سهلة الإستعمال وسريعة التحميل.',
  thumbnail: '/images/blog/01-01-2022/make-money-apps.jpg',
  source: 'https://dopedollar.com/apps-that-pay-you-money/',
  body: '',
  author: {
    name: 'عبد الصمد الحمداني',
    username: 'عبد-الصمد-الحمداني',
    avatar: '/images/avatars/abdessamadelhamdany.jpg',
  },
  readingTime: '5 دقائق',
  publishedAt: 'السبت 1 يناير 2022',
};

const allPosts = [
  { ...featuredPost, id: 2 },
  { ...featuredPost, id: 3 },
  { ...featuredPost, id: 4 },
  { ...featuredPost, id: 5 },
];

const Home: NextPage = () => {
  const { data, error, loading, fetchMore } = useQuery(AllPostsQuery, {
    variables: { first: 1 },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong.</p>;
  }

  const { endCursor, hasNextPage } = data.posts.pageInfo;

  return (
    <>
      <Head>
        <title>{title('تعرف على طرق الربح من الانترنت')}</title>
        <meta
          name="description"
          content="طحن الدولار هو موقع إلكتروني لتعلم طرق العمل على الإنترنت في شتى المجالات كما تعليم الأدوات مثل ووردبريس، بلوجر، تطوير مواقع الويب والعديد من المصادر التعليمية."
        />
      </Head>

      <div className="container my-5 homepage">
        <FeaturedPost post={featuredPost} />
      </div>

      <div className="container py-4 mb-3">
        <div className="row">
          <div className="col-lg-12">
            <AdPlaceholder width={1170} height={280} />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-between">
          <div className="col-md-12">
            <h5 className="font-weight-bold spanborder">
              <span>كل المقالات</span>
            </h5>

            {allPosts.map((post) => (
              <PostPreview key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>

      {/**
<h2>Posts</h2>
<ul>
  {data.posts.edges.map(({ node }, idx) => (
    <li key={node.id}>{node.title}</li>
  ))}
</ul>
{hasNextPage ? (
  <button
    onClick={() => {
      fetchMore({
        variables: { after: endCursor },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          fetchMoreResult.posts.edges = [
            ...prevResult.posts.edges,
            ...fetchMoreResult.posts.edges,
          ];
          return fetchMoreResult;
        },
      });
    }}
  >
    Load More
  </button>
) : (
  <p>You\'ve reached the end!</p>
)}
      */}
    </>
  );
};

export default Home;
