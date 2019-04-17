import * as React from 'react'
import * as THREE from 'three'
import styled from 'styled-components'
;(window as any).THREE = THREE

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

export default class Scene extends React.Component<any> {
  scene = null
  camera = null
  container: React.RefObject<HTMLDivElement> = React.createRef()
  showingMesh: null

  componentDidMount() {
    this.init()
  }

  componentWillReceiveProps(np) {
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
    camera.position.z = 3

    // init renderer
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(this.rect.width, this.rect.height)
    renderer.setClearColor(0x323232)
    this.container.current.appendChild(renderer.domElement)

    // init light
    const light = new THREE.AmbientLight(0xffffff, 2)
    this.scene.add(light)

    // init controls
    require('three/examples/js/controls/OrbitControls')
    const controls = new THREE['OrbitControls'](camera, renderer.domElement)

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

  loadFile(file: string) {
    this.scene.remove(this.showingMesh)
    require('three/examples/js/loaders/LoaderSupport')
    require('three/examples/js/loaders/OBJLoader2')

    const loader = new THREE['OBJLoader2']()
    loader.load(`http://127.0.0.1:7777?path=${file}`, e => {
      this.showingMesh = e.detail.loaderRootNode
      this.scene.add(e.detail.loaderRootNode)
    })
  }

  onDrop = (e: DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    this.loadFile(file.path)
  }

  render() {
    return (
      <Wrapper
        onDragOver={e => e.preventDefault()}
        onDrop={this.onDrop}
        ref={this.container}
      />
    )
  }
}
