import React from 'react'
import { connect } from 'react-redux'
import { select } from '@rematch/select'

import { Tabs } from 'ui'
import { MainContainer } from 'components'
import { Item } from './Item'
import { CommandPanel } from './CommandPanel'

const _MainTables = ({ branch, match, additionDelete, list, path }) => (
  <MainContainer w={1}>
    <CommandPanel match={match} branch={branch} />
    <Tabs borderBottom={0} flexDirection="column">
      {list.map(item => (
        <Item
          key={item}
          item={item}
          path={path}
          branch={branch}
          additionDelete={additionDelete}
        />
      ))}
    </Tabs>
  </MainContainer>
)

const mapState = (branchState, { branch }) => ({
  list: select[branch].getAll(branchState)
})

export const MainTables = connect(mapState)(_MainTables)
