import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Flex } from 'ui'
import { Checkbox } from 'components'

import { select } from '@rematch/select'

export class _GrantRoles extends Component {
  getRolesOptions = () => {
    const { roles, grantRoles, parent } = this.props
    return roles
      .filter(item => item !== parent)
      .map(item => ({ key: item, disabled: grantRoles.indexOf(item) !== -1 }))
  }

  onRoleChange = role => value => {
    const { unCheck, check, parent } = this.props
    if (value) check({ parent, key: role })
    else unCheck({ parent, key: role })
  }

  render() {
    const options = this.getRolesOptions()
    return (
      <Flex
        my={1}
        flexDirection="column"
        alignItems="flex-start"
        onBlur={this.onBlur}
        onFocus={this.onFocus}
      >
        {options.map(({ key, disabled }) => (
          <Checkbox
            key={key}
            value={disabled}
            onChange={this.onRoleChange(key)}
            label={key}
          />
        ))}
      </Flex>
    )
  }
}

const mapState = (state, { parent }) => ({
  roles: select.role.getAll(state),
  grantRoles: select.grantRoles.getAll(state, parent)
})

const mapDispatch = (dispatch, { parent }) => ({
  unCheck: dispatch.grantRoles.delete,
  check: dispatch.grantRoles.check
})

export const GrantRoles = connect(
  mapState,
  mapDispatch
)(_GrantRoles)
