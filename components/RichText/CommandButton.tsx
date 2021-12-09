import React, { FC, ButtonHTMLAttributes } from 'react';
import boldSvg from './icons/bold.svg';
import italicSvg from './icons/italic.svg';
import underlineSvg from './icons/underline.svg';
import linkSvg from './icons/link.svg';

type Icon = 'bold' | 'italic' | 'underline' | 'link';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: Icon;
}

const CommandButton: FC<Props> = ({ icon, ...props }) => {
  const IconSvg = {
    bold: boldSvg,
    italic: italicSvg,
    underline: underlineSvg,
    link: linkSvg,
  }[icon];

  return (
    <>
      <button onMouseDown={(e) => e.preventDefault()} {...props}>
        <IconSvg />
      </button>
      <style jsx>
        {`
          button {
            padding: 0;
            width: 30px;
            height: 30px;
            border-radius: 3px;
            background-color: transparent;
            transition: all 0.15s;
            border: 1px solid rgb(220, 220, 228);
          }

          button svg {
            height: 18px;
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
