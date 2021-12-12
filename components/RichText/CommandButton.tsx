import React, { FC, ButtonHTMLAttributes } from 'react';
import boldSvg from './icons/bold.svg';
import italicSvg from './icons/italic.svg';
import underlineSvg from './icons/underline.svg';
import linkSvg from './icons/link.svg';
import imageSvg from './icons/image.svg';

type Icon = 'bold' | 'italic' | 'underline' | 'link' | 'image';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: Icon;
}

const CommandButton: FC<Props> = ({ icon, ...props }) => {
  const IconSvg = {
    bold: boldSvg,
    italic: italicSvg,
    underline: underlineSvg,
    link: linkSvg,
    image: imageSvg,
  }[icon];

  return (
    <>
      <button type="button" onMouseDown={(e) => e.preventDefault()} {...props}>
        <IconSvg />
      </button>
      <style jsx>
        {`
          button {
            padding: 0;
            width: 30px;
            height: 30px;
            border-radius: 10px;
            transition: all 0.15s;
            background-color: transparent;
            border: 1px solid rgb(220, 220, 228);
            box-shadow: 0 0 4px -3px rgba(0, 0, 0, 0.62);
          }

          button svg {
            height: 18px;
          }

          button:hover {
            border-color: #5da731;
            box-shadow: 0 0 4px -3px rgba(0, 0, 0, 0.92);
          }
        `}
      </style>
    </>
  );
};

export default CommandButton;
