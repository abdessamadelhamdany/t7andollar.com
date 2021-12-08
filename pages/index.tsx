import Head from 'next/head';
import type { NextPage } from 'next';
import { gql, useQuery } from '@apollo/client';
import { title } from 'lib/helpers';
import Link from 'next/link';

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

const featuredPost = {
  title: 'مجموعة تطبيقات ستمكنك من ربح المال من الانترنت',
  category: 'make-money-online',
  slug: 'مجموعة-تطبيقات-ستمكنك-من-ربح-المال-من-الانترنت',
  excerpt:
    'هل تبحث عن تطبيقات تساعدك على جني المال من الانترنت؟ هذه التطبيقات ستمكنك من ربح المال من الانترنت في اوقات الفراغ، يمكنك استعمالها عندما تكون جالس ولا تفعل اي شئ او وانت تنتظر في مكان ما. انها سهلة الإستعمال وسريعة التحميل.',
  thumbnail: '/images/blog/01-01-2022/make-money-apps.jpg',
  source: 'https://dopedollar.com/apps-that-pay-you-money/',
  body: '',
};

const allPosts = [featuredPost, featuredPost, featuredPost, featuredPost];

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

      <div className="container mb-3 homepage">
        <div className="pl-0 pr-0 pr-md-4 h-100 tofront">
          <div className="row justify-content-between">
            <div className="col-lg-6 py-3 py-md-6 align-self-center">
              <Link href={`/${featuredPost.slug}`} passHref>
                <a>
                  <h1 className="secondfont mb-3 font-weight-bold">
                    {featuredPost.title}
                  </h1>
                  <img
                    className="mb-3 w-100 d-block d-lg-none"
                    src={featuredPost.thumbnail}
                  />
                </a>
              </Link>
              <p className="text-justify m-0">{featuredPost.excerpt}</p>
            </div>
            <div className="d-none d-lg-block col-lg-6">
              <Link href={`/${featuredPost.slug}`} passHref>
                <a>
                  <img
                    className="t7-img-fit-thumbnail"
                    src={featuredPost.thumbnail}
                  />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4 mb-3">
        <div className="row">
          <div className="col-lg-12">
            <img
              className="d-none d-md-block w-100"
              src="/images/placeholders/ads/1170x280.jpg"
              alt="1170x280 Ad placeholder"
            />
            <img
              className="d-block d-md-none w-100"
              src="/images/placeholders/ads/425x354.jpg"
              alt="1170x280 Ad placeholder"
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-between">
          <div className="col-md-8">
            <h5 className="font-weight-bold spanborder">
              <span>All Stories</span>
            </h5>
            <div className="mb-3 d-flex justify-content-between">
              <div className="pr-3">
                <h2 className="mb-1 h4 font-weight-bold">
                  <a className="text-dark" href="./article.html">
                    Nearly 200 Great Barrier Reef coral species also live in the
                    deep sea
                  </a>
                </h2>
                <p>
                  There are more coral species lurking in the deep ocean that
                  previously thought.
                </p>
                <div className="card-text text-muted small">
                  Jake Bittle in SCIENCE
                </div>
                <small className="text-muted">Dec 12 &middot; 5 min read</small>
              </div>
              <img height="120" src="/assets/img/demo/blog8.jpg" />
            </div>
            <div className="mb-3 d-flex justify-content-between">
              <div className="pr-3">
                <h2 className="mb-1 h4 font-weight-bold">
                  <a className="text-dark" href="./article.html">
                    East Antarctica's glaciers are stirring
                  </a>
                </h2>
                <p>
                  Nasa says it has detected the first signs of significant
                  melting in a swathe of glaciers in East Antarctica.
                </p>
                <div className="card-text text-muted small">
                  Jake Bittle in SCIENCE
                </div>
                <small className="text-muted">Dec 12 &middot; 5 min read</small>
              </div>
              <img height="120" src="/assets/img/demo/1.jpg" />
            </div>
            <div className="mb-3 d-flex justify-content-between">
              <div className="pr-3">
                <h2 className="mb-1 h4 font-weight-bold">
                  <a className="text-dark" href="./article.html">
                    50 years ago, armadillos hinted that DNA wasn’t destiny
                  </a>
                </h2>
                <p>
                  Nasa says it has detected the first signs of significant
                  melting in a swathe of glaciers in East Antarctica.
                </p>
                <div className="card-text text-muted small">
                  Jake Bittle in SCIENCE
                </div>
                <small className="text-muted">Dec 12 &middot; 5 min read</small>
              </div>
              <img height="120" src="/assets/img/demo/5.jpg" />
            </div>
          </div>
          <div className="col-md-4 pl-4">
            <h5 className="font-weight-bold spanborder">
              <span>Popular</span>
            </h5>
            <ol className="list-featured">
              <li>
                <span>
                  <h6 className="font-weight-bold">
                    <a href="./article.html" className="text-dark">
                      Did Supernovae Kill Off Large Ocean Animals?
                    </a>
                  </h6>
                  <p className="text-muted">Jake Bittle in SCIENCE</p>
                </span>
              </li>
              <li>
                <span>
                  <h6 className="font-weight-bold">
                    <a href="./article.html" className="text-dark">
                      Humans Reversing Climate Clock: 50 Million Years
                    </a>
                  </h6>
                  <p className="text-muted">Jake Bittle in SCIENCE</p>
                </span>
              </li>
              <li>
                <span>
                  <h6 className="font-weight-bold">
                    <a href="./article.html" className="text-dark">
                      Unprecedented Views of the Birth of Planets
                    </a>
                  </h6>
                  <p className="text-muted">Jake Bittle in SCIENCE</p>
                </span>
              </li>
              <li>
                <span>
                  <h6 className="font-weight-bold">
                    <a href="./article.html" className="text-dark">
                      Effective New Target for Mood-Boosting Brain Stimulation
                      Found
                    </a>
                  </h6>
                  <p className="text-muted">Jake Bittle in SCIENCE</p>
                </span>
              </li>
            </ol>
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
