import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Select, Flex } from 'ui'
import { policyTypes } from '../../constants'
import { select } from '@rematch/select'

class _Function extends Component {
  componentDidMount() {
    const { value, onChange } = this.props
    const { type, column, procedure } = value || {}
    if (!column || !procedure) {
      onChange({ type, ...this.getDefaults() })
    }
  }

  getDefaults = () => {
    const { columns } = this.props
    return {
      procedure: policyTypes.types.FUNCTION.default,
      column: columns[0]
    }
  }

  getTypesList = () => {
    return Object.values(policyTypes.types)
  }

  onChangeType = evt => {
    const { onChange = () => null } = this.props
    const type = evt.target.value
    onChange({ type })
    // onChange({ type, ...this.getDefaults(type) })
  }

  onChangeColumn = evt => {
    const {
      onChange = () => null,
      value: { type, procedure }
    } = this.props
    const column = evt.target.value
    onChange({ type, column, procedure })
  }

  onChangeProcedure = evt => {
    const {
      onChange = () => null,
      value: { type, column }
    } = this.props
    const procedure = evt.target.value
    onChange({ type, column, procedure })
  }

  render() {
    const { value = {}, columns } = this.props
    const { type, column, procedure } = value
    return (
      <Flex flexDirection="column" justifyContent="center">
        <Select value={type} onChange={this.onChangeType}>
          {this.getTypesList().map(item => (
            <option key={item.key} value={item.key}>
              {item.key}
            </option>
          ))}
        </Select>
        <Flex>
          <Select value={column} onChange={this.onChangeColumn}>
            {columns.map(item => (
              <option key={item} value={item.procedure}>
                {item}
              </option>
            ))}
          </Select>
          <Select value={procedure} onChange={this.onChangeProcedure}>
            {policyTypes.types.FUNCTION.options.map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>
    )
  }
}

const mapState = (state, { parent }) => ({
  columns: select.column.getAll(state, parent)
})

export const Function = connect(mapState)(_Function)
