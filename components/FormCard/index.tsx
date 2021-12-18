import React, { FC } from 'react';

const FormCard: FC<{ maxWidth?: string }> = ({
  children,
  maxWidth = '100%',
}) => {
  return (
    <>
      <div>{children}</div>
      <style jsx>
        {`
          div {
            padding: 3rem 1rem;
            text-align: center;
            margin: 0 auto;
            background-color: white;
            max-width: ${maxWidth};
          }
        `}
      </style>
    </>
  );
};

export default FormCard;
