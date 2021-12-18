import { Category, Tag, Post } from '@prisma/client';

export interface PostForm extends Partial<Post> {
  categories?: Category[];
  tags?: Tag[];
}

export interface PostState {
  post: PostForm;
  postForm: PostForm;
  categories: Category[];
  tags: Tag[];
}

export interface InitialPostState {
  post: PostForm;
  categories: Category[];
  tags: Tag[];
}
