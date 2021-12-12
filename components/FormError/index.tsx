import React, { FC } from 'react';

const FormError: FC = ({ children }) => {
  return (
    <>
      <div>{children}</div>
      <style jsx>
        {`
          div {
            color: #ea2f65;
            text-align: right;
            font-size: 0.875rem;
            margin-bottom: 0.5rem;
          }
        `}
      </style>
    </>
  );
};

export default FormError;
