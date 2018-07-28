import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'

import { createApolloLinkState } from './createApolloLinkState'
import { AUTH } from 'components/sign/queries'

export const createApolloLink = (uri, cache) => {
  const authLink = new ApolloLink((operation, forward) => {
    const { auth } = cache.readQuery({ query: AUTH })
    if (auth) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${auth.token}`
        }
      })
    }
    return forward(operation)
  })

  const errorLink = onError(({ networkError, graphQLErrors }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      )
    if (networkError) {
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }
  })

  const httpLink = new HttpLink({ uri })

  return ApolloLink.from([
    createApolloLinkState(cache),
    authLink,
    errorLink,
    httpLink
  ])
}
