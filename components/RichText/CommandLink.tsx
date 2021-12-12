import React, { FC, MouseEvent, useEffect, useState } from 'react';
import Input from '../Input';
import CommandButton from './CommandButton';
import classes from './CommandLink.module.scss';

interface Props {
  onCommandLinkEnter(urlValue: string): void;
}

const CommandLink: FC<Props> = ({ onCommandLinkEnter }) => {
  const [commandLinkUrlValue, setCommandLinkUrlValue] = useState('');
  const [commandLinkPopupOpen, setCommandLinkPopupOpen] = useState(false);

  const closeCommandLinkPopup = () => {
    setCommandLinkPopupOpen(false);
  };

  const openCommandLinkPopup = () => {
    setCommandLinkPopupOpen(true);
  };

  useEffect(() => {
    document.addEventListener('click', closeCommandLinkPopup);
    return () => {
      document.removeEventListener('click', closeCommandLinkPopup);
    };
  }, []);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openCommandLinkPopup();
  };

  return (
    <div className={classes.commandLink} onClick={(e) => e.stopPropagation()}>
      <CommandButton icon="link" onClick={handleClick} />

      <div
        className={[
          classes.commandLinkPopup,
          commandLinkPopupOpen ? classes.commandLinkPopupOpen : '',
        ].join(' ')}
      >
        <Input
          className={classes.commandLinkInput}
          type="text"
          placeholder="https://"
          value={commandLinkUrlValue}
          onKeyUp={(e) => {
            if (e.code === 'Enter') {
              onCommandLinkEnter(commandLinkUrlValue);
              setCommandLinkUrlValue('');
            }
          }}
          onChange={(e) => {
            e.preventDefault();
            setCommandLinkUrlValue(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export const Link = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return <a href={url}>{props.children}</a>;
};

export const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    );
  }, callback);
};

export const linkDraftDecorator = {
  strategy: findLinkEntities,
  component: Link,
};

export default CommandLink;
