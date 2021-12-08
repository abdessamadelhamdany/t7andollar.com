import 'draft-js/dist/Draft.css';
import React, { FC, useState } from 'react';
import { Editor, EditorState, ContentState, RichUtils } from 'draft-js';

const makeInitialState = (initialHTML = '') => {
  return EditorState.createWithContent(
    ContentState.createFromText(initialHTML)
  );
};

interface Props {
  initialHTML?: string;
}

const RichText: FC<Props> = ({ initialHTML }) => {
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

  return (
    <div className="editor">
      <Editor
        onChange={onChange}
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
      />
      <style jsx>{`
        .editor {
          border: 1px solid #ccc;
          padding: 1rem;
        }
      `}</style>
    </div>
  );
};

export default RichText;
