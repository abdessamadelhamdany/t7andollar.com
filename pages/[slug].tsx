import React from 'react';
import type { NextPage } from 'next';
import { Post } from '../interfaces';

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
  `,
  author: {
    name: 'عبد الصمد الحمداني',
    username: 'عبد-الصمد-الحمداني',
    avatar: '/images/avatars/abdessamadelhamdany.jpg',
  },
  readingTime: '5 دقائق',
  publishedAt: 'السبت 1 يناير 2022',
};

const Article: NextPage = () => {
  return (
    <>
      <div className="container">
        <div className="row mb-3 justify-content-center">
          <div className="col-10">
            <img
              className="post-thumbnail"
              src={post.thumbnail}
              alt={post.title}
              width="770"
            />
            <style jsx>{`
              .post-thumbnail {
                width: 100%;
                object-fit: cover;
              }
            `}</style>
          </div>
          <div className="col-10 py-3 pb-6 align-self-center">
            <p className="text-uppercase font-weight-bold">
              <a className="text-danger" href={post.category.slug}>
                {post.category.name}
              </a>
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

      <div className="container pt-4 pb-4">
        <div className="row justify-content-center">
          <div className="col-lg-2 pl-lg-4 mt-4 mt-lg-0 order-1 order-lg-0">
            <div className="sticky-top">
              <div className="text-muted text-center mb-3">شارك المقالة</div>
              <div className="sharethis-inline-share-buttons"></div>
            </div>
          </div>
          <div className="col-lg-8 order-0 order-lg-1">
            <article className="article-post">
              <p>
                Holy grail funding non-disclosure agreement advisor ramen
                bootstrapping ecosystem. Beta crowdfunding iteration assets
                business plan paradigm shift stealth mass market seed money
                rockstar niche market marketing buzz market.
              </p>
              <p>
                Burn rate release facebook termsheet equity technology.
                Interaction design rockstar network effects handshake creative
                startup direct mailing. Technology influencer direct mailing
                deployment return on investment seed round.
              </p>
              <p>
                Termsheet business model canvas user experience churn rate low
                hanging fruit backing iteration buyer seed money. Virality
                release launch party channels validation learning curve paradigm
                shift hypotheses conversion. Stealth leverage freemium venture
                startup business-to-business accelerator market.
              </p>
              <p>
                Freemium non-disclosure agreement lean startup bootstrapping
                holy grail ramen MVP iteration accelerator. Strategy market
                ramen leverage paradigm shift seed round entrepreneur
                crowdfunding social proof angel investor partner network
                virality.
              </p>
            </article>
            <div className="border p-5 bg-lightblue">
              <div className="row justify-content-between">
                <div className="col-md-5 mb-2 mb-md-0">
                  <h5 className="font-weight-bold secondfont">
                    Become a member
                  </h5>
                  Get the latest news right in your inbox. We never spam!
                </div>
                <div className="col-md-7">
                  <div className="row">
                    <div className="col-md-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your e-mail address"
                      />
                    </div>
                    <div className="col-md-12 mt-2">
                      <button
                        type="submit"
                        className="btn btn-success btn-block"
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container pt-4 pb-4">
        <h5 className="font-weight-bold spanborder">
          <span>Read next</span>
        </h5>
        <div className="row">
          <div className="col-lg-6">
            <div className="card border-0 mb-4 box-shadow h-xl-300">
              <div
                style={{
                  height: '150px',
                  backgroundSize: 'cover',
                  backgroundImage: 'url(/assets/img/demo/3.jpg)',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>
              <div className="card-body px-0 pb-0 d-flex flex-column align-items-start">
                <h2 className="h4 font-weight-bold">
                  <a className="text-dark" href="#">
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
                  <small className="text-muted">Dec 12 · 5 min read</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="flex-md-row mb-4 box-shadow h-xl-300">
              <div className="mb-3 d-flex align-items-center">
                <img height="80" src="/assets/img/demo/blog4.jpg" />
                <div className="pl-3">
                  <h2 className="mb-2 h6 font-weight-bold">
                    <a className="text-dark" href="./article.html">
                      Nasa's IceSat space laser makes height maps of Earth
                    </a>
                  </h2>
                  <div className="card-text text-muted small">
                    Jake Bittle in LOVE/HATE
                  </div>
                  <small className="text-muted">Dec 12 · 5 min read</small>
                </div>
              </div>
              <div className="mb-3 d-flex align-items-center">
                <img height="80" src="/assets/img/demo/blog5.jpg" />
                <div className="pl-3">
                  <h2 className="mb-2 h6 font-weight-bold">
                    <a className="text-dark" href="./article.html">
                      Underwater museum brings hope to Lake Titicaca
                    </a>
                  </h2>
                  <div className="card-text text-muted small">
                    Jake Bittle in LOVE/HATE
                  </div>
                  <small className="text-muted">Dec 12 · 5 min read</small>
                </div>
              </div>
              <div className="mb-3 d-flex align-items-center">
                <img height="80" src="/assets/img/demo/blog6.jpg" />
                <div className="pl-3">
                  <h2 className="mb-2 h6 font-weight-bold">
                    <a className="text-dark" href="./article.html">
                      Sun-skimming probe starts calling home
                    </a>
                  </h2>
                  <div className="card-text text-muted small">
                    Jake Bittle in LOVE/HATE
                  </div>
                  <small className="text-muted">Dec 12 · 5 min read</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Article;
