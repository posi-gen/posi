import sys from 'system-components'
import { Button } from './Button'

export const ButtonOutline = sys(
  {
    is: Button
  },
  props => {
    const { theme, buttonStyle } = props
    const { color, backgroundColor } = theme.buttonStyle[buttonStyle]
    return {
      backgroundColor: color,
      color: backgroundColor,
      boxShadow: `inset 0 0 0 2px ${backgroundColor}`,
      '&:hover': {
        color: color,
        backgroundColor: backgroundColor
      }
    }
  }
)

ButtonOutline.displayName = 'ButtonOutline'

export default ButtonOutline
