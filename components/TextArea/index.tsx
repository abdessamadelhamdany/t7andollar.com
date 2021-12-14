import React, { FC, TextareaHTMLAttributes } from 'react';

const TextArea: FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  ...props
}) => {
  return (
    <>
      <textarea {...props}></textarea>
      <style jsx>
        {`
          textarea {
            width: 100%;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            padding: 0.75rem 0.5rem;
            background: rgb(255, 255, 255);
            border: 1px solid rgb(243, 243, 243);
          }

          textarea:focus {
            outline: none;
            border-color: #5da731;
          }
        `}
      </style>
    </>
  );
};

export default TextArea;
