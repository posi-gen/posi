import React, { PureComponent } from 'react'

export const withClickHandling = WrappedComponent => {
  return class extends PureComponent {
    state = { clicks: 0 }
    componentDidMount() {
      this._isMounted = true
    }

    componentWillUnmount() {
      this._isMounted = false
    }

    onClick = evt => {
      const modifiers = { ctrlKey: evt.ctrlKey }
      const { onClickAction, onDoubleClickAction } = this.props
      if (this.state.clicks === 0) {
        this.setState({ clicks: this.state.clicks + 1 })
        setTimeout(() => {
          switch (this.state.clicks) {
            case 1: {
              if (onClickAction) {
                onClickAction(modifiers)
              }
              break
            }
            case 2: {
              if (onDoubleClickAction) {
                onDoubleClickAction(modifiers)
              }
              break
            }
            default:
              break
          }
          if (this._isMounted) {
            this.setState({ clicks: 0 })
          }
        }, 250)
      } else {
        this.setState({ clicks: this.state.clicks + 1 })
      }
    }

    render() {
      return <WrappedComponent onClick={this.onClick} />
    }
  }
}
