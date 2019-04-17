import * as React from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
import './global.css'

import Header from './components/Header'

const Wrapper = styled.div`
  height: 100%;
`

const App = () => (
  <Wrapper>
    <Header />
  </Wrapper>
)

render(<App />, document.getElementById('root'))
