import React from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { StyledEngineProvider } from '@mui/material'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { GlobalStyles } from './global-styles'
import { materialTheme } from './mui-theme'
import { theme } from './sc-theme'

export const ThemeProvider: React.FC = ({ children }) => (
  <StyledEngineProvider injectFirst>
    <MuiThemeProvider theme={materialTheme}>
      <StyledThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </StyledThemeProvider>
    </MuiThemeProvider>
  </StyledEngineProvider>
)
