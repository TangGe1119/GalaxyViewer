import * as THREE from 'three'
import 'three/examples/js/loaders/LoaderSupport'
import 'three/examples/js/loaders/OBJLoader2'
import 'three/examples/js/loaders/GLTFLoader'
import 'three/examples/js/loaders/STLLoader'
import 'three/examples/js/loaders/SVGLoader'
import 'three/examples/js/loaders/VRMLLoader'

export default class Loader {
  filepath = ''
  format = ''

  static formats = ['OBJ', 'GLTF', 'STL', 'SVG', 'VTK', 'VRML']

  constructor(filepath: string) {
    this.filepath = filepath
    const s = filepath.split('.')
    this.format = s[s.length - 1].toUpperCase()
    if (!Loader.formats.includes(this.format)) {
      throw new Error('format not supported!')
    }
  }

  load(onProcess?: (percent: number) => void): Promise<THREE.Object3D> {
    return new Promise((resolve, reject) => {
      const loader = this.getLoader()
      loader.load(
        `http://127.0.0.1:7777?path=${this.filepath}`,
        e => {
          const obj = this.getObject(e)
          resolve(obj)
        },
        xhr => {
          const percent: number = (xhr.loaded / xhr.total) * 100
          onProcess && onProcess(percent)
        },
        () => reject()
      )
    })
  }

  private getLoader() {
    let { format } = this
    let loaderName = `${this.format}Loader`
    if (format === 'OBJ') {
      loaderName = 'OBJLoader2'
    }
    return new THREE[loaderName]()
  }

  private getObject(data) {
    if (this.format === 'OBJ') {
      return data.detail.loaderRootNode
    }

    if (this.format === 'SVG') {
      const paths = data.paths
      const group = new THREE.Group()
      for (let i = 0; i < paths.length; i++) {
        const path = paths[i]
        const material = new THREE.MeshBasicMaterial({
          color: path.color,
          side: THREE.DoubleSide,
          depthWrite: false
        })
        const shapes = path.toShapes(true)
        for (let j = 0; j < shapes.length; j++) {
          const shape = shapes[j]
          const geometry = new THREE.ShapeBufferGeometry(shape)
          const mesh = new THREE.Mesh(geometry, material)
          group.add(mesh)
        }
      }
      return group
    }
    return data
  }
}
