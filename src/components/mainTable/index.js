import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { select } from '@rematch/select'
import { pascalCase } from 'change-case'

import { Box, Heading, Button, Flex, Tabs, Tab, NavLink } from 'ui'
import { CommandContainer, MainContainer } from 'components'

class _MainTable extends Component {
  constructor(props) {
    super(props)
    const { fields = {}, item = {} } = props
    const defaults = Object.values(fields).reduce(
      (acc, item) => ({ ...acc, [item.key]: item.default }),
      {}
    )
    this.state = { ...defaults, ...item, originalKey: props.match.params.key }
  }

  onSave = evt => {
    if (this.state.key) {
      const { save, additionActions, push } = this.props
      const { originalKey: parent, key: newParent } = this.state
      save(parent)
      Object.values(additionActions.save || {}).map(({ key }) =>
        this.props[key]({ parent, newParent })
      )
      push('/main/' + this.props.branch + 's')
    }
  }

  onCancel = evt => {
    const { editCancel, additionActions, push } = this.props
    const { originalKey } = this.state
    editCancel(originalKey)
    Object.values(additionActions.editCancel || {}).map(({ key }) =>
      this.props[key](originalKey)
    )
    push('/main/' + this.props.branch + 's')
  }

  onChange = field => value => {
    if (value.target) {
      this.setState({ [field]: value.target.value })
    } else this.setState({ [field]: value })
  }

  onBlur = () => {
    const { edit } = this.props
    edit(this.state)
  }

  render() {
    const { branch, match, tables = {} } = this.props
    const { originalKey } = this.state
    return (
      <MainContainer ml={2}>
        <Flex flexDirection="column">
          <Box>
            <Heading
              mt={1}
              mx={-2}
              children={`${pascalCase(branch)}: ${match.params.key}`}
            />
            <CommandContainer>
              <Button
                buttonStyle="primary"
                mr={1}
                onClick={this.onSave}
                children="Save"
              />
              <Button
                buttonStyle="accent"
                ml={1}
                onClick={this.onCancel}
                children="Cancel"
              />
            </CommandContainer>
            <Tabs borderColor="darken1">
              <Tab is={NavLink} px={1} mr={3} exact={true} to={`${match.url}`}>
                Main
              </Tab>
              {Object.values(tables).map(({ url, display }) => (
                <Tab key={url} is={NavLink} mx={2} to={`${match.url}/${url}`}>
                  {display}
                </Tab>
              ))}
            </Tabs>
            <Route path={`${match.url}`} render={this.MainTab} exact />
            {Object.values(tables).map(({ url, Component }) => (
              <Route
                key={url}
                path={`${match.path}/${url}`}
                component={() => (
                  <Component parent={originalKey} match={match} url={url} />
                )}
              />
            ))}
          </Box>
        </Flex>
      </MainContainer>
    )
  }
  MainTab = () => {
    const { fields = {} } = this.props
    return Object.values(fields).map(({ key, Component, label }) => (
      <Component
        key={key}
        label={label}
        value={this.state[key]}
        onChange={this.onChange(key)}
        onBlur={this.onBlur}
      />
    ))
  }
}

const mapState = (state, { branch, match }) => ({
  item: select[branch].getItem(state, match.params.key)
})

const mapDispatch = (dispatch, { branch, additionActions = {} }) => ({
  edit: dispatch[branch].edit,
  editCancel: dispatch[branch].editCancel,
  save: dispatch[branch].save,
  ...Object.values(
    Object.values(additionActions).reduce(
      (acc, item) => ({ ...acc, ...item }),
      {}
    )
  ).reduce(
    (acc, { key, branch, action }) => ({
      ...acc,
      [key]: dispatch[branch][action]
    }),
    {}
  ),
  push: bindActionCreators(push, dispatch)
})

export const MainTable = connect(
  mapState,
  mapDispatch
)(_MainTable)
