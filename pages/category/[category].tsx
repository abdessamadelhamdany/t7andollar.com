import React from 'react';
import type { NextPage } from 'next';
import PostPreview from '@/components/PostPreview';
import FeaturedPost from '@/components/FeaturedPost';
import AdPlaceholder from '@/components/AdPlaceholder';

const featuredPost: any = {
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

const categoryPosts = [
  { ...featuredPost, id: 2 },
  { ...featuredPost, id: 3 },
  { ...featuredPost, id: 4 },
  { ...featuredPost, id: 5 },
];

const category = {
  name: 'ربح المال من الانترنت',
  slug: 'ربح-المال-من-الانترنت',
};

const Category: NextPage = () => {
  return (
    <>
      <div className="container my-3 homepage">
        <h5 className="font-weight-bold spanborder">
          <span>مميزة في {category.name}</span>
        </h5>

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
              <span>كل المقالات في {category.name}</span>
            </h5>

            {categoryPosts.map((post) => (
              <PostPreview key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
