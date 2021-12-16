import { Category, Tag, Post } from '@prisma/client';

export interface PostForm extends Partial<Post> {
  categories?: Category[];
  tags?: Tag[];
}

export interface PostState {
  postForm: PostForm;
  categories: Category[];
  tags: Tag[];
}
