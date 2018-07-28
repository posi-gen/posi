import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'

import { createApolloLink } from './createApolloLink'

export const createApolloClient = async uri => {
  const cache = new InMemoryCache()
  const link = createApolloLink(uri, cache)
  await persistCache({
    cache,
    storage: window.localStorage
  })
  return new ApolloClient({
    link,
    cache,
    queryDeduplication: false,
    connectToDevTools: true,
    addTypename: true
  })
}
