const express = require('express')
const { postgraphile } = require('postgraphile')
const PostGraphileConnectionFilterPlugin = require('postgraphile-plugin-connection-filter')

const { user, password } = require('./creditional.json')

const app = express()
const host = 'localhost'
const port = 5432
const PORT = 4000

const pgql_config = {
  user,
  password,
  host,
  port,
  database: '#DB#'
}

const pgql_schemas = ['main']

const pgql_options = {
  graphiql: true,
  pgDefaultRole: '#DB_DEFAULT_ROLE#',
  jwtSecret: '#JWT_SECRET#',
  jwtPgTypeIdentifier: 'main.jwt_token',
  appendPlugins: [PostGraphileConnectionFilterPlugin],
  enableCors: true
}

app.use(postgraphile(pgql_config, pgql_schemas, pgql_options))

app.listen(PORT, () =>
  console.log(`GraphQL Server is now running on http://${host}:${PORT}`)
)
