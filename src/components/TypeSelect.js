import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Select, Option, Tooltip, InputContainer, Input, Box } from 'ui'
import { types } from '../constants'

export class TypeSelectComponent extends Component {
  componentDidMount() {
    const { value, onChange } = this.props
    const {
      typeGroup = types.default,
      type = this.getDefaultType(typeGroup),
      typeParams = this.getDefaultParams(typeGroup, type)
    } =
      value || {}
    if (typeGroup !== value.typeGroup || type !== value.type) {
      onChange({ typeGroup, type, typeParams })
    }
  }

  getDefaultType = typeGroup => {
    const group = types.groups[typeGroup]
    return group.default
      ? group.default
      : (this.props[group.typesInReduxKey] || [])[0]
  }

  getDefaultParams = (typeGroup, type) => {
    const group = types.groups[typeGroup]
    return group.types ? group.types[type].params || {} : {}
  }

  getGroupsList = () =>
    Object.values(types.groups).filter(
      item =>
        types.groups[item.key].types ||
        Object.keys(this.props[types.groups[item.key].typesInReduxKey] || {})
          .length > 0
    )

  getTypesList = typeGroup => {
    const group = types.groups[typeGroup] || { types: [] }
    return group.types
      ? Object.values(group.types)
      : (this.props[group.typesInReduxKey] || []).map(item => ({
          key: item
        }))
  }

  onTypeGroupChange = evt => {
    const { onChange = () => null } = this.props
    const typeGroup = evt.target.value
    const type = this.getDefaultType(typeGroup)
    const typeParams = this.getDefaultParams(typeGroup, type)
    onChange({ typeGroup, type, typeParams })
  }

  onTypeChange = evt => {
    const {
      value: { typeGroup },
      onChange = () => null
    } = this.props
    const type = evt.target.value
    const typeParams = this.getDefaultParams(typeGroup, type)
    onChange({ typeGroup, type, typeParams })
  }

  onTypeParamChange = param => evt => {
    const {
      value: { typeGroup, type, typeParams },
      onChange = () => null
    } = this.props
    onChange({
      typeGroup,
      type,
      typeParams: {
        ...typeParams,
        [param]: { ...typeParams[param], value: Number(evt.target.value) }
      }
    })
  }

  render() {
    const { label, value } = this.props
    const { type, typeGroup, typeParams = [] } = value
    const typeOptions = this.getTypesList(typeGroup)
    return (
      <InputContainer label={label}>
        <Box>
          <Select
            mx={1}
            p={2}
            value={typeGroup}
            onChange={this.onTypeGroupChange}
          >
            {this.getGroupsList().map(item => (
              <option key={item.key} value={item.key}>
                {item.display}
              </option>
            ))}
          </Select>
          <Select mx={1} p={2} value={type} onChange={this.onTypeChange}>
            {typeOptions.map(({ key }) => (
              <Option key={key} value={key}>
                {key}
              </Option>
            ))}
          </Select>
          {Object.values(typeParams).map(({ key, value }) => (
            <Tooltip key={key} text={key}>
              <Input
                w={64}
                placeholder={key}
                value={value || 0}
                type="number"
                onChange={this.onTypeParamChange(key)}
              />
            </Tooltip>
          ))}
        </Box>
      </InputContainer>
    )
  }
}

const mapState = state => {
  const { table: tables = {}, column: columns = {} } = state
  return {
    tables: Object.keys(tables).filter(
      table =>
        Object.values(columns[table] || {}).reduce(
          (acc, item) => acc + ((item.data || {}).pkey ? 1 : 0),
          0
        ) === 1
    )
  }
}

export const TypeSelect = connect(mapState)(TypeSelectComponent)
