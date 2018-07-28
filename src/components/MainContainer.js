import React from 'react'
import { Flex } from 'ui'

export const MainContainer = ({ children, ...props }) => (
  <Flex flexDirection="column" ml={3} {...props}>
    {children}
  </Flex>
)
