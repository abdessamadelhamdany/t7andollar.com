import { parseCookies } from 'lib/helpers';
import { NextPage, GetServerSideProps } from 'next';

const NewPost: NextPage = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const res = await fetch(`${process.env.APP_URL}/api/posts/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: parseCookies(req.cookies),
    },
  });

  const { data: newPost, error } = await res.json();

  if (error) {
    console.log(error);
    return {
      redirect: {
        destination: `/app/posts`,
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: `/app/posts/${newPost.id}`,
      permanent: false,
    },
  };
};

export default NewPost;
