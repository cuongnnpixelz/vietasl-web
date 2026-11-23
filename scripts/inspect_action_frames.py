import bpy

act = bpy.data.actions.get('Untitled')
if act:
    print('Action name:', act.name)
    # Check keyframe times
    times = set()
    for fc in act.fcurves:
        for kp in fc.keyframe_points:
            times.add(kp.co[0])
    print('Keyframe frames:', sorted(list(times))[:20])

    # Check some bone rotations at frame 1, 30, 90, 180
    arm = bpy.data.objects.get('Armature.001')
    arm.animation_data.action = act
    for frame in [1, 30, 90, 180]:
        bpy.context.scene.frame_set(frame)
        pbone = arm.pose.bones.get('BnBraco.L')
        if pbone:
            print(f'Frame {frame} BnBraco.L rot: {list(pbone.rotation_quaternion)}')
        pbone_r = arm.pose.bones.get('BnBraco.R')
        if pbone_r:
            print(f'Frame {frame} BnBraco.R rot: {list(pbone_r.rotation_quaternion)}')
