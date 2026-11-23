import bpy
import math

arm = bpy.data.objects.get('Armature.001')
bpy.context.view_layer.objects.active = arm
bpy.ops.object.mode_set(mode='POSE')

# Let's inspect the current rotation mode and values of BnBraco.L and BnBraco.R
for bname in ['BnBraco.L', 'BnAntBraco.L', 'BnMao.L', 'BnBraco.R', 'BnAntBraco.R', 'BnMao.R']:
    pbone = arm.pose.bones.get(bname)
    if pbone:
        print(f'{bname} rot_mode={pbone.rotation_mode}, quat={list(pbone.rotation_quaternion)}, euler={list(pbone.rotation_euler)}')
