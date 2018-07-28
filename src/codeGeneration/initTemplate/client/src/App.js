import React, { Component, Fragment } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'

import { createApolloClient } from 'apollo'
import { Flex, Loader } from 'ui'
import { Navbar, SideBar, Main } from 'components'

export class App extends Component {
  state = { client: null, loaded: false }
  async componentDidMount() {
    const client = await createApolloClient('http://localhost:4000/graphql')
    this.setState({ client, loaded: true })
  }
  render() {
    const { client, loaded } = this.state
    if (!loaded) {
      return <Loader />
    }
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Fragment>
            <Navbar />
            <Flex flexDirection={['column', 'row']}>
              <SideBar />
              <Main />
            </Flex>
          </Fragment>
        </BrowserRouter>
      </ApolloProvider>
    )
  }
}
