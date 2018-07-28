import gql from 'graphql-tag.macro'

export const AUTH_MUTATION = gql`
  mutation authenticate($login: String!, $password: String!) {
    authenticate(input: { login: $login, password: $password }) {
      clientMutationId
      jwtToken
    }
  }
`

export const REG_MUTATION = gql`
  mutation register($login: String!, $name: String!, $password: String!) {
    register(input: { login: $login, name: $name, password: $password }) {
      clientMutationId
    }
    authenticate(input: { login: $login, password: $password }) {
      jwtToken
    }
  }
`

export const ADD_AUTH = gql`
  mutation addAuth($token: String!, $login: String) {
    addAuth(token: $token, login: $login) @client
  }
`

export const REMOVE_AUTH = gql`
  mutation removeAuth {
    removeAuth @client
  }
`

export const AUTH = gql`
  query auth {
    auth @client {
      token
      login
    }
  }
`
