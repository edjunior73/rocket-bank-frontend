import React from 'react'
import { Grid, GridProps, Typography } from '@mui/material'

type MoreGridSizes = 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24

// @ts-ignore
export interface UserColumnProps extends GridProps {
  columnName: string
  value: React.ReactNode
  primary?: boolean
  xs?: GridProps['xs'] | MoreGridSizes
  sm?: GridProps['sm'] | MoreGridSizes
  md?: GridProps['md'] | MoreGridSizes
  lg?: GridProps['lg'] | MoreGridSizes
  xl?: GridProps['xl'] | MoreGridSizes
}

export const UserColumn = ({ columnName, value, primary, ...props }: UserColumnProps) => {
  return (
    // @ts-ignore
    <Grid container direction="column" spacing={0.5} item {...props}>
      <Grid item>
        <Typography variant="h5" color="text.secondary">
          {columnName}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h4" fontWeight={primary ? 'bold' : 400}>
          {value}
        </Typography>
      </Grid>
    </Grid>
  )
}
