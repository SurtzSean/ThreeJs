import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Mesh, MeshLambertMaterial } from 'three'
import * as dat from 'dat.gui'
import { generateUUID } from 'three/src/math/MathUtils'

const gui = new dat.GUI()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')

//needed to prevent mag filter from 'fixing' small texture which will make cartoon not work
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false //best to deactive which we can if using nearest filter

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg', 
    '/textures/environmentMaps/0/nx.jpg', 
    '/textures/environmentMaps/0/py.jpg', 
    '/textures/environmentMaps/0/ny.jpg', 
    '/textures/environmentMaps/0/pz.jpg', 
    '/textures/environmentMaps/0/nz.jpg'])

// Scene
const scene = new THREE.Scene()

// const material = new THREE.MeshBasicMaterial({ 
//     map: doorColorTexture, 
//     alphaMap: doorAlphaTexture, 
//     aoMap: doorAmbientOcclusionTexture
//  },)
//  material.transparent = true //needed for alpha/transparency to work :O
//  material.opacity = .5
//  material.side = THREE.DoubleSide //avoid use


// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

// const material = new THREE.MeshDepthMaterial()

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// const material = new THREE.MeshLambertMaterial() //requires light!!!

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0xff0000)

// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture

const material = new THREE.MeshStandardMaterial()
material.roughness = 0.2
material.metalness = 0.7
material.envMap = environmentMapTexture
material.map = doorColorTexture
material.aoMap = doorAmbientOcclusionTexture
material.aoMapIntensity = 2
material.displacementMap = doorHeightTexture
material.displacementScale = 0.1
material.metalnessMap = doorMetalnessTexture
material.roughnessMap = doorRoughnessTexture
material.normalMap = doorNormalTexture
material.normalScale.set(0.1, 0.1)
material.alphaMap = doorAlphaTexture
material.transparent = true

gui.add(material, 'aoMapIntensity').min(0).max(10).step(.1)
gui.add(material, 'metalness').min(0).max(1).step(0.01)
gui.add(material, 'roughness').min(0).max(1).step(0.01)
gui.add(material, 'displacementScale').min(0).max(1).step(0.01)
gui.add(material, 'transparent').onChange(() => {
    material.needsUpdate = true
})

const sphere = new THREE.Mesh(new THREE.SphereGeometry(.5, 64, 64), material)
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 64, 64), material)
const torus = new THREE.Mesh(new THREE.TorusGeometry(.5, .1, 16, 100), material)

sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))
torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))

sphere.position.set(-1.5, 0, 0)
torus.position.set(1.5, 0, 0)

scene.add(sphere, plane, torus)

const ambientLight = new THREE.AmbientLight(0xffffff, .5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.set(2, 3, 4)
scene.add(pointLight)

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

    // Update Objects
    sphere.rotation.y = elapsedTime * .1
    torus.rotation.y = elapsedTime * .1
    plane.rotation.y = elapsedTime * .1
    sphere.rotation.x = elapsedTime * .1
    torus.rotation.x = elapsedTime * .1
    plane.rotation.x = elapsedTime * .1

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()