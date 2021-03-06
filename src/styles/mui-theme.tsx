import { alpha, createTheme, ThemeOptions } from '@mui/material/styles'

import { pxToRem } from './global-styles'
import { theme as colorTheme, Theme } from './sc-theme'

declare module '@mui/material/styles' {
  interface TypographyVariants {
    display1: React.CSSProperties
    display2: React.CSSProperties
    display3: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    display1?: React.CSSProperties
    display2?: React.CSSProperties
    display3?: React.CSSProperties
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    display1: true
    display2: true
    display3: true
  }
}

const materialBaseTheme = (theme: Theme): ThemeOptions => ({
  palette: {
    primary: {
      main: theme.colors.primary
    },
    secondary: {
      main: theme.colors.secondary
    },
    text: {
      primary: theme.text.main,
      secondary: theme.text.description
    },
    common: {
      black: theme.tags.black,
      white: theme.tags.white
    },
    grey: {
      '600': theme.grey.main
    },
    background: {
      paper: theme.background.main
    },
    divider: theme.border.darker
  },
  typography: {
    fontFamily: `'Nunito Sans',"Helvetica","Arial",sans-serif`,
    display1: {
      fontSize: pxToRem(40),
      fontWeight: 700
    },
    display2: {
      fontSize: pxToRem(30),
      fontWeight: 700
    },
    display3: {
      fontSize: pxToRem(24),
      fontWeight: 600
    },
    h1: {
      fontSize: pxToRem(22),
      fontWeight: 700
    },
    h2: {
      fontSize: pxToRem(20),
      fontWeight: 400
    },
    h3: {
      fontSize: pxToRem(18)
    },
    h4: {
      fontSize: pxToRem(16)
    },
    h5: {
      fontSize: pxToRem(14)
    },
    button: {
      fontSize: pxToRem(20)
    },
    body1: {
      fontSize: pxToRem(15)
    },
    body2: {
      fontSize: pxToRem(12)
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: 'contained'
      },
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          fontSize: pxToRem(16),
          borderRadius: '14px',
          fontWeight: 'bold',
          transition: 'all 0.2s linear'
        },
        contained: {
          boxShadow: '0px 6px 12px rgba(63, 140, 255, 0.263686)',
          '&:hover': {
            backgroundColor: theme.button.hover
          }
        },
        containedSecondary: {
          backgroundColor: theme.grey.fourth,
          color: theme.text.main,
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: alpha(theme.grey.fourth, 0.8)
          },
          '&:active': {
            backgroundColor: alpha(theme.grey.fourth, 0.6)
          }
        },
        containedSizeMedium: {
          padding: '12px 20px'
        },
        containedSizeLarge: {
          padding: '13px 30px'
        },
        containedSizeSmall: {
          padding: '6px 10px'
        },
        outlined: {
          padding: '6px 30px',
          borderWidth: '2px !important'
        },
        text: {
          fontWeight: 400,
          padding: '2px 5px',
          '& .MuiButton-label': {
            justifyContent: 'space-between'
          }
        }
      }
    },
    MuiAppBar: {
      defaultProps: {
        position: 'fixed',
        elevation: 0
      },
      styleOverrides: {
        root: {
          borderBottom: '1px solid',
          borderBottomColor: theme.border.thin
        },
        colorPrimary: {
          backgroundColor: theme.background.main,
          color: theme.text.main
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: 24
        },
        sizeSmall: {
          fontWeight: 500,
          padding: '5px 10px'
        },
        label: {
          fontSize: pxToRem(12)
        },
        deleteIconColorPrimary: {
          color: theme.colors.primary,
          fontSize: pxToRem(14),
          '&:hover, &:active': {
            color: alpha(theme.colors.primary, 0.7)
          }
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          border: `1px solid ${theme.border.thin}`,
          padding: '12px 15px',
          fontSize: pxToRem(12)
        },
        icon: {
          right: 2
        },
        select: {
          '&:focus': {
            borderRadius: 'inherit',
            borderColor: theme.border.darker
          }
        }
      }
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true
      },
      styleOverrides: {
        root: {
          fontSize: pxToRem(14),
          fontWeight: 700,
          color: theme.text.description
        },
        shrink: {
          marginBottom: 8,
          position: 'initial',
          transform: 'unset',
          transformOrigin: 'unset'
        },
        asterisk: {
          color: theme.tags.red
        }
      }
    },
    MuiInput: {
      defaultProps: {
        disableUnderline: true
      },
      styleOverrides: {
        root: {
          borderRadius: 6,
          border: '1px solid',
          borderColor: theme.border.thin,
          fontSize: pxToRem(14),
          marginTop: '0 !important',
          '&.Mui-focused': {
            borderColor: theme.colors.primary
          },
          '&.Mui-error': {
            borderColor: theme.tags.red
          },
          '&.Mui-disabled': {
            borderColor: theme.border.thin,
            backgroundColor: alpha(theme.grey.fourth, 0.5),
            color: theme.grey.main
          },
          '& .MuiIconButton-root.MuiIconButton-edgeEnd': {
            marginRight: 0,
            marginLeft: -4
          }
        },
        input: {
          padding: '10px 15px',
          height: 'unset',
          minHeight: 'unset',
          '&::placeholder': {
            fontSize: pxToRem(12),
            color: theme.text.description
          }
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        variant: 'standard'
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            WebkitTextFillColor: null
          }
        },
        multiline: {
          height: 'auto !important'
        },
        input: {
          '&::placeholder': {
            color: theme.text.description,
            opacity: 0.7
          }
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: '8px 20px'
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: pxToRem(14),
          outline: 'none',
          '&.Mui-selected': {
            fontWeight: 500,
            backgroundColor: alpha(theme.colors.primary, 0.1)
          }
        }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: '24px 24px 30px'
        }
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '24px',
          overflowY: undefined
        }
      }
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '24px',
          paddingTop: '16px',
          '& > :not(:first-of-type)': {
            marginLeft: 24
          }
        }
      }
    },
    MuiDialog: {
      defaultProps: {
        fullWidth: true
      },
      styleOverrides: {
        paper: {
          borderRadius: 24,
          padding: '16px 24px',
          boxShadow: '0px 6px 58px rgba(121, 145, 173, 0.195504)'
        },
        paperScrollBody: {
          '& .MuiDialogContent-root': {
            overflowY: 'hidden'
          }
        },
        paperWidthMd: {
          maxWidth: '700px'
        },
        paperWidthXs: {
          maxWidth: '500px'
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: theme.border.darker
        },
        wrapper: {
          color: theme.border.thin,
          fontSize: pxToRem(18),
          paddingLeft: 20,
          paddingRight: 20
        },
        wrapperVertical: {
          paddingTop: 20,
          paddingBottom: 20
        },
        withChildren: {
          '&::after, &::before': {
            borderColor: theme.grey.main
          }
        },
        withChildrenVertical: {
          '&::after, &::before': {
            borderColor: theme.grey.main
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'unset'
        },
        elevation7: {
          boxShadow: theme.shadow.first,
          backgroundColor: theme.background.light
        },
        elevation8: {
          boxShadow: theme.shadow.second
        },
        elevation9: {
          boxShadow: '0 5px 15px 0 rgba(68, 68, 79, 0.1)'
        },
        rounded: {
          borderRadius: 6
        },
        outlined: {
          border: `1px solid ${theme.border}`
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: 0,
          backgroundColor: theme.background.light
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.colors.darker,
          color: theme.text.light,
          fontSize: pxToRem(12),
          padding: 10,
          borderRadius: 8,
          width: 'auto'
        },
        arrow: {
          color: theme.colors.darker
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          paddingTop: 0,
          paddingBottom: 0,
          fontSize: pxToRem(14),
          color: theme.text.main,
          transition: 'all 0.3s linear',
          borderTopRightRadius: '16px',
          borderBottomRightRadius: '16px',
          fontWeight: 500,
          '&:hover': {
            backgroundColor: alpha(theme.grey.secondary, 0.4)
          },
          '&.Mui-selected': {
            fontWeight: 700,
            color: theme.colors.primary,
            backgroundColor: alpha(theme.colors.primary, 0.1)
          }
        }
      }
    }
  }
})

export const materialTheme = createTheme(materialBaseTheme(colorTheme))
