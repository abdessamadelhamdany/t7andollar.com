import posts from '../data/posts'
import prisma from '../lib/prisma'
import { Context } from './context'

export const resolvers = {
  Query: {
    users: async (_parent, _args, ctx: Context, _info) => {
      return await ctx.prisma.user.findMany()
    },
    posts: async (_parent, _args, ctx: Context, _info) => {
      return await ctx.prisma.post.findMany()
    },
  },
}
