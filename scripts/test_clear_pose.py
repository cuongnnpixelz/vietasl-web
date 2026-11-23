import bpy

arm = bpy.data.objects.get('Armature.001')
bpy.context.view_layer.objects.active = arm
bpy.ops.object.mode_set(mode='POSE')
bpy.ops.pose.select_all(action='SELECT')
bpy.ops.pose.rot_clear()
bpy.ops.pose.loc_clear()
bpy.ops.pose.scale_clear()

# Now inspect head and tail of bones in world space
for bname in ['BnBraco.L', 'BnAntBraco.L', 'BnMao.L', 'BnBraco.R', 'BnAntBraco.R', 'BnMao.R']:
    pbone = arm.pose.bones.get(bname)
    if pbone:
        print(f'Cleared {bname}: head={list(pbone.head)}, tail={list(pbone.tail)}')
