import * as React from 'react'
import styled from 'styled-components'
import { remote } from 'electron'
import * as THREE from 'three'
import 'three/examples/js/controls/OrbitControls'
import Loader from '../loader'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  .progress {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    color: #dedede;
    z-index: 99999999;
  }

  .preview {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    color: #444;
    z-index: 99999999;

    &.active {
      color: #ffffff;
    }
  }
`

interface IProps {
  file: string
  changeFile: (file: string) => void
}

export default class Scene extends React.Component<IProps> {
  scene = null
  camera = null
  controls = null
  container: React.RefObject<HTMLDivElement> = React.createRef()
  showingMesh: any = null

  state = {
    progress: 0,
    isOver: false
  }

  componentDidMount() {
    this.init()
  }

  componentWillReceiveProps(np: IProps) {
    if (np.file && np.file !== this.props.file) {
      this.loadFile(np.file)
    }
  }

  get rect() {
    return this.container
      ? this.container.current.getBoundingClientRect()
      : { width: 0, height: 0 }
  }

  init() {
    this.scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      this.rect.width / this.rect.height,
      0.1,
      1000000
    )
    this.camera = camera
    camera.position.z = 300

    // init renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true
    })
    renderer.setSize(this.rect.width, this.rect.height)
    renderer.setClearColor(0x323232)
    this.container.current.appendChild(renderer.domElement)

    // init light
    const light = new THREE.AmbientLight(0xffffff, 1)
    this.scene.add(light)

    const light2 = new THREE.HemisphereLight(0xffffff, 0xbebebe, 2)
    light2.position.y = 10000
    this.scene.add(light2)

    const controls = new THREE['OrbitControls'](camera, renderer.domElement)
    this.controls = controls
    window.addEventListener('resize', () => {
      renderer.setSize(this.rect.width, this.rect.height)
      camera.aspect = this.rect.width / this.rect.height
      camera.updateProjectionMatrix()
    })

    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(this.scene, camera)
      controls.update()
    }
    animate()
  }

  async loadFile(file: string) {
    this.scene.remove(this.showingMesh)
    try {
      const loader = new Loader(file)
      const mesh = await loader.load(percent => {
        this.setState({ progress: percent.toFixed(2) })
      })
      if (mesh) {
        this.controls.reset()
        this.showingMesh = mesh
        this.scene.add(mesh)
        this.fitCameraToObject()
        this.setState({ progress: 0 })
      }
    } catch (e) {
      this.setState({ isOver: false })
      remote.dialog.showMessageBox({
        type: 'error',
        message: '文件格式暂不支持'
      })
    }
  }

  fitCameraToObject() {
    if (!this.showingMesh) return
    const boundingBox = new THREE.Box3()
    boundingBox.setFromObject(this.showingMesh)
    let center = new THREE.Vector3()
    let size = new THREE.Vector3()
    boundingBox.getCenter(center)
    boundingBox.getSize(size)
    const maxDim = Math.max(size.x, size.y, size.z)
    this.controls.target = center
    this.camera.position.z = maxDim * 3.6
    this.camera.lookAt(center)
    this.camera.updateProjectionMatrix()
  }

  onDrop = (e: DragEvent) => {
    e.preventDefault()
    this.setState({ isOver: false })
    const file = e.dataTransfer.files[0]
    this.loadFile(file.path)
  }

  onOver = (e: DragEvent) => {
    this.setState({ isOver: true })
    e.preventDefault()
  }

  chooseFile = () => {
    remote.dialog.showOpenDialog(
      {
        properties: ['openFile']
      },
      filePaths => {
        this.props.changeFile(filePaths[0])
      }
    )
  }

  render() {
    return (
      <Wrapper
        onDragOver={this.onOver}
        onDrop={this.onDrop}
        ref={this.container}
      >
        {this.state.progress > 0 && (
          <div className="progress">{this.state.progress}%</div>
        )}

        {this.state.progress === 0 && !this.showingMesh && (
          <div
            className={`${this.state.isOver ? 'active preview' : 'preview'}`}
            onDoubleClick={this.chooseFile}
          >
            Drop file to preview
          </div>
        )}
      </Wrapper>
    )
  }
}
