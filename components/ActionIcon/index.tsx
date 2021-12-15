import React, { FC, ButtonHTMLAttributes } from 'react';

const ActionIcon: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => (
  <>
    <button type="button" {...props}>
      {children}
    </button>
    <style jsx>
      {`
        button {
          border: none;
          padding: 0.25rem;
          transition: all 0.15s;
          line-height: 1;
          background-color: transparent;
        }

        button:focus {
          outline: none;
        }

        button:focus,
        button:hover {
          background-color: #f5f5f5;
        }
      `}
    </style>
  </>
);

export default ActionIcon;
