import posts from '../data/posts'

export const resolvers = {
  Query: {
    user() {
      return {
        id: 1,
        name: 'admin',
        email: 'admin@gmail.com',
        role: 'ADMIN',
      }
    },
    users() {
      return [
        {
          id: 1,
          name: 'admin',
          email: 'admin@gmail.com',
          role: 'ADMIN',
        },
      ]
    },
    posts() {
      return posts
    },
  },
}
