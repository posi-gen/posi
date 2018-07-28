import React from 'react'

import { Label, Flex } from 'ui'

export const InputContainer = ({ label, children, ...rest }) => (
  <Flex
    w={1}
    flexDirection={['column', 'row']}
    alignItems={['flex-start', 'center']}
    mt={2}
    {...rest}
  >
    <Label m={1} w={105}>
      {label}
    </Label>
    {children}
  </Flex>
)
