import React, { MouseEvent, useEffect, useState } from 'react';
import Input from '../Input';
import CommandButton from './CommandButton';
import classes from './CommandLink.module.scss';

const CommandLink = ({ onCommandLinkEnter }) => {
  const [commandLinkHref, setCommandLinkHref] = useState('');
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
          value={commandLinkHref}
          onKeyUp={(e) => {
            if (e.code === 'Enter') {
              onCommandLinkEnter(commandLinkHref);
            }
          }}
          onChange={(e) => {
            e.preventDefault();
            setCommandLinkHref(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default CommandLink;
