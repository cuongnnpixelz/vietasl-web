import bpy

arm = bpy.data.objects.get('Armature.001')
for bname in ['BnBraco.L', 'BnAntBraco.L', 'BnAntBraco.L.001', 'BnMao.L', 'BnBraco.R', 'BnAntBraco.R', 'BnAntBraco.R.001', 'BnMao.R']:
    bone = arm.data.bones.get(bname)
    if bone:
        print(f'Bone {bname}: parent = {bone.parent.name if bone.parent else None}')
