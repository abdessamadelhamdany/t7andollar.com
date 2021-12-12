import React from 'react';

const FormBody = ({ children }) => {
  return (
    <>
      <div className="form-body">{children}</div>
      <style jsx>
        {`
          .form-body {
            margin-bottom: 3rem;
            padding: 1rem 0.5rem;
          }
        `}
      </style>
    </>
  );
};

export default FormBody;
