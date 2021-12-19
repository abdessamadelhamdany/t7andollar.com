import { Upload } from '@prisma/client';
import { XIcon } from '@heroicons/react/solid';
import React, { FC, ChangeEvent, useState } from 'react';
import ActionIcon from '../ActionIcon';

interface Props {
  id: string;
  name: string;
  uploadUrl: string;
  value?: string | null;
  onChange: (url: string | null) => void;
}

const PhotoUploader: FC<Props> = ({ id, name, value, uploadUrl, onChange }) => {
  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (!fileInput.files) {
      console.warn('no file was chosen');
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn('files list is empty');
      return;
    }

    const file = fileInput.files[0];

    var formData = new FormData();
    formData.append('photo', file);

    try {
      const res = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      const { data, error } = await res.json();
      if (error) {
        console.error(error);
      }

      data && onChange(data.path || null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="photo-uploader">
        <label className="photo-uploader-control">
          <input
            id={id}
            name={name}
            type="file"
            accept="image/*"
            tabIndex={-1}
            onChange={handleOnChange}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
            />
          </svg>
          <span>رفع الصورة</span>
        </label>
        <div className="photo-uploader-preview border-right border-gray">
          {!value ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          ) : (
            <>
              <div className="photo-uploader-preview-corner">
                <ActionIcon
                  onClick={() => {
                    onChange(null);
                  }}
                >
                  <XIcon height={18} />
                </ActionIcon>
              </div>
              <img src={value.replace('public', '')} />
            </>
          )}
        </div>
      </div>

      <style jsx>
        {`
          input {
            display: none;
          }

          .photo-uploader {
            display: grid;
            background-color: white;
            grid-template-columns: 1fr 1fr;
            margin-bottom: 1rem;
          }

          .photo-uploader,
          .photo-uploader-control,
          .photo-uploader-preview {
            height: 15rem;
          }

          .photo-uploader-control {
            margin: 0;
            display: flex;
            cursor: pointer;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: all 300ms;
            border: 1px solid transparent;
          }

          .photo-uploader-control:hover {
            border-color: #5da731;
          }

          .photo-uploader-control svg {
            height: 8rem;
          }

          .photo-uploader-preview {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
          }

          .photo-uploader-preview svg,
          .photo-uploader-preview img {
            display: block;
          }

          .photo-uploader-preview svg {
            height: 10rem;
          }

          .photo-uploader-preview img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
          }

          .photo-uploader-preview-corner {
            position: absolute;
            top: 0;
            right: 0;
            background: white;
            margin: 0.25rem;
          }
        `}
      </style>
    </>
  );
};

export default PhotoUploader;
