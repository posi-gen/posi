import { generateColors } from 'styles/helpers'
import { buttonStyle } from 'styles/buttonStyle'

const baseColors = {
  bg: { r: 255, g: 255, b: 255 },
  base: { r: 85, g: 38, b: 0 },
  primary: { r: 64, g: 127, b: 127 },
  secondary: { r: 102, g: 153, b: 153 },
  accent: { r: 212, g: 106, b: 106 }
}

const colors = generateColors(baseColors)

const breakpoints = ['32em', '48em', '64em', '80em']
const space = [0, 4, 8, 16, 32, 64, 128]
const fonts = {
  0: 'system-ui, sans-serif',
  sans: 'Open Sans,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif',
  mono: '"SF Mono", "Roboto Mono", Menlo, monospace'
}
const fontSizes = ['0.7rem', '0.875rem', '1rem', '1.25rem', '1.5rem', '2rem']
const weights = {
  normal: 400,
  bold: 700
}
const radii = [0, 2, 4]

export const light = {
  breakpoints,
  space,
  fonts,
  fontSizes,
  weights,
  radii,
  colors,
  buttonStyle: buttonStyle(colors)
}
