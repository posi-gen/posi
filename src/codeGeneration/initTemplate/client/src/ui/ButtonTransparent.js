import sys from 'system-components'
import { Button } from './Button'

export const ButtonTransparent = sys(
  {
    is: Button,
    bg: 'transparent',
    color: 'inherit',
    focus: {
      outline: 'none',
      boxShadow: 'none',
      color: 'blue'
    }
  },
  props => {
    const { theme, buttonStyle } = props
    const { color, backgroundColor } = theme.buttonStyle[buttonStyle]
    return {
      color: backgroundColor,
      '&:hover': {
        color: color
      }
    }
  }
)

ButtonTransparent.displayName = 'ButtonTransparent'

export default ButtonTransparent
