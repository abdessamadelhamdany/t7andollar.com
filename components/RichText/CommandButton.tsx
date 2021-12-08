import React, { FC, ButtonHTMLAttributes } from 'react';
import boldSvg from './icons/bold.svg';

type Icon = 'bold' | 'italic' | 'underline';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: Icon;
}

const CommandButton: FC<Props> = ({ icon, children, ...props }) => {
  const icons = {
    bold: boldSvg,
  };

  return (
    <>
      <button onMouseDown={(e) => e.preventDefault()} {...props}>
        <img
          src={icons[icon].src}
          height={icons[icon].height}
          width={icons[icon].width}
        />
        {children}
      </button>
      <style jsx>
        {`
          button {
            padding: 0;
            width: 30px;
            height: 30px;
            line-height: 1;
            border-radius: 3px;
            background-color: transparent;
            transition: all 0.15s;
            border: 1px solid rgb(220, 220, 228);
          }
          button:hover {
            background-color: #f3f3f3;
          }
        `}
      </style>
    </>
  );
};

export default CommandButton;
