import sys from 'system-components'
import { buttonStyle } from 'styles/helpers'

const Button = sys(
  {
    is: 'button',
    fontSize: 1,
    fontWeight: 'bold',
    bg: 'transparent',
    color: 'inherit',
    m: 1,
    px: 3,
    py: 2,
    borderRadius: 2,
    border: 0,
    buttonStyle: 'primary'
  },
  props => ({
    fontFamily: 'inherit',
    WebkitFontSmoothing: 'antialiased',
    display: 'inline-block',
    verticalAlign: 'middle',
    textAlign: 'center',
    textDecoration: 'none',
    appearance: 'none',

    '&:focus': {
      outline: 0
    },
    '&:disabled': {
      opacity: 1 / 4
    },
    ...buttonStyle(props)
  }),
  'buttonStyle'
)

Button.displayName = 'Button'

export { Button }
