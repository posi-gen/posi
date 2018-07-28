import React, { Component } from 'react'
import { policyTypes } from '../../constants'
import { Boolean } from './Boolean'
import { Function } from './Function'
import { Table } from './Table'

export class EditPolicy extends Component {
  render() {
    const { parent, value = {}, onChange } = this.props
    const { type } = value

    switch (type) {
      case policyTypes.types.BOOLEAN.key:
        return <Boolean parent={parent} value={value} onChange={onChange} />
      case policyTypes.types.FUNCTION.key:
        return <Function parent={parent} value={value} onChange={onChange} />
      case policyTypes.types.TABLE.key:
        return <Table parent={parent} value={value} onChange={onChange} />
      default:
        return null
    }
  }
}
