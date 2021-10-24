/* eslint-disable indent */
import styled, { css, DefaultTheme } from 'styled-components'
import { alpha, hexToRgb, hslToRgb } from '@mui/material/styles'
import { Theme } from 'styles'

export type Colors = keyof Theme['tags'] | 'primary' | 'secondary'

const notLabelColors: Colors[] = ['primary', 'secondary']

export const getColor = (color: Colors, theme: DefaultTheme) => {
  switch (color) {
    case 'primary':
      return theme.colors.primary
    case 'secondary':
      return theme.text.description
    default:
      return theme.tags[color]
  }
}
