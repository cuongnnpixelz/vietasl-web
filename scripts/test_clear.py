import bpy

arm = bpy.data.objects.get('Armature.001')
if arm:
    arm.animation_data_clear()
    bpy.context.view_layer.objects.active = arm
    bpy.ops.object.mode_set(mode='POSE')
    bpy.ops.pose.select_all(action='SELECT')
    bpy.ops.pose.transforms_clear()
    bpy.ops.object.mode_set(mode='OBJECT')
    print("Armature pose cleared to rest pose successfully.")
