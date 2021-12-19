import { Category, Tag, Post as PrismaPost } from '@prisma/client';

export interface PostForm extends Partial<PrismaPost> {
  categories?: Category[];
  tags?: Tag[];
}

export type Post = PostForm;

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
