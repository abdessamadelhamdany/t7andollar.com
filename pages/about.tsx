import React from 'react';
import type { NextPage } from 'next';

const About: NextPage = () => {
  return (
    <>
      <div className="container">
        <div className="jumbotron jumbotron-fluid mb-3 pl-0 pt-0 pb-0 bg-white position-relative">
          <div className="h-100 tofront">
            <div className="row justify-content-between">
              <div className="col-md-6 pt-6 pb-6 pr-6 align-self-center">
                <p className="text-uppercase font-weight-bold">
                  <a className="text-danger" href="#">
                    Templates
                  </a>
                </p>
                <h1 className="display-4 secondfont mb-3 font-weight-bold">
                  Mundana - Bootstrap 4 HTML Template for Professional Blogging
                </h1>
                <p className="mb-3">
                  Here we're introducing you what you can do with Mundana theme.
                </p>
                <div className="d-flex align-items-center">
                  <a target="_blank" href="https://www.buymeacoffee.com/sal">
                    <img
                      className="rounded-circle"
                      src="/assets/img/demo/sal.jpg"
                      width="70"
                    />
                  </a>
                  <small className="ml-2">
                    <a target="_blank" href="https://www.buymeacoffee.com/sal">
                      Sal
                    </a>{' '}
                    <span className="text-muted d-block">
                      A few hours ago &middot; 5 min. read
                    </span>
                  </small>
                </div>
              </div>
              <div className="col-md-6 pr-0">
                <img
                  src="/assets/img/screenshot-mundana.png"
                  className="shadow"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container pt-4 pb-4">
        <div className="row justify-content-center">
          <div className="col-lg-2 pr-4 mb-4 col-md-12 text-center">
            <div className="sticky-top text-center">
              <div className="text-muted">Share this</div>
              <div className="share d-inline-block">
                <div className="a2a_kit a2a_kit_size_32 a2a_default_style">
                  <a
                    className="a2a_dd"
                    href="https://www.addtoany.com/share"
                  ></a>
                  <a className="a2a_button_facebook"></a>
                  <a className="a2a_button_twitter"></a>
                </div>
                <script
                  async
                  src="https://static.addtoany.com/menu/page.js"
                ></script>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-8">
            <article className="article-post">
              <p>
                I hope you like Mundana. My name is{' '}
                <a target="_blank" href="https://www.buymeacoffee.com/sal">
                  Sal
                </a>
                , I am the author of this template that I'm sharing you for
                free. You are currently previewing its demo, the article
                template to be more specific.
              </p>
              <p>
                Here are a few screenshots of Mundana and what you can do with
                it.
              </p>
              <p>
                <a href="./article.html">
                  <img
                    src="/assets/img/screenshot-mundana-article.png"
                    className="shadow"
                  />
                </a>
              </p>
              <p>
                <a href="./index.html">
                  <img
                    src="/assets/img/screenshot-mundana.png"
                    className="shadow"
                  />
                </a>
              </p>
              <p>
                <a href="./category.html">
                  <img
                    src="/assets/img/screenshot-mundana-category.png"
                    className="shadow"
                  />
                </a>
              </p>
              <p>Like it? You can download Mundana HTML Template for free!</p>
              <p>
                <a
                  target="_blank"
                  href="https://www.wowthemes.net/mundana-free-html-bootstrap-template"
                  className="btn btn-secondary"
                >
                  &rarr; Go to Mundana's download page
                </a>
              </p>
            </article>
            <div className="border p-5 bg-lightblue mt-5">
              <div className="row justify-content-between align-items-center">
                <div className="col-md-8 mb-2 mb-md-0">
                  <h5 className="font-weight-bold mb-3">
                    About the author of Mundana
                  </h5>
                  Hi, I'm Sal, the author of the template you're currently
                  previewing. I am sharing for free, for your personal &amp;
                  commercial use on unlimited domains. If you'd like to support
                  my work, donations are highly appreciated! You can remove the
                  credit links after donation. Thank you!
                </div>
                <div className="col-md-4">
                  <a
                    target="_blank"
                    href="https://www.buymeacoffee.com/sal"
                    className="btn btn-warning btn-block"
                  >
                    <i className="fa fa-coffee"></i> Buy me a coffee
                  </a>
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
                  backgroundImage: 'url(/assets/img/demo/3.jpg)',
                  backgroundSize: 'cover',
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

export default About;
