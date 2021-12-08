import React, { FC } from 'react';

interface Props {
  width: number;
  height: number;
}

const index: FC<Props> = ({ width, height }) => {
  if (width === 224 && height === 600) {
    return (
      <>
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
      </>
    );
  }

  if (width === 1170 && height === 280) {
    return (
      <>
        <img
          className="d-none d-md-block w-100"
          src="/images/placeholders/ads/1170x280.jpg"
          alt="1170x280 Ad placeholder"
        />
        <img
          className="d-block d-md-none w-100"
          src="/images/placeholders/ads/425x354.jpg"
          alt="425x354 Ad placeholder"
        />
      </>
    );
  }

  return <p>Resolution {`${width}x${height}`} is not supported.</p>;
};

export default index;
