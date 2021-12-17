import React, { useEffect } from 'react';
import { Category } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';
import AppLayout from '@/components/AppLayout';
import AppCategoriesNavbarNav from '@/components/PageNavbar/AppCategoriesNavbarNav';
import AppCategoriesList from '@/components/AppCategoriesList';
import AppPageTitle from '@/components/AppPageTitle';
import { useCategory } from 'store/hooks';

interface Props extends ServerProps {}

const Categories: NextPage<Props> = ({ initialCategories }) => {
  const { categories, initializeCategories } = useCategory();

  useEffect(() => {
    initializeCategories(initialCategories);
  }, []);

  return (
    <AppLayout pageNavbarNav={<AppCategoriesNavbarNav />}>
      <AppPageTitle>قائمة التصنيفات</AppPageTitle>

      <AppCategoriesList categories={categories} />
    </AppLayout>
  );
};

interface ServerProps {
  initialCategories: Category[];
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async ({
  params,
}) => {
  const res = await fetch(`${process.env.APP_URL}/api/categories`);
  const { data: categories, error } = await res.json();

  if (error) {
    console.error(error);
    throw Error(error);
  }

  return {
    props: {
      initialCategories: categories,
    },
  };
};

export default Categories;
