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
      <div>
        <div className="toolabr rounded">
          <CommandButton
            icon="bold"
            onClick={makeToggleInlineStyleHandler('BOLD')}
          />
        </div>
        <div
          className="editor-wrapper rounded"
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
          padding: 0.5rem 1rem;
          margin-bottom: 1rem;
          background: rgb(255, 255, 255);
          box-shadow: rgb(33 33 52 / 10%) 0px 1px 4px;
        }
        .editor-wrapper {
          border: 1px solid rgb(243, 243, 243);
          padding: 1rem 1.25rem 3rem;
          background: rgb(255, 255, 255);
          box-shadow: rgb(33 33 52 / 10%) 0px 1px 4px;
        }
      `}</style>
    </>
  );
};

export default RichText;
