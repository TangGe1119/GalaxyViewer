import * as React from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
import './global.css'

const Wrapper = styled.div`
  height: 100%;
`

const App = () => <Wrapper>hello</Wrapper>

render(<App />, document.getElementById('root'))
