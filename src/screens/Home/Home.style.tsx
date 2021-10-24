import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  padding: 30px 40px;
  flex-direction: column;
`

export const PlusIcon = styled.i.attrs({
  className: 'isax isax-add'
})`
  && {
    font-size: 24px;
  }
`
