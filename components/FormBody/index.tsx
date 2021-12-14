import React from 'react';

const FormBody = ({ children }) => {
  return (
    <>
      <div className="form-body">{children}</div>
      <style jsx>
        {`
          .form-body {
            margin-bottom: 3rem;
            padding-top: 1rem;
            padding-bottom: 1rem;
          }
        `}
      </style>
    </>
  );
};

export default FormBody;
