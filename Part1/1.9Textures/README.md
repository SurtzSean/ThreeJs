Textures are images to cover surface of geometry

Texture types
    Color (or albedo) Texture
        color.jpg
        most simple one, applied on the geometry
    Alpha
        alpha.jpg
        grayscale image
        white visible
        black not visible
    Height (or deplacement)
        grayscale image
        move veritices to create some relief
        need enough subdivision
        white vertice goes up, black vertice goes down, in the middle doesn't move
    Normal
        normal.jpg
        Add details
        doesn't need subdivision
        vertices won't move
        lure the light about the face orientation
        better performance than height texture because height requires much subdivision
    Ambient Occlusion
        grayscale image
        add fake shadow in crevices
        not physically accurate
        helps to create contrast and see details
    Metalness
        metalness.jpg
        grayscale image
        white is metallic
        black is non-metallic
        mostly for reflection
    Roughness
        roughness.jpg
        grayscale image
        in duo with the metalness
        white is rough
        black is smooth
        mostly for light dissipation
    There are many other types but these are the main ones and we will focus on those

These textures follow PBR principles
    physically based rendering (PBR)
    many techniques that tend to follow real life directions to get realistic results
    becoming the standard for realistic renders
    many software engines and libraries are using it

Loading textures:
    Get image URL
        several ways of doing it with webpack
            put image texture in /src/ folder and import
                import imageSource from './image.png'
            put in static folder
                can access like site.com/color.jpg
                no need to call import

want to use loading manager to mutualize its useful if we want to know the global loading progress or be informed when everything is loaded

mip mapping is a technique that consits of creating half a smaller version of a texture over and over until we get a 1x1 texture
all those texture variations are set to the GPU and the GPU will choose the most appropriate version of the texture depending on how much
of the pixel we can see.

minification filter is when the pixels of the texture are smaller than the picture of the render (texture is too big for the surface it covers)
Change the minification filter of the texture using minFilter property with those 6 values
    NearestFilter, LInearFilter, NearestMipmipNearestFilter, nearestmipmaplinearfilter, linearMipmapnearestfilter, linearmipmpalinearfilter (default)

if using nearestfilter on minfilter we don't need mipmaps


Texture format an optimization
    3 crucial elements
    the weight, the size, the data

The weight:
    user will need to download many textures
        .jpg lossy, but lighter
        .png lossless compression, but usually heavier
    you can use compression websites like TinyPNG
    basis compression as well, but it is complex

size:
    each pixel of the texture will have to be stored on the GPU regarldess of the image's weight
    GPU storage has limitations
    It's worse because mip-mapping increases number of pixels to store, try to reduce size of your texture as much as possible

    Textures must be power of 2.  32x32, 64x64, etc.

The data
    textures suppor transparency, but can't have it in .jpg file
    if we want to have only one texture that combine color and alpha we better use .png file
        or can have color & alpha version :D
    normal textures are normally .png since they're lossless.  If we use .jpg we may see strange results