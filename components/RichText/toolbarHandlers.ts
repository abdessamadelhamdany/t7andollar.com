import { RichUtils } from 'draft-js';

export const handleBoldClick = (editorState) => {
  return () => RichUtils.toggleInlineStyle(editorState, 'BOLD');
};
