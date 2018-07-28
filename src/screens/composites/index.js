import React from 'react'
import { MainTables } from 'components'

const additionDelete = {
  deleteColumns: {
    key: 'deleteCompositeColumns',
    branch: 'compositeColumn',
    action: 'deleteAll'
  }
}

export const Composites = ({ match }) => (
  <MainTables
    branch="composite"
    match={match}
    additionDelete={additionDelete}
  />
)
