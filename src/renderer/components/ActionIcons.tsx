import * as React from 'react'
import styled from 'styled-components'
import { ipcRenderer } from 'electron'

const Wrapper = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0px;
  right: 0px;
  font-size: 40px;
  cursor: pointer;
  color: #fff;
`

function closeWin() {
  ipcRenderer.send('win-close')
}

export default function ActionIcons() {
  return <Wrapper onClick={closeWin}>×</Wrapper>
}
