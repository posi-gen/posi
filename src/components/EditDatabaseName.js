import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, InputContainer } from 'ui'
import { select } from '@rematch/select'

class _EditDatabaseName extends Component {
  onChange = evt => {
    const { changeDatabaseName, value } = this.props
    if (value !== evt.target.value) {
      changeDatabaseName(evt.target.value)
    }
  }
  render() {
    const { value } = this.props
    return (
      <InputContainer label="Database name">
        <Input
          placeholder="database name"
          defaultValue={value}
          onBlur={this.onChange}
        />
      </InputContainer>
    )
  }
}

const mapState = state => ({
  value: select.database.getName(state)
})

const mapDispatch = dispatch => ({
  changeDatabaseName: dispatch.database.editName
})

export const EditDatabaseName = connect(
  mapState,
  mapDispatch
)(_EditDatabaseName)
