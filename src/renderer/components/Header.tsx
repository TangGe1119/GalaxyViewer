import * as React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #888888;
  border-bottom: 1px solid #444444;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  -webkit-app-region: drag;
`

export default function Header() {
  return <Wrapper>GalaxViewer</Wrapper>
}
