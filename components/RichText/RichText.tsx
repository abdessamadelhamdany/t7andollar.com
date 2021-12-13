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
  AtomicBlockUtils,
  ContentBlock,
  convertToRaw,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import CommandImage, { Media } from './CommandImage';
import CommandButton from './CommandButton';
import classes from './RichText.module.scss';
import CommandLink, { linkDraftDecorator } from './CommandLink';

interface Props {
  initialHTML?: string;
  onChange(content: string): void;
  dir?: 'LTR' | 'RTL' | 'NEUTRAL';
}

const RichText: FC<Props> = ({ initialHTML, onChange, dir }) => {
  const editor = useRef<Editor>(null);
  const [editorState, setEditorState] = useState(
    makeInitialState(initialHTML, [linkDraftDecorator])
  );

  const _onChange = (editorState: EditorState) => {
    const contentState = editorState.getCurrentContent();
    const contentRaw = convertToRaw(contentState);
    const contentHTML = draftToHtml(contentRaw);

    setEditorState(editorState);

    onChange(contentHTML);
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      _onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  const makeToggleInlineStyleHandler = (inlineStyle: string) => {
    return () => {
      _onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
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

  const onCommandImageChosen = (urlValue: string) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'IMAGE',
      'IMMUTABLE',
      { src: urlValue }
    );

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });

    setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')
    );
  };

  const blockRendererFn = (block: ContentBlock) => {
    if (block.getType() === 'atomic') {
      return {
        component: Media,
        editable: false,
      };
    }

    return null;
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
          <CommandImage onCommandImageChosen={onCommandImageChosen} />
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
          onChange={_onChange}
          editorState={editorState}
          blockRendererFn={blockRendererFn}
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
