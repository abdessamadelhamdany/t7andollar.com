import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  type User {
    id: Int
    name: String
    email: String!
    image: String
    role: String!
    posts: [Post!]!
  }

  type Post {
    id: Int
    image: String
    title: String!
    slug: String!
    body: String
    keywords: [String!]!
    author: User!
  }

  type Query {
    user: User
    users: [User!]!
    posts: [Post!]!
  }
`
