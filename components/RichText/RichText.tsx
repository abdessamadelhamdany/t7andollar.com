import 'draft-js/dist/Draft.css';
import React, { FC, useRef, useState } from 'react';
import {
  Editor,
  EditorState,
  ContentState,
  RichUtils,
  CompositeDecorator,
  DraftDecorator,
  convertFromHTML,
} from 'draft-js';
import CommandButton from './CommandButton';
import classes from './RichText.module.scss';
import CommandLink, { linkDraftDecorator } from './CommandLink';

interface Props {
  initialHTML?: string;
  dir?: 'LTR' | 'RTL' | 'NEUTRAL';
}

const RichText: FC<Props> = ({ initialHTML, dir }) => {
  const editor = useRef<Editor>(null);
  const [editorState, setEditorState] = useState(
    makeInitialState(initialHTML, [linkDraftDecorator])
  );

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

  const onCommandLinkEnter = (urlValue: string) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      { url: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });

    setEditorState(
      RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      )
    );

    setTimeout(() => editor.current?.focus(), 0);
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
          <CommandLink onCommandLinkEnter={onCommandLinkEnter} />
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

const makeInitialState = (
  initialHTML = '',
  draftDecorators: Array<DraftDecorator>
) => {
  const blocksFromHTML = convertFromHTML(initialHTML);
  const contentState = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  const decorators = new CompositeDecorator(draftDecorators);
  const editorState = EditorState.createWithContent(contentState, decorators);

  return editorState;
};

export default RichText;
