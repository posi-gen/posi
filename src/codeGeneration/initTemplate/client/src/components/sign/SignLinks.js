import React, { Fragment } from 'react'
import { graphql } from 'react-apollo'

import { Tab, NavLink } from 'ui'
import { CurrentUser } from './CurrentUser'
import { AUTH } from './queries'

export const Sign = ({ auth }) => (
  <Fragment>
    {auth ? (
      <CurrentUser login={auth.login} />
    ) : (
      <Fragment>
        <Tab is={NavLink} mx={[0, 2]} to={'/signin'}>
          Signin
        </Tab>
        <Tab is={NavLink} mx={[0, 2]} to={'/signup'}>
          Signup
        </Tab>
      </Fragment>
    )}
  </Fragment>
)

const configObject = {
  props: ({ data: { loading, error, auth } }) => ({
    loading,
    error,
    auth
  })
}
export const SignLinks = graphql(AUTH, configObject)(Sign)
