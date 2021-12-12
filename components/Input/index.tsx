import React, { FC, InputHTMLAttributes } from 'react';

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({ ...props }) => {
  return (
    <>
      <input {...props} />
      <style jsx>
        {`
          input[type='text'],
          input[type='email'],
          input[type='password'] {
            width: 100%;
            margin-bottom: 0.5rem;
          }
          input[type='checkbox'] {
            margin-left: 0.5rem;
          }
          input {
            display: flex;
            align-items: center;
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
