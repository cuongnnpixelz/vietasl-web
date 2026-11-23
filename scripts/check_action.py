import bpy

act = bpy.data.actions.get('Untitled')
if act:
    print('Action name:', act.name, 'frame_range:', act.frame_range)
    keyed = set()
    for fc in act.fcurves:
        keyed.add(fc.data_path)
    print('Keyed count:', len(keyed))
    for p in sorted(list(keyed))[:30]:
        print('  ', p)
