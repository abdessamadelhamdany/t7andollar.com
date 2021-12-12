import { fileToBase64 } from 'lib/helpers';
import React, { ChangeEvent, FC, useRef } from 'react';
import CommandButton from './CommandButton';

interface Props {
  onCommandImageChosen(base64: string): void;
}

const CommandImage: FC<Props> = ({ onCommandImageChosen }) => {
  const ref = useRef<HTMLInputElement>(null);

  const onImageIconClick = () => {
    ref.current?.click();
  };

  const onImageInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length !== 1) {
      return;
    }

    const file = e.target.files[0];
    const base64 = await fileToBase64(file);

    if (typeof base64 === 'string') {
      onCommandImageChosen(base64);
    }
  };

  return (
    <>
      <CommandButton icon="image" onClick={onImageIconClick} />
      <input ref={ref} type="file" onChange={onImageInputChange} />
      <style jsx>
        {`
          input[type='file'] {
            display: none;
          }
        `}
      </style>
    </>
  );
};

export default CommandImage;
