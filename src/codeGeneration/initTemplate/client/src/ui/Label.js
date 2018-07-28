import sys from 'system-components'

export const Label = sys(
  {
    is: 'label',
    fontSize: 1,
    fontWeight: 'bold',
    mt: 2,
    align: 'center'
  },
  {
    display: 'flex'
  },
  'alignItems',
  'space',
  'color'
)

Label.displayName = 'Label'

export default Label
