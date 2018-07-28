import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import { Flex, Button, Box, Tabs, Tab, NavLink, Text, Divider } from 'ui'
import { makeGetAllForBranch } from 'redux/models/dependentTable'
import { Row } from './Row'

class _DependantTable extends Component {
  onAdd = evt => {
    const { parent, add } = this.props
    add({ parent, url: this.props.match.url })
  }

  onClean = evt => {
    const { clean } = this.props
    clean()
  }

  render() {
    const { branch, parent, items = [], match, url, ...rest } = this.props
    return (
      <Flex>
        <Tabs
          flexDirection="column"
          alignItems="stretch"
          borderBottom={0}
          borderRight={1}
          pr={2}
          my={2}
        >
          {items.map(key => (
            <Tab
              mx={1}
              is={NavLink}
              key={key}
              to={`${match.url}/${url}/${key}`}
            >
              <Text textAlign="left">{key}</Text>
            </Tab>
          ))}
          <Divider w={1} />
          <Flex flexDirection={['column', 'row']}>
            <Button buttonStyle="success" onClick={this.onAdd} children="Add" />
            <Button
              buttonStyle="accent"
              onClick={this.onClean}
              children="Clean"
            />
          </Flex>
        </Tabs>
        <Box />
        <Switch>
          {items[0] && (
            <Redirect
              exact
              from={`${match.url}/${url}`}
              to={`${match.url}/${url}/${items[0]}`}
            />
          )}
          {items.map(key => (
            <Route
              key={url}
              path={`${match.url}/${url}/${key}`}
              render={() => (
                <Row
                  parent={parent}
                  branch={branch}
                  key={key}
                  oldKey={key}
                  {...rest}
                />
              )}
            />
          ))}
        </Switch>
      </Flex>
    )
  }
}

const makeMapState = (_state, { branch }) => {
  const getListState = makeGetAllForBranch(branch)()
  const mapState = (state, props) => {
    const { parent } = props
    return {
      items: getListState(state, parent)
    }
  }
  return mapState
}

const mapDispatch = (dispatch, { branch }) => ({
  add: dispatch[branch].addAndGo,
  clean: dispatch[branch].clean,
  deleteItem: dispatch[branch].delete
})

export const DependantTable = connect(
  makeMapState,
  mapDispatch
)(_DependantTable)
