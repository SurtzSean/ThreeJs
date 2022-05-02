Scene - contains object, lights model
Rendered by 3js
Objects - can be many things
primitive gemoetry, imported models, particles, lights, etc.
Mesh - combination of geometry (shape) and material (look)

material - basic mesh material
in three js there are multiple ways to represent color
THREE.MeshBasicMaterial({color: 0xff0000})
0xff0000 - hex
'#ff0000'
'red'
ways to express color 0xff0000 = red

mesh composed with geometry & material
Three.mesh(geometry, material)

camera - serve as pov when doing Renderedcan have multiple and switch between them
different types ex: perspective, orthographic


fov = vertical vision angle in degrees
camera = Three.PerspectiveCamera(75, sizes.width / sizes.height)
aspect ratio the width of the render divided by height of render

renderer - scene from teh camera povresult drawn into a canvas
HTML element which you can draw stuff
will use WebGL to draw the render inside this canvas
create it yourself or you can let three.js do it

transform with position, rotation,s cale properties