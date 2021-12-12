import { NextPage } from 'next';

const NewPost: NextPage = () => {
  return null;
};

export async function getStaticProps({ params }) {
  if (params.id === 'new') {
    const res = await fetch(`${process.env.APP_URL}/api/posts/new`);
    const data = await res.json();
    const newPost = data.data;

    return {
      redirect: {
        destination: `/app/posts/${newPost.id}`,
        permanent: false,
      },
    };
  }
}

export default NewPost;
