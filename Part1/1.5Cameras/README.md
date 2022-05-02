Camera - abstract class in three.js
Cube, Orthographic, perspective, stereo cameras implementations

ArrayCamera render scene from multiple cameras on specific areas of render

Stereocamera - render the scene through two cameras that mimic eyes to create parallax effect.  Useful with VR, 3d glasses, cardbaord

Cube Camera - 6 renders each facing a different direction.  Can render teh surrounding things for things like env map, reflection, or shadow map

Orthographic camera - render the scene without perspective distortion.  Useful for 2d games.  Size remains the same regardless of zoom.

Perspective - camera render the scene with perspective distortion.  Useful for 3d games.  Size changes with zoom.
Perspective camera params:
    Field of view (FOV) - vertical vision angle in degrees
        too large fov can cause distortion
    Aspect Ratio - (width of render) / (height of render)
    Near and Far - how close and how far the camera can see.  Any object or part of object closer than near won't show up
    any object further than far won't show up
        do not use extreme values like .0001 and 99999999 to prevent z-fighting
            GPU may have trouble figuring out which is in front of other

Orthographic camera - differs due to lack of perspective.  Objects same size regardldess of dist to camera
    Parameters - instead of fov we provid how far camera can see
        Left, right, top, bottom, near, far
        use canvas ratio (width by height) to render to avoid flat look


Control camera with mouse
update camera with position and tick function with cursor coords

Device orientation controls will automatically retrieve orientation of device and will rotate camera accordingly
useful to create immersive universes or VR experiences (IOS possibly doesn't support anymore)

Fly controls - enable moving the camera like if you were on a spaceship.  Can rotate all 3 axes, forward & backward

First person controls - like fly control but cannot do pitch & yaw

Pointer lock controls - uses pointer lock javascript API - makes mouse disappear within browser
hard to use, & almost only handles the pointer lock and camera rotation

orbit controls - similar to controls we made, orbit around smoothly
    cannot be accessed with Three.OrbitControls

Trackball controls - no limit up & down, similar to orbit controls

Transform controls - nothing to do with camera.  Lets you transform objects, not camera related
Drag ocntrols - move objects with drag, not related to camera

built in controls vs custom controls
    built in controls are for basic camera controls, custom controls are for more advanced controls

*/

