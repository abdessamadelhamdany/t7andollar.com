import Head from 'next/head';
import type { NextPage } from 'next';
import { gql, useQuery } from '@apollo/client';

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
        <title>طحن الدولار - تعرف على طرق الربح من الانترنت</title>
        <meta
          name="description"
          content="شرح طرق دليل قائمة كيفية الربح من الانترنت، جوجل ادسينس والتسويق بالعمولة واستطلاع الرأي ومجالات اخرى، قائمة بأهم طريقة للربح من النت وتحصيل الثروة والمال. طرق"
        />
      </Head>

      <div className="container">
        <div className="jumbotron jumbotron-fluid mb-3 pt-0 pb-0 bg-lightblue position-relative">
          <div className="pl-4 pr-0 h-100 tofront">
            <div className="row justify-content-between">
              <div className="col-md-6 pt-6 pb-6 align-self-center">
                <h1 className="secondfont mb-3 font-weight-bold">
                  Mundana is an HTML Bootstrap Template for Professional
                  Blogging
                </h1>
                <p className="mb-3">
                  Beautifully crafted with the latest technologies, SASS &
                  Bootstrap 4.1.3, Mundana is the perfect design for your
                  professional blog. Homepage, post article and category layouts
                  available.
                </p>
                <a href="./article.html" className="btn btn-dark">
                  Read More
                </a>
              </div>
              <div
                className="col-md-6 d-none d-md-block pr-0"
                style={{
                  backgroundSize: 'cover',
                  backgroundImage: 'url(./assets/img/demo/home.jpg)',
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container pt-4 pb-4">
        <div className="row">
          <div className="col-lg-6">
            <div className="card border-0 mb-4 box-shadow h-xl-300">
              <div
                style={{
                  height: '150px',
                  backgroundImage: 'url(./assets/img/demo/1.jpg)',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>
              <div className="card-body px-0 pb-0 d-flex flex-column align-items-start">
                <h2 className="h4 font-weight-bold">
                  <a className="text-dark" href="./article.html">
                    Brain Stimulation Relieves Depression Symptoms
                  </a>
                </h2>
                <p className="card-text">
                  Researchers have found an effective target in the brain for
                  electrical stimulation to improve mood in people suffering
                  from depression.
                </p>
                <div>
                  <small className="d-block">
                    <a className="text-muted" href="./author.html">
                      Favid Rick
                    </a>
                  </small>
                  <small className="text-muted">
                    Dec 12 &middot; 5 min read
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="flex-md-row mb-4 box-shadow h-xl-300">
              <div className="mb-3 d-flex align-items-center">
                <img height="80" src="./assets/img/demo/blog4.jpg" />
                <div className="pl-3">
                  <h2 className="mb-2 h6 font-weight-bold">
                    <a className="text-dark" href="./article.html">
                      Nasa's IceSat space laser makes height maps of Earth
                    </a>
                  </h2>
                  <div className="card-text text-muted small">
                    Jake Bittle in LOVE/HATE
                  </div>
                  <small className="text-muted">
                    Dec 12 &middot; 5 min read
                  </small>
                </div>
              </div>
              <div className="mb-3 d-flex align-items-center">
                <img height="80" src="./assets/img/demo/blog5.jpg" />
                <div className="pl-3">
                  <h2 className="mb-2 h6 font-weight-bold">
                    <a className="text-dark" href="./article.html">
                      Underwater museum brings hope to Lake Titicaca
                    </a>
                  </h2>
                  <div className="card-text text-muted small">
                    Jake Bittle in LOVE/HATE
                  </div>
                  <small className="text-muted">
                    Dec 12 &middot; 5 min read
                  </small>
                </div>
              </div>
              <div className="mb-3 d-flex align-items-center">
                <img height="80" src="./assets/img/demo/blog6.jpg" />
                <div className="pl-3">
                  <h2 className="mb-2 h6 font-weight-bold">
                    <a className="text-dark" href="./article.html">
                      Sun-skimming probe starts calling home
                    </a>
                  </h2>
                  <div className="card-text text-muted small">
                    Jake Bittle in LOVE/HATE
                  </div>
                  <small className="text-muted">
                    Dec 12 &middot; 5 min read
                  </small>
                </div>
              </div>
            </div>
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
              <img height="120" src="./assets/img/demo/blog8.jpg" />
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
              <img height="120" src="./assets/img/demo/1.jpg" />
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
              <img height="120" src="./assets/img/demo/5.jpg" />
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
