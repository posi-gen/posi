import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Select, InputContainer, Option } from 'ui'
import { select } from '@rematch/select'

export class _SelectRole extends Component {
  componentDidMount() {
    // const { value, onChange } = this.props
    // const {
    //   typeGroup = types.default,
    //   type = this.getDefaultType(typeGroup),
    //   typeParams = this.getDefaultParams(typeGroup, type)
    // } =
    //   value || {}
    // if (typeGroup !== value.typeGroup || type !== value.type) {
    //   onChange({ typeGroup, type, typeParams })
    // }
  }

  getRolesOptions = () => {
    const { roles, grantRoles, parent } = this.props
    return roles
      .filter(item => item !== parent)
      .map(item => ({ key: item, disabled: grantRoles.indexOf(item) !== -1 }))
  }

  onRoleChange = evt => {
    const { onChange } = this.props
    const role = evt.target.value
    onChange(role)
  }

  render() {
    const { value } = this.props
    const options = this.getRolesOptions()
    return (
      <InputContainer label="Select role">
        <Select value={value} onChange={this.onRoleChange}>
          {options.map(({ key, disabled }) => (
            <Option key={key} value={key} disabled={false}>
              {key}
            </Option>
          ))}
        </Select>
      </InputContainer>
    )
  }
}

const mapState = (state, { parent }) => ({
  roles: select.role.getAll(state),
  grantRoles: select.grantRoles.getAll(state, parent)
})

export const SelectRole = connect(mapState)(_SelectRole)
