import React, { MouseEvent } from 'react';
import Input from '../Input';
import CommandButton from './CommandButton';
import classes from './CommandLink.module.scss';

const CommandLink = () => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <div className={classes.commandLink}>
      <CommandButton icon="link" onClick={handleClick} />

      <div className={classes.commandLinkPopup}>
        <Input
          className={classes.commandLinkInput}
          type="text"
          placeholder="https://"
        />
      </div>
    </div>
  );
};

export default CommandLink;
