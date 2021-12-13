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
    if (!e.target.files) {
      console.warn('no file was chosen');
      return;
    }

    console.log('e.target.files', e.target.files);
    console.log('e.target.files.length', e.target.files.length);

    if (!e.target.files || e.target.files.length <= 0) {
      return;
    }

    // TODO: upload to server, and send url instead
    var formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      console.log(file);
      formData.append('photos', file);
    }

    console.log('before');
    const res = await fetch('/api/upload/photos', {
      method: 'POST',
      body: formData,
    });
    const { data: uploadedPhotos } = await res.json();
    console.log('after', uploadedPhotos);

    uploadedPhotos.forEach(({ path, alt } = { path: '', alt: '' }) => {
      console.log('inside', path);
      setTimeout(() => {
        onCommandImageChosen(path.replace('public', ''));
      }, 1000);
    });
  };

  return (
    <>
      <CommandButton icon="image" onClick={onImageIconClick} />
      <input ref={ref} type="file" multiple onChange={onImageInputChange} />
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
            margin: 0 auto;
            display: block;
            max-width: 100%;
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
