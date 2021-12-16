import 'quill/dist/quill.snow.css';
import { debounce } from 'lodash';
import Quill from 'quill';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { HLJS_LANGUAGES } from 'lib/constants';
import classes from './quill.module.scss';

let quill: Quill;

window.hljs.configure({
  languages: HLJS_LANGUAGES,
});

interface Props {
  content: string;
  setContent?: (content: string) => void;
  placeholder?: string;
}

const onImageInputChange = async (fileInput: HTMLInputElement) => {
  if (!fileInput.files) {
    console.warn('no file was chosen');
    return;
  }

  if (!fileInput.files || fileInput.files.length === 0) {
    console.warn('files list is empty');
    return;
  }

  var formData = new FormData();
  for (let i = 0; i < fileInput.files.length; i++) {
    const file = fileInput.files[i];
    formData.append('photos', file);
  }

  const res = await fetch('/api/upload/photos', {
    method: 'POST',
    body: formData,
  });
  const { data: uploadedPhotos } = await res.json();

  const range = quill.getSelection();
  uploadedPhotos.forEach(({ path, alt } = { path: '', alt: '' }) => {
    quill.insertEmbed(range.index, 'image', path.replace('public', ''));
    quill.setSelection(range.index + 1, 0);
  });
};

export default function W3Editor({ content, setContent, placeholder }: Props) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const toolbarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    quill = new Quill(editorRef.current || '', {
      theme: 'snow',
      modules: {
        syntax: true,
        toolbar: {
          container: toolbarRef.current,
          handlers: {
            link: function (value) {
              if (value) {
                var href = prompt('Enter the URL');
                quill.format('link', href);
              } else {
                quill.format('link', false);
              }
            },
            image() {
              const fileInput = document.createElement('input');
              fileInput.setAttribute('type', 'file');
              fileInput.setAttribute('name', 'file');
              fileInput.setAttribute('accept', 'image/*');
              fileInput.setAttribute('multiple', '');
              fileInput.onchange = async () => {
                await onImageInputChange(fileInput);
              };
              fileInput.click();
            },
          },
        },
      },
      placeholder,
    });

    /** Initialize editor content */
    quill.clipboard.dangerouslyPasteHTML(0, content);

    /** Syncronize editor content state */
    quill.on(
      'text-change',
      debounce(async () => {
        const html = quill.root.innerHTML;
        setContent && setContent(html);
      }, 500)
    );
  }, []);

  return (
    <>
      <div className={classes.editorWrapper}>
        <div
          className={classes.editorToolbar}
          ref={toolbarRef}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
        >
          <span className="ql-formats">
            <button className="ql-clean"></button>
            <button className="ql-script" value="sub"></button>
            <button className="ql-script" value="super"></button>
          </span>

          <span className="ql-formats">
            <button className="ql-list" value="ordered"></button>
            <button className="ql-list" value="bullet"></button>
            <select className="ql-align"></select>
          </span>

          <span className="ql-formats">
            <button className="ql-link"></button>
            <button className="ql-image"></button>
            <button className="ql-video"></button>
          </span>

          <span className="ql-formats">
            <button className="ql-code"></button>
            <button className="ql-italic"></button>
            <button className="ql-bold"></button>
          </span>

          <span className="ql-formats">
            <select className="ql-header" defaultValue="0">
              <option value="0">فقرة</option>
              <option value="4">عنوان 4</option>
              <option value="3">عنوان 3</option>
              <option value="2">عنوان 2</option>
            </select>
            <button className="ql-blockquote"></button>
            <button className="ql-code-block"></button>
          </span>
        </div>

        <div className={classes.editor} ref={editorRef}></div>
      </div>
    </>
  );
}
