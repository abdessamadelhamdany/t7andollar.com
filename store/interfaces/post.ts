import { Category, Tag, Post as PrismaPost, User } from '@prisma/client';

export interface PostForm extends Partial<PrismaPost> {
  categories?: Category[];
  tags?: Tag[];
}

export interface Post extends PostForm {
  author: Partial<User>;
}

export interface PostState {
  post: Post;
  posts: Post[];
  postForm: PostForm;
  categories: Category[];
  tags: Tag[];
}

export interface InitialPostState {
  post?: PostForm;
  categories?: Category[];
  tags?: Tag[];
}
