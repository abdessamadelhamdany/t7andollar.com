import 'draft-js/dist/Draft.css';
import React, { useState } from 'react';
import { Editor, EditorState } from 'draft-js';

const RichText = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onChange = (eState) => {
    setEditorState(eState);
  };

  return <Editor editorState={editorState} onChange={onChange} />;
};

export default RichText;
