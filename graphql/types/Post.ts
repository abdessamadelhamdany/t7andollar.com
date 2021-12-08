import { Post as PostModel } from '@prisma/client';
import { arg, extendType, intArg, nonNull, objectType, stringArg } from 'nexus';
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

// Pagination Object Types
export const Edge = objectType({
  name: 'Edge',
  definition(t) {
    t.int('cursor');
    t.field('node', {
      type: Post,
    });
  },
});

export const PageInfo = objectType({
  name: 'PageInfo',
  definition(t) {
    t.int('endCursor');
    t.boolean('hasNextPage');
  },
});

export const Response = objectType({
  name: 'Response',
  definition(t) {
    t.field('pageInfo', { type: PageInfo });
    t.list.field('edges', { type: Edge });
  },
});

// Post's Query
export const PostsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('posts', {
      type: 'Response',
      args: {
        first: nonNull(intArg()),
        after: intArg(),
      },
      async resolve(_parent, args, ctx) {
        let queryResults: PostModel[] = [];

        if (args.after) {
          queryResults = await ctx.prisma.post.findMany({
            take: args.first,
            skip: 1,
            cursor: {
              id: args.after,
            },
          });
        } else {
          queryResults = await ctx.prisma.post.findMany({
            take: args.first,
          });
        }

        if (queryResults.length > 0) {
          const lastPostInResults = queryResults[queryResults.length - 1];
          const myCursor = lastPostInResults.id;

          const secondQueryResults = await ctx.prisma.post.findMany({
            take: args.first,
            cursor: {
              id: myCursor,
            },
          });

          return {
            pageInfo: {
              endCursor: myCursor,
              hasNextPage: secondQueryResults.length >= args.first,
            },
            edges: queryResults.map((post) => ({
              cursor: post.id,
              node: post,
            })),
          };
        }

        return {
          pageInfo: {
            endCursor: null,
            hasNextPage: false,
          },
          edges: [],
        };
      },
    });
  },
});
