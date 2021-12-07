import React from 'react';
import Script from 'next/script';

const index = () => {
  return (
    <>
      <Script
        strategy="beforeInteractive"
        src="assets/js/vendor/jquery.min.js"
      />
      <Script
        strategy="beforeInteractive"
        src="assets/js/vendor/popper.min.js"
        type="text/javascript"
      />
      <Script
        strategy="beforeInteractive"
        src="assets/js/vendor/bootstrap.min.js"
        type="text/javascript"
      />
      <Script
        strategy="beforeInteractive"
        src="assets/js/functions.js"
        type="text/javascript"
      />
    </>
  );
};

export default index;
