const { pascalCase, titleCase, camelCase } = require('change-case')

const { queryName, mutationName, pluralizeName } = require('../queries')

const notSerial = el =>
  !(
    el.type === 'SERIAL' ||
    el.type === 'BIGSERIAL' ||
    el.type === 'SMALLSERIAL'
  )

const createForm = (tables, tableName) => {
  const queryName_ = queryName(tableName)
  const mutationName_ = mutationName(tableName)
  const pkey = tables[tableName].pkey
  const getName = getFormFileName(tableName)
  const fileName = getName('file')
  const columnsArray = Object.values(tables[tableName].columns).filter(
    notSerial
  )

  const columnToJSX = (acc, { key, fkey }) =>
    acc +
    `
            <Field
              name="${camelCase(key)}"${
      fkey ? `\n              fkey='${fkey}'` : ''
    }
              label="${titleCase(key)}"
              component={${!fkey ? 'InputAdapter' : 'SelectAdapter'}}
              type="text"
              placeholder="${!fkey ? 'Insert' : 'Select'} ${titleCase(key)}"
            />`

  return `
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { Form, Field } from 'react-final-form'
import { Prompt } from 'react-router'

import { objectDifference, getPatch, getInitValues } from 'utils'
import { required, subscription, SelectAdapter, InputAdapter } from 'ui/utils'
import { Box, Card, Button } from 'ui'
import { mutateProp } from 'apollo/helpers'
import { ${queryName_('read')}, ${queryName_('create')}, ${queryName_(
    'update'
  )} } from './queries'

class ${fileName} extends Component {
  onSubmit = async values => {
    const { ${tableName}, ${mutationName_('create')}, ${mutationName_(
    'update'
  )}, history } = this.props
    const { nodeId,  ...initialValues } = ${tableName} || {}
    const diff = objectDifference(values, initialValues)
    const ${tableName}Patch = getPatch(diff)
    try {
      if (${tableName}) {
        await ${mutationName_('update')}({ nodeId, ${tableName}Patch })
      } else {
        const { data } = await ${mutationName_('create')}({ ${tableName}Patch })
        const rowId = data.${mutationName_('create')}.${tableName}.${camelCase(
    pkey
  ) || 'nodeId'}
        history.replace('/${pluralizeName(tableName)}/' + rowId)
      }
    } catch (error) {
      console.log('there was an error sending the query', error)
    }
  }

  render() {
    const { ${tableName}, initialValues } = this.props${
    pkey
      ? `
    const { ${camelCase(pkey)} } = ${tableName} || {}`
      : ''
  }
    return (
      <Form
        onSubmit={this.onSubmit}
        initialValues={initialValues}
        subscription={subscription}
        render={({ handleSubmit, form: { reset }, submitting, pristine }) => (
          <Card is="form" flexDirection="column" onSubmit={handleSubmit}>
            <Prompt
              when={!pristine${pkey ? ` && !!${camelCase(pkey)}` : ''}}
              message="Are you sure you want to leave?"
            />${columnsArray.reduce(columnToJSX, '')}
            <Box>
              <Button type="submit" disabled={submitting}>
                {!!${tableName} ? 'Update' : 'Create'}
              </Button>
              <Button type="button" onClick={reset} disabled={pristine}>
                Reset
              </Button>
            </Box>
          </Card>
        )}
      />
    )
  }
}

const props = ({ data: { loading, error, ${tableName} } }) => ({
  loading,
  error,
  ${tableName}
})

const config = {
  options: ({
    match: {
      params: { ${tableName}: id }
    }
  }) => ({
    variables: { id, isList: false },
    fetchPolicy: 'cache-and-network'
  }),
  props
}

export const ${getName('create')} = graphql(
  ${queryName_('create')},
  mutateProp('${mutationName_('create')}', getInitValues('${tableName}'))
)(${fileName})

export const ${getName('update')} = compose(
  graphql(${queryName_('read')}, config),
  graphql(${queryName_('update')}, mutateProp('${mutationName_(
    'update'
  )}', getInitValues('${tableName}')))
)(${fileName})
`
}

const getFormFileName = tableName => type => {
  switch (type) {
    case 'file':
      return pascalCase(tableName + ' form')
    case 'create':
      return pascalCase('create ' + tableName + ' form')
    case 'update':
      return pascalCase('update ' + tableName + ' form')
    default:
      return ''
  }
}

module.exports = { createForm, getFormFileName }
