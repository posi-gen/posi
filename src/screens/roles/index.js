import React from 'react'
import { MainTables } from 'components'
import { branchName } from 'redux/models/role'

const additionDelete = {
  // deleteColumns: { key: 'deleteColumns', branch: 'column', action: 'deleteAll' }
}

export const Roles = ({ match }) => (
  <MainTables
    branch={branchName}
    match={match}
    additionDelete={additionDelete}
  />
)
