import React, { Fragment } from 'react'
import { Box, Heading } from 'ui'

import { OpenProject, ThemeChanger, SaveProject } from 'components'
export const Settings = () => (
  <Fragment>
    <Heading my={1}>Settings</Heading>
    <Box mt={4} />
    <ThemeChanger />
    <Box mt={4} />
    <SaveProject />
    <Box mt={4} />
    <OpenProject mt={1} />
  </Fragment>
)
