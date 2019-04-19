import * as React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #999;
  border-bottom: 1px solid #444444;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  -webkit-app-region: drag;
`

export default function Header() {
  return <Wrapper>GalaxyViewer</Wrapper>
}
