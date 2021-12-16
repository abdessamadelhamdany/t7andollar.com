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
            margin-bottom: 1rem;
          }
        `}
      </style>
    </>
  );
};

export default FormError;
