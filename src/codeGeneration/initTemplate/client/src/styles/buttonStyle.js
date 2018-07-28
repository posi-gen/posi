const buttonStyle = colors => ({
  default: {
    color: 'inherit',
    bg: 'transparent',
    '&:hover': {
      backgroundColor: colors.darken1
    },
    '&:active': {
      backgroundColor: colors.darken2
    }
  },
  primary: {
    color: colors.bg,
    backgroundColor: colors.primary,
    '&:hover': {
      boxShadow: `inset 0 0 0 999px ${colors.primary1}`
    },
    '&:active': {
      backgroundColor: colors.primary1,
      boxShadow: `inset 0 0 8px ${colors.primary3}`
    }
  }
})

export { buttonStyle }
