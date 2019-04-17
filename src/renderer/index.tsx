import * as React from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
import ActionIcons from './components/ActionIcons'
import './global.css'

const Wrapper = styled.div`
  height: 100%;
`

const App = () => (
  <Wrapper>
    <ActionIcons />
  </Wrapper>
)

render(<App />, document.getElementById('root'))
