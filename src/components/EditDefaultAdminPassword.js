import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, InputContainer } from 'ui'
import { select } from '@rematch/select'

class _EditDefaultAdminPassword extends Component {
  onChange = evt => {
    const { editDefaultAdminPassword, value } = this.props
    if (value !== evt.target.value) {
      editDefaultAdminPassword(evt.target.value)
    }
  }
  render() {
    const { value = '' } = this.props
    return (
      <InputContainer label="Password">
        <Input
          placeholder="default admin password"
          defaultValue={value}
          onBlur={this.onChange}
          type="password"
        />
      </InputContainer>
    )
  }
}

const mapState = state => ({
  value: select.database.getDefaultAdminPassword(state)
})

const mapDispatch = dispatch => ({
  editDefaultAdminPassword: dispatch.database.editDefaultAdminPassword
})

export const EditDefaultAdminPassword = connect(
  mapState,
  mapDispatch
)(_EditDefaultAdminPassword)
