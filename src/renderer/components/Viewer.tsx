import * as React from 'react'
import styled from 'styled-components'
import { ipcRenderer } from 'electron'
import { IpcEvents } from '../../IpcEvents'
import Scene from './Scene'

const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 40px);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`

export default class Viewer extends React.Component {
  state = {
    file: ''
  }

  componentDidMount() {
    ipcRenderer.on(IpcEvents.ChangeFile, this.viewObj)
  }

  componentWillUnmount() {
    ipcRenderer.removeListener(IpcEvents.ChangeFile, this.viewObj)
  }

  viewObj = (e, files: string[]) => {
    this.setState({
      file: files[0]
    })
  }

  changeFile = (file: string) => {
    this.setState({ file })
  }

  render() {
    return (
      <Wrapper>
        <Scene file={this.state.file} changeFile={this.changeFile} />
      </Wrapper>
    )
  }
}
