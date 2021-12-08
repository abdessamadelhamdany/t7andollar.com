import { objectType, enumType, extendType } from 'nexus';
import { Post } from '.';

const Role = enumType({ name: 'Role', members: ['USER', 'ADMIN'] });

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id');
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

export const UsersQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('users', {
      type: 'User',
      resolve(parent, _arg, ctx) {
        return ctx.prisma.user.findMany();
      },
    });
  },
});
