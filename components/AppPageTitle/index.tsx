import React, { FC, HTMLAttributes } from 'react';

const AppPageTitle: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => {
  return (
    <>
      <h2 {...props}>{children}</h2>
      <style jsx>
        {`
          h2 {
            margin-bottom: 1.25rem;
          }
        `}
      </style>
    </>
  );
};

export default AppPageTitle;
