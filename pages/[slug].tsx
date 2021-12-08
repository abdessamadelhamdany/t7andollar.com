import React from 'react';
import Link from 'next/link';
import type { NextPage } from 'next';
import { Post } from '../interfaces';
import NextPost from '@/components/NextPost';

const post: Post = {
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
  body: `
  <p>هل تبحث عن تطبيقات تدفع لك المال؟</p>
  <p>تعد تطبيقات كسب المال هذه ممتازة لكسب القليل من المال على الجانب أثناء الانتظار في الطابور أو بالملل في المنزل دون أن تفعل شيئًا.</p>
  <p>إنها حقًا سهلة الاستخدام وسريعة التنزيل.</p>
  <p>كيف تعمل تطبيقات كسب المال: ما عليك سوى تنزيل التطبيق ، والقيام بأشياء مختلفة داخل التطبيق لكسب أرصدة أو أموال مباشرة.</p>
  <p>ستدفع لك معظم هذه التطبيقات أموالاً من خلال Paypal cash أو يمكنك استخدام أرصدةك المكتسبة لاسترداد بطاقات الهدايا.</p>
  <p>لقد قمت بربط متجر تطبيقات Android لكل تطبيق مدرج هنا. لم أتحقق من أن متجر iTunes به التطبيق ، لكنني على استعداد للمراهنة على أنك ستتمكن من العثور عليه في متجر iTunes إذا كنت تبحث عن ما يعادله من Apple. هذه التطبيقات ليست أفكارًا تجارية من شأنها أن تجعلك ثريًا ، لكنها طرق ممتازة لكسب المال بسرعة!  </p>

  <h2>1. موقع Ipsos</h2>
  <p>Ipsos هو موقع ويب خاص بأبحاث السوق حيث يمكنك ملء استطلاعات الرأي للحصول على مكافآت مثل بطاقات الهدايا لتجار التجزئة المشهورين مثل Walmart و Starbucks و Target.</p>
  <p>أو يمكنك الحصول على بطاقات هدايا Paypal وهي نفس النقود عند تحويل رصيد Paypal إلى حسابك المصرفي!</p>
  <p>ما عليك سوى الاشتراك في Ipsos والحصول على أموال في كل مرة تكمل فيها استطلاعًا.</p>
  
  <h2>2. مقولة</h2>
  <blockquote>ما عليك سوى الاشتراك في Ipsos والحصول على أموال في كل مرة تكمل فيها استطلاعًا.</blockquote>
  `,
  author: {
    name: 'عبد الصمد الحمداني',
    username: 'عبد-الصمد-الحمداني',
    avatar: '/images/avatars/abdessamadelhamdany.jpg',
  },
  readingTime: '5 دقائق',
  publishedAt: 'السبت 1 يناير 2022',
};

const readNextPost: Post[] = [
  { ...post, id: 2 },
  { ...post, id: 3 },
];

const Article: NextPage = () => {
  return (
    <>
      <div className="container">
        <div className="row mb-3 justify-content-center">
          <div className="col-12 py-4 align-self-center">
            <p className="text-uppercase font-weight-bold">
              <Link href={`/category/${post.category.slug}`}>
                <a className="text-brand">{post.category.name}</a>
              </Link>
            </p>
            <h1 className="display-4 secondfont mb-3 font-weight-bold">
              {post.title}
            </h1>
            <div className="d-flex align-items-center">
              <img
                className="rounded-circle"
                src={post.author.avatar}
                width="70"
              />
              <small className="mr-2">
                <span>{post.author.name}</span>
                <span className="text-muted d-block">
                  {post.publishedAt} &middot; {post.readingTime}
                </span>
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* TODO: extract to component */}
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-xl-3 mb-3">
            <img
              className="d-none d-lg-block w-100"
              src="/images/placeholders/ads/224x600.jpg"
              alt="224x600 Ad placeholder"
            />
            <img
              className="d-block d-lg-none w-100"
              src="/images/placeholders/ads/224x224.jpg"
              alt="224x224 Ad placeholder"
            />
          </div>
          <div className="col-lg-8 col-xl-7">
            <img
              className="mb-3"
              src={post.thumbnail}
              alt={post.title}
              width="100%"
            />

            <article
              className="article-post"
              dangerouslySetInnerHTML={{ __html: post.body }}
            ></article>
            <div className="mt-4">
              <div className="text-muted text-center mb-3">شارك المقالة</div>
              <div className="sharethis-inline-share-buttons"></div>
            </div>
          </div>
        </div>
      </div>

      {/* TODO: extract to component */}
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

      <div className="container pt-4 pb-4">
        <h5 className="font-weight-bold spanborder">
          <span>اقرأ المزيد</span>
        </h5>
        <div className="row">
          {readNextPost.map((post) => (
            <NextPost key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Article;
