import React from 'react'
import { Button, Grid, Typography, useMediaQuery } from '@mui/material'
import { SearchInput } from 'components/SearchInput'
import { UserRow } from 'components/UserRow'
import { usersMock } from 'constants/users.mock'
import * as S from './Home.style'

export interface HomeProps {}

export const Home = (props: HomeProps) => {
  const smDown = useMediaQuery('(max-width: 600px)')
  return (
    <S.Container>
      <Grid container spacing={6}>
        <Grid item container spacing={3}>
          <Grid item container spacing={0.5}>
            <Grid item xs={12}>
              <Typography variant="display2">Usuários</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" color="text.secondary">
                Total: <strong>28</strong>
              </Typography>
            </Grid>
          </Grid>
          <Grid item container spacing={3} justifyContent="space-between">
            <Grid item xs={12} md={6}>
              <SearchInput placeholder="Pesquisar..." />
            </Grid>
            <Grid item container justifyContent="flex-end" xs={12} md={4}>
              <Button fullWidth={smDown} startIcon={<S.PlusIcon />}>
                Criar usuário
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container spacing={3}>
          {usersMock.map(user => (
            <Grid item key={user.id} xs={12}>
              <UserRow user={user} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </S.Container>
  )
}
