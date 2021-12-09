import 'draft-js/dist/Draft.css';
import React, { FC, useRef, useState } from 'react';
import { Editor, EditorState, ContentState, RichUtils } from 'draft-js';
import CommandButton from './CommandButton';

const makeInitialState = (initialHTML = '') => {
  return EditorState.createWithContent(
    ContentState.createFromText(initialHTML)
  );
};

interface Props {
  initialHTML?: string;
  dir?: 'LTR' | 'RTL' | 'NEUTRAL';
}

const RichText: FC<Props> = ({ initialHTML, dir }) => {
  const editor = useRef<Editor>(null);
  const [editorState, setEditorState] = useState(makeInitialState(initialHTML));

  const onChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  const makeToggleInlineStyleHandler = (inlineStyle: string) => {
    return () => {
      onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="toolabr col-md-8">
          <CommandButton
            icon="bold"
            onClick={makeToggleInlineStyleHandler('BOLD')}
          />
        </div>
        <div
          className="editor-wrapper col-md-8"
          onClick={() => editor.current?.focus()}
        >
          <Editor
            ref={editor}
            placeholder="مرحبا"
            textDirectionality={dir}
            onChange={onChange}
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
          />
        </div>
      </div>

      <style jsx>{`
        .toolabr {
          padding: 0.5rem;
          margin-bottom: 0.5rem;
          background: rgb(255, 255, 255);
          border: 1px solid rgb(243, 243, 243);
        }
        .editor-wrapper {
          border: 1px solid rgb(243, 243, 243);
          padding: 1rem 0.5rem;
          background: rgb(255, 255, 255);
        }
      `}</style>
    </>
  );
};

export default RichText;
