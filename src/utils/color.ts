import type { DefaultTheme } from 'styled-components'
import { Theme } from 'styles'

export type Colors = keyof Theme['tags'] | 'primary' | 'secondary'

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
