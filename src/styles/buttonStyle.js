const buttonStyle = colors => ({
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
  },
  success: {
    color: colors.bg,
    backgroundColor: colors.secondary,
    '&:hover': {
      boxShadow: `inset 0 0 0 999px ${colors.secondary1}`
    },
    '&:active': {
      backgroundColor: colors.secondary1,
      boxShadow: `inset 0 0 8px ${colors.secondary3}`
    }
  },
  accent: {
    color: colors.bg,
    backgroundColor: colors.accent,
    '&:hover': {
      boxShadow: `inset 0 0 0 999px ${colors.accent1}`
    },
    '&:active': {
      backgroundColor: colors.accent1,
      boxShadow: `inset 0 0 8px ${colors.accent3}`
    }
  },
  dark: {
    color: colors.bg,
    backgroundColor: colors.base,
    '&:hover': {
      boxShadow: `inset 0 0 0 999px ${colors.base1}`
    },
    '&:active': {
      color: colors.bg,
      backgroundColor: colors.base1,
      boxShadow: `inset 0 0 8px ${colors.base3}`
    }
  }
})

export { buttonStyle }
