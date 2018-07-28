import React, { Component } from 'react'
import { connect } from 'react-redux'
import { select } from '@rematch/select'
import { Switch, Route } from 'react-router-dom'

import { Flex, NavLink, Tabs, Tab, Text, Box } from 'ui'
import { Row } from './Row'

const fields = ['SELECT', 'INSERT', 'UPDATE', 'DELETE']

class _Grants extends Component {
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
                <Row
                  key={item}
                  fields={fields}
                  role={role}
                  object={item}
                  type={'TABLE'}
                />
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

export const Grants = connect(mapState)(_Grants)
