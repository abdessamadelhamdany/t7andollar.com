import { extendType, objectType } from 'nexus';
import { User } from '.';

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.nonNull.int('id');
    t.string('image');
    t.string('title');
    t.string('slug');
    t.string('body');
    t.list.string('keywords');
    t.field('author', {
      type: User,
      resolve(parent, _args, ctx) {
        return ctx.prisma.post
          .findUnique({
            where: { id: parent.id },
          })
          .author();
      },
    });
  },
});

export const PostsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('posts', {
      type: 'Post',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.post.findMany();
      },
    });
  },
});
