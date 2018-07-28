import React, { Component } from 'react'
import { select } from '@rematch/select'
import { connect } from 'react-redux'

import { Flex } from 'ui'
import { Checkbox } from 'components'

class _Row extends Component {
  onChange = field => checked => {
    const { role, type, object, grants = [], edit } = this.props
    const permissions = checked
      ? [...grants, field] // add grant
      : grants.filter(item => item !== field) // remove grant
    edit({ role, type, object, newData: { key: object, type, permissions } })
  }

  render() {
    const { grants, fields = [] } = this.props
    // const { object } = this.props
    return (
      <Flex
        m={2}
        ml={3}
        flexDirection="column"
        alignItems="flex-start"
        onBlur={this.onBlur}
        onFocus={this.onFocus}
      >
        {fields.map(field => (
          <Checkbox
            key={field}
            value={grants.indexOf(field) !== -1}
            onChange={this.onChange(field)}
            label={field}
          />
        ))}
      </Flex>
    )
  }
}

const mapState = (state, { role, type, object }) => ({
  grants: select.grants.getItem(state, { role, type, object })
})

const mapDispatch = dispatch => ({ edit: dispatch.grants.edit })

export const Row = connect(
  mapState,
  mapDispatch
)(_Row)
