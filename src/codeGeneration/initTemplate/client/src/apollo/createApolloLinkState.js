import { withClientState } from 'apollo-link-state'

const defaults = {
  auth: null
}

const typeDefs = `
  type Auth {
    token: String!
    login String
  }

  type Mutation {
    addAuth(token: String!, login: String): Boolean
    removeAuth: Boolean
  }
  
  type Query {
    auth: Auth
  }
`

const resolvers = {
  Mutation: {
    addAuth: (_, { token, login }, { cache }) => {
      const auth = { token, login, __typename: 'AuthItem' }
      cache.writeData({ data: { auth } })
      return true
    },
    removeAuth: (_, variables, { cache }) => {
      cache.writeData({ data: { auth: null } })
      return true
    }
  }
}

export const createApolloLinkState = cache =>
  withClientState({
    resolvers,
    defaults,
    cache,
    typeDefs
  })
