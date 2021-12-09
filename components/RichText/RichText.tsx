import 'draft-js/dist/Draft.css';
import React, { FC, useRef, useState } from 'react';
import { Editor, EditorState, ContentState, RichUtils } from 'draft-js';
import CommandLink from './CommandLink';
import CommandButton from './CommandButton';
import classes from './RichText.module.scss';

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
      <div className={classes.toolabr}>
        <div className={classes.toolabarGroup}>
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
        <div className={classes.toolabarGroup}>
          <CommandLink
            onCommandLinkEnter={(href) => {
              console.log('href:', href);
            }}
          />
        </div>
      </div>
      <div
        className={classes.editorWrapper}
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
    </>
  );
};

export default RichText;
