Materials are used to put color on each visible pixel of geometries
    shaders are written, we can write our own or use built in shaders

normals contain information that contains the direction of the outside of the face

normals can be used for lighting, reflection, refraction, etc.

MeshNormalMaterial shares common properties with MeshBasicMaterial like wireframe, transparent, opacity, side
    also has flatshading property (unique to meshnormalmaterial)
    will flatten faces meaning normals won't be interpolated

matcap gives illusion that objects are being illuminated

meshDepthMaterial will color geometry white if its close to the near value of the camera and black if it is close to the far value of the camera

meshLambertMaterial reacts to light

ambientOcclusion map will add shadows where texture is dark, we must add a second set of uv coordinates named uv2

shadermaterial or rawshadermaterial can be used to create your own materials

environment map is an image of whats surrounding the scene.  It can be used for reflection or refraction but also general lighting.  Environment maps are supported by multiple materials but we will use MeshStandardMaterial