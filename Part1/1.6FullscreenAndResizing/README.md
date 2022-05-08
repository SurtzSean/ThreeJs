viewport - just content you can see
get viewport window.innerWidth/window.innerHeight

browser has default styling, need to fix in style.css so that there is no border (default margin/padding)

also must handle resize or else window won't update for size

blurry render may be caused by using pixel ratio greater than 1
pixel ratio corresponds to how many physical pixels you have for one unit of the software part

for years all screens had pixel ratio for 1 & if you looked closely you could see those pixels
constructors like apple built screens with pixel ratio with 2
now some have even highe rpixel ratios like beyond 3

pixel ratio of 2 means 4 times more pixels to render & 3 means 9 times more pixels to render
highest pixel ratios are on the weakest devices
window.devicePixelRatio handles the pixel ratio