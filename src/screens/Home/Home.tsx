import SearchInput from 'components/SearchInput'
import React from 'react'

export interface HomeProps {}

export const Home = (props: HomeProps) => {
  return (
    <div>
      <SearchInput />
    </div>
  )
}

export default Home
