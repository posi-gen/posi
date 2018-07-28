export const addToken = async ({ addAuth, login, data, client, history }) => {
  const token = data.authenticate.jwtToken
  if (token) {
    await client.resetStore()
    addAuth({ token, login })
    history.replace('/')
  } else {
    console.log('undef user')
  }
}
