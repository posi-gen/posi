import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withApollo, graphql, compose } from 'react-apollo'
import { Form } from 'react-final-form'

import { subscription, renderInput } from 'ui/utils'
import { mutateProp } from 'apollo/helpers'
import { Card, Button } from 'ui'
import { AUTH_MUTATION, ADD_AUTH } from './queries'
import { addToken } from './helpers'

class SigninForm extends Component {
  onSubmit = async values => {
    const { client, authenticate, history, addAuth } = this.props
    try {
      const { data } = await authenticate({ ...values })
      addToken({ addAuth, ...values, data, client, history })
    } catch (error) {
      console.log('there was an error sending the query', error)
    }
  }

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        subscription={subscription}
        render={({ handleSubmit, submitting }) => (
          <Card is="form" flexDirection="column" onSubmit={handleSubmit}>
            {renderInput('login', 'Login', 'Input login')}
            {renderInput('password', 'Password', 'Input password')}
            <Button disabled={submitting}>Signin</Button>
          </Card>
        )}
      />
    )
  }
}

export default compose(
  withRouter,
  withApollo,
  graphql(ADD_AUTH, mutateProp('addAuth')),
  graphql(AUTH_MUTATION, mutateProp('authenticate'))
)(SigninForm)
