import { Tag } from '@prisma/client';

export interface TagForm extends Partial<Tag> {}

export interface TagState {
  tagForm: TagForm;
  tags: Tag[];
}
