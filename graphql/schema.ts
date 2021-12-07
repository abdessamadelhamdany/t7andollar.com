// import { gql } from 'apollo-server-micro'

// export const typeDefs = gql`
//   type User {
//     id: Int
//     name: String
//     email: String!
//     image: String
//     role: String!
//     posts: [Post!]!
//   }

//   type Post {
//     id: Int
//     image: String
//     title: String!
//     slug: String!
//     body: String
//     keywords: [String!]!
//     author: User!
//   }

//   type Query {
//     users: [User!]!
//     posts: [Post!]!
//   }
// `

import { join } from 'path'
import { makeSchema } from 'nexus'

const rootDir = process.cwd()

export const schema = makeSchema({
  types: [],
  outputs: {
    schema: join(rootDir, 'graphql/schema.graphql'),
    typegen: join(rootDir, 'node_modules/@types/nexus-typegen', 'index.d.ts'),
  },
  contextType: {
    export: 'Context',
    module: join(rootDir, 'graphql/context.ts'),
  },
})
