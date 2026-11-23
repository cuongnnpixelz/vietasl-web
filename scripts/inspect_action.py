import bpy

act = bpy.data.actions.get('Untitled')
if act:
    print('Action frame range:', act.frame_range)
    bones = set()
    for fc in act.fcurves:
        if 'pose.bones' in fc.data_path:
            b = fc.data_path.split('"')[1]
            bones.add(b)
    print('Keyed bones count:', len(bones))
    print('Keyed bones:', sorted(list(bones)))
