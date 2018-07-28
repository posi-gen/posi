import React from 'react'

import { Page } from 'ui'

import SigninForm from './SigninForm'
import SignupForm from './SignupForm'
export { SignLinks } from './SignLinks'

export const SigninPage = () => (
  <Page title="Signin">
    <SigninForm />
  </Page>
)

export const SignupPage = () => (
  <Page title="Signup">
    <SignupForm />
  </Page>
)
