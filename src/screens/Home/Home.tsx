import React, { useState, useMemo } from 'react'
import { Button, Grid, Theme, Typography, useMediaQuery } from '@mui/material'
import { matchSorter } from 'match-sorter'
import { compareAsc } from 'date-fns'
import { SearchInput } from 'components/SearchInput'
import { UserRow } from 'components/UserRow'
import { usersMock } from 'constants/users.mock'
import * as S from './Home.style'

export interface HomeProps {}

export const Home = (props: HomeProps) => {
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const [search, setSearch] = useState('')
  const filteredUsers = useMemo(() => {
    return matchSorter(usersMock, search, {
      keys: ['name'],
      sorter: rankedItems =>
        [...rankedItems].sort((a, b) => compareAsc(a.item.birthday, b.item.birthday))
    })
  }, [search])

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

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
              <SearchInput placeholder="Pesquisar..." onChange={handleChangeSearch} value={search} />
            </Grid>
            <Grid item container justifyContent="flex-end" xs={12} md={4}>
              <Button fullWidth={mdDown} startIcon={<S.PlusIcon />}>
                Criar usuário
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container spacing={3}>
          {filteredUsers.map(user => (
            <Grid item key={user.id} xs={12}>
              <UserRow user={user} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </S.Container>
  )
}
