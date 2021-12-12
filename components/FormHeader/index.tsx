import React from 'react';

const FormHeader = ({ children }) => {
  return (
    <>
      <div className="form-header">
        <div>{children}</div>
      </div>
      <style jsx>
        {`
          .form-header {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
            margin-bottom: 1rem;
          }

          .form-header > div {
            padding: 1rem 0.5rem;
            background: rgb(255, 255, 255);
            border: 1px solid rgb(243, 243, 243);
          }
        `}
      </style>
    </>
  );
};

export default FormHeader;
