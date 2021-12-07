import { objectType, enumType } from 'nexus';
import { Post } from '.';

const Role = enumType({ name: 'Role', members: ['USER', 'ADMIN'] });

export const User = objectType({
  name: 'User',
  definition(t) {
    t.id('id');
    t.string('name');
    t.string('email');
    t.string('image');
    t.field('role', { type: Role });
    t.list.field('posts', {
      type: Post,
      async resolve(parent, _args, ctx) {
        return ctx.prisma.user
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .posts();
      },
    });
  },
});
