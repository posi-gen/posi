import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, InputContainer } from 'ui'
import { select } from '@rematch/select'

class _EditDefaultAdminLogin extends Component {
  onChange = evt => {
    const { editDefaultAdminLogin, value } = this.props
    if (value !== evt.target.value) {
      editDefaultAdminLogin(evt.target.value)
    }
  }
  render() {
    const { value } = this.props
    return (
      <InputContainer label="Login">
        <Input
          placeholder="default admin login"
          defaultValue={value}
          onBlur={this.onChange}
        />
      </InputContainer>
    )
  }
}

const mapState = state => ({
  value: select.database.getDefaultAdminLogin(state)
})

const mapDispatch = dispatch => ({
  editDefaultAdminLogin: dispatch.database.editDefaultAdminLogin
})

export const EditDefaultAdminLogin = connect(
  mapState,
  mapDispatch
)(_EditDefaultAdminLogin)
