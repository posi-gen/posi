import { complexStyle, responsiveStyle } from 'styled-system'

const getColorNames = (count, name) =>
  [...Array(count).keys()].map(i => (i === 0 ? name : name + i))

const a = (al, c) => Math.floor(c * (1 - al))

const getAlpha = (al, { r, g, b }) =>
  `rgb(${a(al, r)}, ${a(al, g)}, ${a(al, b)})`

const getDarken = (al, color) => `rgba(0, 0, 0, ${al})`

const getColors = (color, name, depth, transform = getAlpha) => {
  const colorNames = getColorNames(depth, name)
  const colors = colorNames.reduce(
    (acc, colorName, i) => ({
      ...acc,
      [colorName]: transform(i / depth, color)
    }),
    {}
  )
  return colors
}

export const generateColors = (baseColors, depth = 5) => {
  const keys = Object.keys(baseColors)
  return keys.reduce(
    (acc, name) => ({
      ...acc,
      ...getColors(baseColors[name], name, depth),
      ...getColors(null, 'darken', depth, getDarken)
    }),
    {}
  )
}

export const hidden = responsiveStyle({
  prop: 'hidden',
  cssProperty: 'display',
  getter: hidden => (hidden ? 'none' : 'flex')
})

export const buttonStyle = complexStyle({
  prop: 'buttonStyle',
  key: 'buttonStyle'
})

export const selectColor = color => ({ theme }) => theme.colors[color]
