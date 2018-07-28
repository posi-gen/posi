const { pascalCase, titleCase } = require('change-case')
// const { camelCase } = require('change-case')
const { pluralizeName } = require('../queries')
// const { queryName, mutationName } = require('../queries')
const { getListComponentName } = require('./list')
const { getFormFileName } = require('./form')
const { getDependentTables } = require('../../engine')

const createPage = (tables, tableName) => {
  const ListComponentName = getListComponentName(tableName)
  const formFileName = getFormFileName(tableName)
  const dependentTables = getDependentTables(tables, tableName)
  const tableToNavLink = (acc, el) =>
    acc +
    `
      <Tab is={NavLink} to={\`\${match.url}/${pluralizeName(el)}\`}>
        ${titleCase(pluralizeName(el))}
      </Tab> `

  const depTablesToImport = (acc, el) =>
    acc +
    `
  import { ${getListComponentName(el)} } from 'tables/${pluralizeName(
      el
    )}/${getListComponentName(el)}'`

  const depTablesToRoute = (acc, el) =>
    acc +
    `
        <Route exact path={\`\${match.path}/:${tableName}/${pluralizeName(
      el
    )}\`} component={${getListComponentName(el)}} />`

  return `
  import React from 'react'
  import { Route, Switch } from 'react-router-dom'
  
  import { Page, Flex, Tabs, Tab, NavLink } from 'ui'
  import { ${ListComponentName} } from './${ListComponentName}'
  import { ${formFileName('create')}, ${formFileName(
    'update'
  )} } from './${formFileName('file')}'${dependentTables.reduce(
    depTablesToImport,
    ''
  )}
  
  const RefTabs = ({ match }) => (
    <Tabs
      is={Flex}
      my={2}
      borderColor="darken1"
      flexDirection={['column', 'row']}
    >
      <Tab is={NavLink} exact to={\`\${match.url}\`}>
        Main
      </Tab>${dependentTables.reduce(tableToNavLink, '')}
    </Tabs>
  )
  
  export const ${getPageComponentName(tableName)} = ({ match }) => (
    <Page>
      <Route exact path="/${pluralizeName(
        tableName
      )}" component={${ListComponentName}} />
      <Route path={\`\${match.path}/:${tableName}\`} component={RefTabs} />
      <Switch>
        <Route exact path={\`\${match.path}/create\`} component={${formFileName(
          'create'
        )}} />
        <Route exact path={\`\${match.path}/:${tableName}\`} component={${formFileName(
    'update'
  )}} />${dependentTables.reduce(depTablesToRoute, '')}
      </Switch>
    </Page>
  )  
  `
}

const getPageComponentName = tableName =>
  pascalCase(pluralizeName('page ' + tableName))

module.exports = { createPage, getPageComponentName }
