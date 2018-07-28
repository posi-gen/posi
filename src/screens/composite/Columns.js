import React from 'react'
import { DependantTable } from 'components'
import { branchName } from 'redux/models/compositeColumn'
import { InputWithLabel } from 'ui'
import { TypeSelect } from 'components'

const rowStructure = {
  key: {
    key: 'key',
    default: '',
    Component: InputWithLabel,
    flex: 0.5,
    focus: true
  },
  type: {
    key: 'type',
    default: {},
    Component: TypeSelect,
    flex: 0.5
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
