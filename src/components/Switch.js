import React, { PureComponent } from 'react'
import { Switch as SwitchUi } from 'ui'

export class Switch extends PureComponent {
  onClick = evt => {
    const { value = false, onChange } = this.props
    return onChange(value)
  }
  render() {
    const { value = false } = this.props
    return <SwitchUi checked={value} onClick={this.onClick} />
  }
}
