import React, { FC, LabelHTMLAttributes } from 'react';

const Label: FC<LabelHTMLAttributes<HTMLLabelElement>> = ({
  children,
  ...props
}) => {
  return (
    <>
      <label {...props}>{children}</label>
      <style jsx>
        {`
          label {
            display: block;
          }
        `}
      </style>
    </>
  );
};

export default Label;
