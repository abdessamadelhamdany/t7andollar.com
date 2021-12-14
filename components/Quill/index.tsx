import 'quill/dist/quill.snow.css';
import Quill from 'quill';
import { debounce } from 'lodash';
import React, { useEffect, useRef } from 'react';
import { HLJS_LANGUAGES } from 'lib/constants';
import classes from './quill.module.scss';

let quill: Quill;

window.hljs.configure({
  languages: HLJS_LANGUAGES,
});

interface Props {
  content: string;
  placeholder?: string;
  setContent?: (content: string) => void;
}

export default function W3Editor({ content, placeholder, setContent }: Props) {
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
            image() {
              console.log('image');
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
      debounce(() => {
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
