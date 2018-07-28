const { pluralizeName } = require('./queries')
const { getPageComponentName } = require('./tables/page')

const createMain = tables => {
  const tableNames = Object.keys(tables)
  const tableToImport = (acc, tableName) =>
    acc +
    `
import { ${getPageComponentName(tableName)} } from 'tables/${pluralizeName(
      tableName
    )}/${getPageComponentName(tableName)}'`

  const tableToRoute = (acc, tableName) =>
    acc +
    `
    <Route path="/${pluralizeName(tableName)}" render={${getPageComponentName(
      tableName
    )}} />`

  return `
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { SigninPage, SignupPage } from 'components/sign'
${tableNames.reduce(tableToImport, '')}

export const Main = () => (
  <Switch>${tableNames.reduce(tableToRoute, '')}
    <Route path="/signin" render={SigninPage} />
    <Route path="/signup" component={SignupPage} />
  </Switch>
)  
  `
}

module.exports = { createMain }
