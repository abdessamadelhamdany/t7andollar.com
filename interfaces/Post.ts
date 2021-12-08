export interface Post {
  id: number;
  title: string;
  category: {
    name: string;
    slug: string;
  };
  slug: string;
  excerpt: string;
  thumbnail: string;
  source: string;
  body: string;
  author: {
    name: string;
    username: string;
  };
  readingTime: string;
  publishedAt: string;
}
