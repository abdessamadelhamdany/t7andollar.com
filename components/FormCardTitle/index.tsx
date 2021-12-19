import React, { FC } from 'react';

const FormCardTitle: FC = ({ children }) => {
  return (
    <>
      <h2>{children}</h2>
      <style jsx>
        {`
          h2 {
            font-size: 2rem;
            text-align: center;
            margin-bottom: 2rem;
          }
        `}
      </style>
    </>
  );
};

export default FormCardTitle;
