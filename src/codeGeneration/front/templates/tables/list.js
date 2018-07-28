const { camelCase, pascalCase, titleCase } = require('change-case')

const {
  queryName,
  mutationName,
  pluralizeName,
  needColumns
} = require('../queries')
const { getRefAndSimple } = require('../../helpers')

const createList = (tables, tableName) => {
  const queryName_ = queryName(tableName)
  const pluralName = pluralizeName(tableName)
  const deleteRow = mutationName(tableName)('delete')
  const { pkey = 'nodeId' } = tables[tableName]
  const pKey = camelCase(pkey)
  const pkeyIsFkey = tables[tableName].fkeys
    ? !!tables[tableName].fkeys[pkey]
    : false

  const columns = needColumns(tables, tableName).filter(el => el.base)
  const { refTypes } = getRefAndSimple(tables, tableName)
  const refTypeToList = (acc, el, i) =>
    acc + (i !== 0 ? ', ' : '') + camelCase(el.fkey)
  const refTypeToObject = (acc, el, i) =>
    acc + (i !== 0 ? ', ' : '') + camelCase(el.key) + ': ' + camelCase(el.fkey)

  const columnToJSX = (acc, { key, fkey }) =>
    acc +
    ` 
          <Td>{${
            fkey
              ? `${camelCase(key)} && ` + camelCase(key) + '.label'
              : camelCase(key)
          }}</Td>`

  const columnToConst = (acc, { key, fkey }, i) =>
    acc +
    (i > 0 ? ', ' : '') +
    camelCase(key) +
    (fkey && fkey !== key ? ', ' + camelCase(fkey) : '')

  const columnToHeader = (acc, { key, fkey }, i) =>
    acc + (i > 0 ? ', ' : '') + `'` + titleCase(key) + `'`

  return `
  import React, { Component, Fragment } from 'react'
  import { Link } from 'react-router-dom'
  import { graphql, compose } from 'react-apollo'
  import omitBy from 'lodash/omitBy'
  import isNil from 'lodash/isNil'

  import { Button, Loader, Flex, Text } from 'ui'
  import { Table as Tbl, Tr, Th, Td, Tbody } from 'ui/Table'
  
  import { ${queryName_('delete')}, ${queryName_('list')} } from './queries'
  import { transformListProps, mutateProp } from 'apollo/helpers'
  
  const renderHeaderCell = (cell, i) => <Th key={i}>{cell}</Th>
  
  const Header = ({ headers }) => <Tr>{headers.map(renderHeaderCell)}</Tr>
  
  class Row extends Component {
    delete = async () => {
      const { deleteRow, nodeId } = this.props
      await deleteRow({ nodeId })
    }
    render() {
      const { nodeId, ${columns.reduce(columnToConst, '')} } = this.props
      return (
        <Tr>${columns.reduce(columnToJSX, '')}
          <Td>
            <Button is={Link} mx={0} to={'/${pluralName}/' + ${
    pkeyIsFkey ? pKey + '.value' : pKey
  }}>
              Edit
            </Button>
          </Td>
          <Td>
            <Button mx={0} onClick={this.delete}>
              Delete
            </Button>
          </Td>
        </Tr>
      )
    }
  }
  
  const renderRow = deleteRow => row => (
    <Row key={row.nodeId} deleteRow={deleteRow} {...row} />
  )
  
  const Body = ({ data, deleteRow }) => data.map(renderRow(deleteRow))
  
  class Table extends Component {
    toCreate = {
      pathname: '/${pluralName}/create',
      query: { ...this.props.match.params }
    }
    render() {
      const { loading, error, mainQuery, refetch, ${deleteRow} } = this.props
      return (
        <Fragment>
          <Flex>
            <Button onClick={refetch}>Refetch</Button>
            <Button is={Link} to={this.toCreate}>
              Create
            </Button>
          </Flex>
          <Tbl>
            <Tbody>
              <Header headers={[ ${columns.reduce(columnToHeader, '')} ]} />
              {!loading &&
                !error && <Body deleteRow={${deleteRow}} data={mainQuery.nodes} />}
            </Tbody>
          </Tbl>
          {error && <Text>error</Text>}
          {loading && <Loader />}
        </Fragment>
      )
    }
  }
  
  const configObject = {
    options: ({ match = {} }) => {${
      refTypes.length > 0
        ? `
      const { ${refTypes.reduce(refTypeToList, '')} } = match.params || {}
      const condition = omitBy({ ${refTypes.reduce(
        refTypeToObject,
        ''
      )} }, isNil)`
        : ''
    }
      return {
        variables: {
          first: 50,${
            refTypes.length > 0
              ? `
          condition`
              : ''
          }
        }
      }
    },
    props: transformListProps
  }
  
  export const ${getListComponentName(tableName)} = compose(
    graphql(${queryName_('delete')}, mutateProp('${deleteRow}')),
    graphql(${queryName_('list')}, configObject)
  )(Table)
  
  `
}

const getListComponentName = tableName =>
  pascalCase(pluralizeName('list ' + tableName))

module.exports = { createList, getListComponentName }
