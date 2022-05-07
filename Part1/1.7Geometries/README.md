Three JS Geometry

Composed of point coordinates in 3d spaces (vertices)
    can create faces
can be used to create meshes
can be used to create particles
Get a particle for each vertices.

each vertex has position, uv coordinates, normal, color, size, ...

Geometries used here will inheret from BufferGeometry class.  Has many methods like translate(...), rotateX(...), normalize(),...
usually, create geometry & move mesh

built-in geometries: boxgeometry: , planegeometry, circlegeometry, conegeometry, cylindergeometry, ringegeometry, torusgeometry, torusknotgeometry, dodecahedirongeometry
6 parameters
width: size on the x axis
height: size on the y axis
depth size on z axis
widthSegments - subdivisions in x axis
heightSegments - y
depthSegments - z