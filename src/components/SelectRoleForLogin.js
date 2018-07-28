import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Select, Option, InputContainer } from 'ui'
import { select } from '@rematch/select'

export class _SelectRoleForLogin extends Component {
  onRoleChange = evt => {
    const { changeRoleForLogin } = this.props
    changeRoleForLogin(evt.target.value)
  }

  render() {
    const { currentRole, availableRoles = [] } = this.props
    return (
      <InputContainer label="Role for login">
        <Select value={currentRole} onChange={this.onRoleChange}>
          {availableRoles.map(key => (
            <Option key={key} value={key}>
              {key}
            </Option>
          ))}
        </Select>
      </InputContainer>
    )
  }
}

const mapState = state => ({
  currentRole: select.database.getRoleForLogin(state),
  availableRoles: select.role.getAllWithLogin(state)
})

const mapDispatch = dispatch => ({
  changeRoleForLogin: dispatch.database.changeRoleForLogin
})

export const SelectRoleForLogin = connect(
  mapState,
  mapDispatch
)(_SelectRoleForLogin)
