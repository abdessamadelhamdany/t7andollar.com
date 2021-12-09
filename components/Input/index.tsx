import React from 'react';

const Input = ({ ...props }) => {
  return (
    <>
      <input {...props} />
      <style jsx>
        {`
          input {
            width: 100%;
            display: flex;
            align-items: center;
            margin-bottom: 0.5rem;
            padding: 0.75rem 0.5rem;
            background: rgb(255, 255, 255);
            border: 1px solid rgb(243, 243, 243);
          }
          input:focus {
            outline: none;
            border-color: #5da731;
          }
        `}
      </style>
    </>
  );
};

export default Input;
