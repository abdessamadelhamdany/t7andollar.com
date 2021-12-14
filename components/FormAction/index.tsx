import React, { FC, ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent';
}

const variantColors = {
  primary: {
    text: { normal: '#ffffff', hover: '#5da731' },
    bg: { normal: '#5da731', hover: 'transparent' },
  },
  accent: {
    text: { normal: '#ffffff', hover: '#000000' },
    bg: { normal: '#000000', hover: 'transparent' },
  },
};

const FormAction: FC<Props> = ({ children, variant, ...props }) => {
  if (!variant) {
    variant = 'primary';
  }

  return (
    <>
      <button {...props}>{children}</button>
      <style jsx>
        {`
          button {
            height: 2rem;
            padding: 0 1rem;
            transition: all 0.15s;
            color: ${variantColors[variant].text.normal};
            border: 1px solid ${variantColors[variant].bg.normal};
            background-color: ${variantColors[variant].bg.normal};
            box-shadow: 0 0 4px -3px rgba(0, 0, 0, 0.62);
          }

          button:hover {
            color: ${variantColors[variant].text.hover};
            background-color: ${variantColors[variant].bg.hover};
            box-shadow: 0 0 4px -3px rgba(0, 0, 0, 0.92);
          }
        `}
      </style>
    </>
  );
};

export default FormAction;
