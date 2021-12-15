import React, { FC } from 'react';

interface Props {
  id: string;
  uploadUrl: string;
  onPhotoUploaded: (url: string) => void;
}

const PhotoUploader: FC<Props> = ({ id, uploadUrl, onPhotoUploaded }) => {
  return (
    <>
      <input id={id} type="file" tabIndex={-1} />
      <style jsx>
        {`
          input {
            display: none;
          }
        `}
      </style>
    </>
  );
};

export default PhotoUploader;
