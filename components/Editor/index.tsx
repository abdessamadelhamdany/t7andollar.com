import { debounce } from 'lodash';
import React, { FC } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface Props {
  initialHtml?: string;
  onChange: (html: string) => void;
}

const Editor: FC<Props> = ({ initialHtml, onChange }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        language: {
          content: 'ar',
          ui: 'en',
        },
        placeholder: 'محتوى المقال',
        ckfinder: {
          uploadUrl: '/api/upload/photo',
        },
      }}
      data={initialHtml || ''}
      onReady={(editor) => {
        console.log('Editor is ready to use!', editor);
      }}
      onChange={debounce((_event, editor) => {
        onChange(editor.getData());
      }, 500)}
      onBlur={(event, editor) => {
        console.log('Blur.', editor);
      }}
      onFocus={(event, editor) => {
        console.log('Focus.', editor);
      }}
    />
  );
};

export default Editor;
