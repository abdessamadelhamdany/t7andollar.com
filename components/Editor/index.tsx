import React, { FC } from 'react';
import ReactQuill from 'react-quill';

interface Props {
  placeholder: string;
  value: string;
  onChange: (html: string) => void;
}

const Editor: FC<Props> = ({ placeholder, value, onChange }) => {
  return (
    <ReactQuill
      theme="snow"
      onChange={onChange}
      value={value}
      modules={{
        toolbar: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ size: [] }],
          [
            'bold',
            'italic',
            'underline',
            'strike',
            'blockquote',
            'code',
            'code-block',
          ],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image', 'video'],
          ['clean'],
        ],
        clipboard: {
          // toggle to add extra line breaks when pasting HTML:
          matchVisual: false,
        },
      }}
      formats={[
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'code',
        'code-block',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
      ]}
      bounds={'.app'}
      placeholder={placeholder}
    />
  );
};

export default Editor;
