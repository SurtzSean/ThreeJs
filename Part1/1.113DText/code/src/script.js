import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import lodash from 'lodash'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//const axesHelper = new THREE.AxesHelper()
//scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture  = textureLoader.load('/textures/matcaps/8.png')

const fontLoader = new FontLoader()

fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) =>{

    const textGeometry = new TextGeometry('Hello World', {
        font: font,
        size: .5,
        height: .2,
        curveSegments: 3,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 4
    })
    // textGeometry.computeBoundingBox()
    // textGeometry.translate(
    //     - .5 * textGeometry.boundingBox.max.x,
    //     - .5 * textGeometry.boundingBox.max.y,
    //     0
    // )
    textGeometry.center()
    //keep outside of loop for optimization
    const donutGeometry = new THREE.TorusBufferGeometry(.3, .2, 20, 45)
    const donutMaterial = new THREE.MeshMatcapMaterial({
        color: 0xffffff,
        matcap: matcapTexture
    })
    lodash.range(1000).forEach(() =>{
        const donut = new THREE.Mesh(donutGeometry, donutMaterial)
        donut.position.set(
            (Math.random() - .5) * 20 + 3,
            (Math.random() - .5) * 20 + 3,
            (Math.random() - .5) * 20 + 3,
        )
        donut.rotation.set(
            Math.random() * 2 * Math.PI,
            Math.random() * 2 * Math.PI,
            Math.random() * 2 * Math.PI
        )
        const scale = Math.random() * .5 + .5
        donut.scale.set(
            scale,
            scale,
            scale
        )
        scene.add(donut)
    })

    const textMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture})
    const text = new THREE.Mesh(textGeometry, textMaterial)
    scene.add(text)
})

/**
 * Object
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()