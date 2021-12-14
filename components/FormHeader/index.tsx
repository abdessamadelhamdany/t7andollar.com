import React from 'react';

const FormHeader = ({ children }) => {
  return (
    <>
      <div className="form-header">{children}</div>
      <style jsx>
        {`
          .form-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
            margin-bottom: 1rem;
            background: rgb(255, 255, 255);
            border: 1px solid rgb(243, 243, 243);
            padding: 0.5rem;
          }
        `}
      </style>
    </>
  );
};

export default FormHeader;
