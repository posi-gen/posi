import React from 'react'
import { DependantTable } from 'components'
import { branchName } from 'redux/models/column'
import { InputWithLabel } from 'ui'
import { TypeSelect, Checkbox } from 'components'

const rowStructure = {
  key: {
    key: 'key',
    default: '',
    Component: InputWithLabel,
    flex: 0.4,
    focus: true
  },
  type: {
    key: 'type',
    default: {},
    Component: TypeSelect,
    flex: 0.4
  },
  pkey: {
    key: 'pkey',
    default: false,
    Component: Checkbox,
    flex: 0
  },
  notNull: {
    key: 'notNull',
    default: false,
    Component: Checkbox,
    flex: 0
  },
  index: {
    key: 'index',
    default: false,
    Component: Checkbox,
    flex: 0
  },
  unique: {
    key: 'unique',
    default: false,
    Component: Checkbox,
    flex: 0
  }
}

export const Columns = ({ parent, match, url }) => (
  <DependantTable
    parent={parent}
    branch={branchName}
    rowStructure={rowStructure}
    match={match}
    url={url}
  />
)
