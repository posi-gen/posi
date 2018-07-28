import React, { Component } from 'react'
import { Select, Flex } from 'ui'
import { Checkbox } from 'components'
import { policyTypes } from '../../constants'

export class Boolean extends Component {
  getDefaults = () => {
    return { condition: policyTypes.types.BOOLEAN.default }
  }

  getTypesList = () => {
    return Object.values(policyTypes.types)
  }

  onChangeType = evt => {
    const { onChange = () => null } = this.props
    const type = evt.target.value
    onChange({ type, ...this.getDefaults(type) })
  }

  onChangeCondition = value => {
    const {
      onChange = () => null,
      value: { type }
    } = this.props
    onChange({ type, condition: value })
  }

  render() {
    const { value = {} } = this.props
    const { type, condition } = value
    return (
      <Flex justifyContent="center" alignItems="center">
        <Select value={type} onChange={this.onChangeType}>
          {this.getTypesList().map(item => (
            <option key={item.key} value={item.key}>
              {item.key}
            </option>
          ))}
        </Select>
        <Checkbox value={condition} onChange={this.onChangeCondition} m={3} />
      </Flex>
    )
  }
}
