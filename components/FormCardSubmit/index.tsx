import React, { FC, ButtonHTMLAttributes } from 'react';

const FormCardSubmit: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => (
  <>
    <button type="submit" {...props}>
      {children}
    </button>
    <style jsx>
      {`
        button {
          width: 100%;
          padding: 0.75rem 0.5rem;
          transition: all 0.15s;
          border: 1px solid #5da731;
          color: rgb(255, 255, 255);
          background-color: #5da731;
          box-shadow: 0 0 4px -3px rgba(0, 0, 0, 0.62);
        }

        button:focus {
          outline: none;
        }

        button:focus,
        button:hover {
          color: #5da731;
          background-color: transparent;
          box-shadow: 0 0 4px -3px rgba(0, 0, 0, 0.92);
        }
      `}
    </style>
  </>
);

export default FormCardSubmit;
