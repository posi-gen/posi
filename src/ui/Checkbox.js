import sys from 'system-components'

export const Checkbox = sys(
  {
    is: 'input',
    type: 'checkbox',
    m: 2
  },
  'space',
  'color'
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
