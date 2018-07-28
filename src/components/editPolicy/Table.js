import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Select, Option, Flex } from 'ui'
import { policyTypes } from '../../constants'
import { select } from '@rematch/select'

export class _Table extends Component {
  componentDidMount() {
    const { value, onChange } = this.props
    const { type, column, operator, table, tableColumn } = value || {}
    if (!column || !operator || !table || !tableColumn) {
      onChange({ type, ...this.getDefaults() })
    }
  }

  getDefaults = () => {
    const { columns, tables, tableColumns } = this.props
    return {
      column: columns[0],
      operator: 'IN',
      table: tables[0],
      tableColumn: tableColumns[0]
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

  onChangeTable = field => evt => {
    const {
      onChange = () => null,
      value: { type, column, operator, table, tableColumn }
    } = this.props
    onChange({
      type,
      column,
      operator,
      table,
      tableColumn,
      [field]: evt.target.value
    })
  }

  render() {
    const { value = {}, columns, tables, tableColumns } = this.props
    const { type, column, operator, table, tableColumn } = value
    return (
      <Flex flexDirection="column" justifyContent="center">
        <Flex>
          <Select p={2} value={type} onChange={this.onChangeType}>
            {this.getTypesList().map(item => (
              <Option key={item.key} value={item.key}>
                {item.key}
              </Option>
            ))}
          </Select>
          <Select value={column} onChange={this.onChangeTable('column')}>
            {columns.map(item => (
              <Option key={item} value={item.procedure}>
                {item}
              </Option>
            ))}
          </Select>
          <Select value={operator} onChange={this.onChangeTable('operator')}>
            {['IN', 'NOT IN'].map(item => (
              <Option key={item} value={item.procedure}>
                {item}
              </Option>
            ))}
          </Select>
        </Flex>
        <Flex>
          <Select value={table} onChange={this.onChangeTable('table')}>
            {tables.map(item => (
              <Option key={item} value={item.procedure}>
                {item}
              </Option>
            ))}
          </Select>
          <Select
            value={tableColumn}
            onChange={this.onChangeTable('tableColumn')}
          >
            {tableColumns.map(item => (
              <Option key={item} value={item.procedure}>
                {item}
              </Option>
            ))}
          </Select>
        </Flex>
      </Flex>
    )
  }
}

const mapState = (state, { parent, value: { table } }) => ({
  columns: select.column.getAll(state, parent),
  tables: select.table.getAll(state),
  tableColumns: select.column.getAll(state, table)
})

export const Table = connect(mapState)(_Table)
