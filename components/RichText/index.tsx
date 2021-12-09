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
      <div className="toolabr">
        <div className="toolabr-group">
          <CommandButton
            icon="bold"
            onClick={makeToggleInlineStyleHandler('BOLD')}
          />
          <CommandButton
            icon="italic"
            onClick={makeToggleInlineStyleHandler('ITALIC')}
          />
          <CommandButton
            icon="underline"
            onClick={makeToggleInlineStyleHandler('UNDERLINE')}
          />
        </div>
        <div className="toolabr-group">
          <CommandButton
            icon="link"
            onClick={makeToggleInlineStyleHandler('LINK')}
          />
        </div>
      </div>
      <div className="editor-wrapper" onClick={() => editor.current?.focus()}>
        <Editor
          ref={editor}
          placeholder="مرحبا"
          textDirectionality={dir}
          onChange={onChange}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
        />
      </div>

      <style jsx>{`
        .toolabr {
          display: flex;
          gap: 1rem;
          padding: 0.5rem;
          margin-bottom: 0.5rem;
          background: rgb(255, 255, 255);
          border: 1px solid rgb(243, 243, 243);
        }
        .toolabr-group {
          display: flex;
          gap: 0.5rem;
        }
        .editor-wrapper {
          border: 1px solid rgb(243, 243, 243);
          padding: 1rem 0.5rem;
          background: rgb(255, 255, 255);
          min-height: 360px;
        }

        .editor-wrapper.focus {
          outline: none;
          border-color: #5da731;
        }
      `}</style>
    </>
  );
};

export default RichText;
