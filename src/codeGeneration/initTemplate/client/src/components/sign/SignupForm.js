import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withApollo, graphql, compose } from 'react-apollo'
import { Form } from 'react-final-form'

import { renderInput, subscription } from 'ui/utils'
import { mutateProp } from 'apollo/helpers'
import { Card, Button } from 'ui'
import { ADD_AUTH, REG_MUTATION } from './queries'
import { addToken } from './helpers'

class SignupForm extends Component {
  onSubmit = async values => {
    const { client, history, signUp, addAuth } = this.props
    try {
      const { data } = await signUp({ ...values })
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
            {renderInput('name', 'Name', 'Input name')}
            {renderInput('password', 'Password', 'Input password')}
            <Button disabled={submitting}>Signup</Button>
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
  graphql(REG_MUTATION, mutateProp('signUp'))
)(SignupForm)
