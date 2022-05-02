object transformations: position, scale, rotation, quaternion
quaternion is similar to rotation
All classes that inheret from Object3d posess those properties

These properties will be compiled into matrices

distance of unit is arbitrary, just decide & stick with

object has position, it inherets from Vector3

normalize will normalize the vector (make it a unit vector)
set to update the position all at once

AxesHelper displays the colored line for each axis

can rotate with rotation property or quaternion property.
updating one updates the other automatically!

careful with rotation, rotation axis order matters.  By default it will go x, y, and z.
Strange results can ensue when one axis is rotated differently
gimbal lock - when the rotation axis is parallel to the axis of rotation (lose one degree of freedom in 3D)

Euler is easy to understand but order can be problematic.  This is why most 3D software uses quaternions
Quaternions express rotation in a more mathematical way. It is a vector of 4 numbers.
The first 3 numbers are the axis of rotation.
The last number is the angle of rotation.  The angle is in radians.

Object3d instances have a lookat() method which roattes the object so it faces -z

you can create a group and put objects in it.  You can move, scale, rotate the group.  To do that use the Group class