import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Flex, InputContainer } from 'ui'
import { EditPolicy } from 'components'
import { select } from '@rematch/select'

class _Row extends Component {
  onChange = ({ grantType, conditionType }) => value => {
    const { role, object, policy = [], edit } = this.props
    const key = object + '_' + grantType + '_' + conditionType
    const suitablePolicy = policy.filter(item => item.key === key)
    if (suitablePolicy.length === 1)
      edit({
        role,
        grantType,
        conditionType,
        object,
        newData: { ...suitablePolicy[0], [conditionType]: value }
      })
  }

  render() {
    const { object, policy = [] } = this.props
    return (
      <Flex
        m={2}
        ml={3}
        flexDirection="column"
        alignItems="flex-start"
        onBlur={this.onBlur}
        onFocus={this.onFocus}
      >
        {policy.map(({ key, grantType, conditionType }) => (
          <InputContainer key={key} label={grantType + ' ' + conditionType}>
            <EditPolicy
              value={
                policy.filter(
                  item =>
                    item.key === object + '_' + grantType + '_' + conditionType
                )[0][conditionType]
              }
              onChange={this.onChange({ grantType, conditionType })}
              parent={object}
            />
          </InputContainer>
        ))}
      </Flex>
    )
  }
}

const mapState = (state, { role, object, fields }) => ({
  policy: fields.map(
    ({ grantType, conditionType }) =>
      select.policy.getItem(state, {
        role,
        type: grantType + '_' + conditionType,
        object
      }) || {
        key: object + '_' + grantType + '_' + conditionType,
        type: grantType + '_' + conditionType,
        table: object,
        grantType,
        user: role,
        policyType: 'PERMISSIVE',
        policyKey: role + '_' + object + '_' + grantType,
        conditionType,
        ...(conditionType === 'using'
          ? {
              using: {
                type: 'BOOLEAN',
                condition: false
              }
            }
          : {
              check: {
                type: 'BOOLEAN',
                condition: false
              }
            })
      }
  )
  // .reduce((acc, item) => ({ ...acc, [item.user + '_' + item.key]: item }), {})
})

const mapDispatch = dispatch => ({ edit: dispatch.policy.edit })

export const Row = connect(
  mapState,
  mapDispatch
)(_Row)
