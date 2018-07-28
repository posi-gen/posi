import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import { Flex, Tabs, Tab, NavLink, Box, Text } from 'ui'
import { Row } from './Row'
import { select } from '@rematch/select'

const fields = [
  {
    key: 'SELECT',
    grantType: 'SELECT',
    conditionType: 'using',
    display: 'SELECT'
  },
  {
    key: 'INSERT',
    grantType: 'INSERT',
    conditionType: 'check',
    display: 'INSERT'
  },
  {
    key: 'UPDATE_using',
    grantType: 'UPDATE',
    conditionType: 'using',
    display: 'UPDATE (using)'
  },
  {
    key: 'UPDATE_check',
    grantType: 'UPDATE',
    conditionType: 'check',
    display: 'UPDATE (check)'
  },
  {
    key: 'DELETE',
    grantType: 'DELETE',
    conditionType: 'using',
    display: 'DELETE'
  }
]

class _Policy extends Component {
  render() {
    const { tables, parent: role, match, url } = this.props
    return (
      <Flex px={1} my={2}>
        <Tabs
          flexDirection="column"
          alignItems="stretch"
          borderBottom={0}
          borderRight={1}
        >
          {tables.map((key, i) => (
            <Tab
              is={NavLink}
              key={key}
              to={`${match.url}/${url}/${i === 0 ? '' : key}`}
              exact={i === 0 ? true : null}
            >
              <Text textAlign="left">{key}</Text>
            </Tab>
          ))}
        </Tabs>
        <Box />
        <Switch>
          {tables.map((item, i) => (
            <Route
              key={url}
              path={`${match.url}/${url}/${i === 0 ? '' : item}`}
              exact={i === 0 ? true : null}
              render={() => (
                <Row key={item} fields={fields} role={role} object={item} />
              )}
            />
          ))}
        </Switch>
      </Flex>
    )
  }
}

const mapState = state => ({
  tables: select.table.getAll(state)
})

export const Policy = connect(mapState)(_Policy)
