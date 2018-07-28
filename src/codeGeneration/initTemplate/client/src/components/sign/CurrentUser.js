import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { withApollo, graphql, compose } from 'react-apollo'

import { mutateProp } from 'apollo/helpers'
import { Text, Button } from 'ui'
import { REMOVE_AUTH } from './queries'

class User extends Component {
  signout = () => {
    this.props.removeAuth()
  }
  render() {
    const { login } = this.props
    return (
      <Fragment>
        <Text mx={[0, 2]}>{login}</Text>
        <Button buttonStyle="dark" mx={[0, 2]} onClick={this.signout}>
          Signout
        </Button>
      </Fragment>
    )
  }
}

export const CurrentUser = compose(
  withRouter,
  withApollo,
  graphql(REMOVE_AUTH, mutateProp('removeAuth'))
)(User)
