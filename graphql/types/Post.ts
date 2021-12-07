import { objectType } from 'nexus';
import { User } from '.';

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.id('id');
    t.string('image');
    t.string('title');
    t.string('slug');
    t.string('body');
    t.list.string('keywords');
    t.field('author', {
      type: User,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.post
          .findUnique({
            where: { id: parent.id },
          })
          .author();
      },
    });
  },
});
