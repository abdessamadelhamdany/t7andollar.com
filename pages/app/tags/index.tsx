import React, { useEffect } from 'react';
import { Tag } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';
import AppLayout from '@/components/AppLayout';
import AppTagsList from '@/components/AppTagsList';
import AppPageTitle from '@/components/AppPageTitle';
import AppTagsNavbarNav from '@/components/PageNavbar/AppTagsNavbarNav';
import { useTag } from 'store/hooks';
import { parseCookies } from '../../../lib/helpers';

interface Props extends ServerProps {}

const Tags: NextPage<Props> = ({ initialTags }) => {
  const { tags, initializeTags } = useTag();

  useEffect(() => {
    initializeTags(initialTags);
  }, []);

  return (
    <AppLayout pageNavbarNav={<AppTagsNavbarNav />}>
      <AppPageTitle>قائمة الكلمات الدالية</AppPageTitle>

      <AppTagsList tags={tags} />
    </AppLayout>
  );
};

interface ServerProps {
  initialTags: Tag[];
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async ({
  req,
}) => {
  const res = await fetch(`${process.env.APP_URL}/api/tags`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: parseCookies({ ['jwt-token']: req.cookies['jwt-token'] }),
    },
  });
  const { data: tags, error } = await res.json();

  if (error) {
    console.error(error);
    throw Error(error);
  }

  return {
    props: {
      initialTags: tags,
    },
  };
};

export default Tags;
