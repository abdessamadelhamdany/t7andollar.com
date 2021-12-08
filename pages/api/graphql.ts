import type { NextApiRequest, NextApiResponse } from 'next'
import { ApolloServer } from 'apollo-server-micro'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { schema } from '../../graphql/schema'
import { createContext } from '../../graphql/context'
import { resolvers } from '../../graphql/resolvers'

const apolloServer = new ApolloServer({
  schema,
  resolvers,
  context: createContext,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
})

const startServer = apolloServer.start()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await startServer
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
}

export const config = {
  api: {
    bodyParser: false,
  },
}
