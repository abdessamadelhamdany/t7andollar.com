import React from 'react';
import Script from 'next/script';

const index = () => {
  return (
    <>
      <Script
        strategy="beforeInteractive"
        src="/assets/js/vendor/jquery.min.js"
      />
      <Script
        strategy="beforeInteractive"
        src="/assets/js/vendor/popper.min.js"
        type="text/javascript"
      />
      <Script
        strategy="beforeInteractive"
        src="/assets/js/vendor/bootstrap.min.js"
        type="text/javascript"
      />

      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src="https://platform-api.sharethis.com/js/sharethis.js#property=61b0b48f592e270019ffb6c3&product=inline-share-buttons"
        async={true}
      />
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        console.log("called")
        `,
        }}
      />
      <Script
        strategy="afterInteractive"
        src="/assets/js/functions.js"
        type="text/javascript"
      />
    </>
  );
};

export default index;
