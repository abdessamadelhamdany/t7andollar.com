export interface PostForm {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  thumbnail?: string;
  body?: string;
  published?: boolean;
  keywords?: string[];
  categories?: number[];
  tags?: number[];
}

export interface PostState {
  postForm: PostForm;
}
