import React, { ChangeEvent, FC, useRef } from 'react';
import CommandButton from './CommandButton';

interface Props {
  onCommandImageChosen(urlValue: string): void;
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
    const urlValue = URL.createObjectURL(file);

    // TODO: upload to server, and send url instead
    onCommandImageChosen(urlValue);
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

export const Image = (props) => {
  return (
    <>
      <img src={props.src} />
      <style jsx>
        {`
          img {
            width: 100%;
            margin: 0 auto;
            display: block;
            max-width: 720px;
          }
        `}
      </style>
    </>
  );
};

export const Media = ({ block, contentState }) => {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src } = entity.getData();
  const type = entity.getType();

  if (type === 'IMAGE') {
    return <Image src={src} />;
  }

  return null;
};

export default CommandImage;
