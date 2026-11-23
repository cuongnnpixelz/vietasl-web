import bpy
import os
import shutil

print("==================================================")
print("  EXPORTING VLIBRAS 3D CHARACTER FROM BLENDER")
print("==================================================")

blend_path = r"c:\Users\ACER\Downloads\BLENDER_PADRAO_VLIBRAS\padrao.blend"
output_dir = r"C:\Users\ACER\.gemini\antigravity\scratch\vietasl-web\public\avatars"
output_glb = os.path.join(output_dir, "avatar.glb")
output_glb_alias = os.path.join(output_dir, "icaro_vlibras.glb")
public_tex_dir = os.path.join(output_dir, "textures")
source_tex_dir = r"c:\Users\ACER\Downloads\BLENDER_PADRAO_VLIBRAS\textures"

os.makedirs(output_dir, exist_ok=True)
os.makedirs(public_tex_dir, exist_ok=True)

# Copy textures to public directory
if os.path.exists(source_tex_dir):
    for fname in os.listdir(source_tex_dir):
        src_f = os.path.join(source_tex_dir, fname)
        dst_f = os.path.join(public_tex_dir, fname)
        if os.path.isfile(src_f):
            shutil.copy2(src_f, dst_f)
            print(f"Copied texture: {fname}")

# 1. Bone name mapping for ASL engine compatibility
BONE_RENAME_MAP = {
    # Spine & Head
    "BnBacia.001": "Hips",
    "BnCol-01": "Spine",
    "BnCol-02": "Spine1",
    "BnCol-03": "Spine2",
    "BnPescoco": "Neck",
    "BnCabeca": "Head",

    # Left Arm & Hand
    "BnOmbro.L": "LeftShoulder",
    "BnBraco.L": "LeftArm",
    "BnAntBraco.L": "LeftForeArm",
    "BnAntBraco.L.001": "LeftForeArm_Twist",
    "BnMao.L": "LeftHand",

    # Left Fingers
    "BnDedo.1.L.004": "LeftHandThumb1",
    "BnDedo.1.L.014": "LeftHandThumb2",
    "BnDedo.1.L.013": "LeftHandThumb3",

    "BnDedo.1.L.003": "LeftHandIndex1",
    "BnDedo.1.L.012": "LeftHandIndex2",
    "BnDedo.1.L.011": "LeftHandIndex3",

    "BnDedo.1.L.002": "LeftHandMiddle1",
    "BnDedo.1.L.010": "LeftHandMiddle2",
    "BnDedo.1.L.009": "LeftHandMiddle3",

    "BnDedo.1.L.001": "LeftHandRing1",
    "BnDedo.1.L.008": "LeftHandRing2",
    "BnDedo.1.L.007": "LeftHandRing3",

    "BnDedo.1.L": "LeftHandPinky1",
    "BnDedo.1.L.006": "LeftHandPinky2",
    "BnDedo.1.L.005": "LeftHandPinky3",

    # Right Arm & Hand
    "BnOmbro.R": "RightShoulder",
    "BnBraco.R": "RightArm",
    "BnAntBraco.R": "RightForeArm",
    "BnAntBraco.R.001": "RightForeArm_Twist",
    "BnMao.R": "RightHand",

    # Right Fingers
    "BnDedo.1.R.004": "RightHandThumb1",
    "BnDedo.1.R.014": "RightHandThumb2",
    "BnDedo.1.R.013": "RightHandThumb3",

    "BnDedo.1.R.003": "RightHandIndex1",
    "BnDedo.1.R.012": "RightHandIndex2",
    "BnDedo.1.R.011": "RightHandIndex3",

    "BnDedo.1.R.002": "RightHandMiddle1",
    "BnDedo.1.R.010": "RightHandMiddle2",
    "BnDedo.1.R.009": "RightHandMiddle3",

    "BnDedo.1.R.001": "RightHandRing1",
    "BnDedo.1.R.008": "RightHandRing2",
    "BnDedo.1.R.007": "RightHandRing3",

    "BnDedo.1.R": "RightHandPinky1",
    "BnDedo.1.R.006": "RightHandPinky2",
    "BnDedo.1.R.005": "RightHandPinky3",

    # Legs
    "BnPerna.L": "LeftUpLeg",
    "BnPerna.R": "RightUpLeg",
}

armature_obj = bpy.data.objects.get("Armature.001")
if armature_obj:
    print(f"Renaming bones on {armature_obj.name}...")
    for old_name, new_name in BONE_RENAME_MAP.items():
        bone = armature_obj.data.bones.get(old_name)
        if bone:
            bone.name = new_name

    # Also update vertex groups on all child meshes
    for child in armature_obj.children:
        if child.type == 'MESH':
            for old_name, new_name in BONE_RENAME_MAP.items():
                vg = child.vertex_groups.get(old_name)
                if vg:
                    vg.name = new_name
    # Clear any active action/animation data so avatar is in pure bind pose
    armature_obj.animation_data_clear()
    for pb in armature_obj.pose.bones:
        pb.matrix_basis.identity()
        pb.location = (0, 0, 0)
        pb.rotation_quaternion = (1, 0, 0, 0)
        pb.rotation_euler = (0, 0, 0)
        pb.scale = (1, 1, 1)
    print("Armature pose cleared to canonical bind pose.")
    print("Bone and vertex group renaming complete.")

# 2. Setup Principled BSDF Materials with Textures
def setup_pbr_material(mat_name, image_path=None, base_color=None, roughness=0.6, metalness=0.0):
    mat = bpy.data.materials.get(mat_name)
    if not mat:
        mat = bpy.data.materials.new(name=mat_name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()

    output = nodes.new(type='ShaderNodeOutputMaterial')
    output.location = (400, 0)
    
    bsdf = nodes.new(type='ShaderNodeBsdfPrincipled')
    bsdf.location = (0, 0)
    bsdf.inputs['Roughness'].default_value = roughness
    bsdf.inputs['Metallic'].default_value = metalness

    if image_path and os.path.exists(image_path):
        img_node = nodes.new(type='ShaderNodeTexImage')
        img_node.location = (-400, 0)
        img = bpy.data.images.load(image_path)
        img_node.image = img
        links.new(img_node.outputs['Color'], bsdf.inputs['Base Color'])
    elif base_color:
        bsdf.inputs['Base Color'].default_value = base_color

    links.new(bsdf.outputs['BSDF'], output.inputs['Surface'])
    print(f"Configured material: {mat_name}")
    return mat

head_tex = os.path.join(public_tex_dir, "cabecaAvatarCartoon.png")
body_tex = os.path.join(public_tex_dir, "TxCorpo.png")

# Head texture (Face, skin, ears, eyelids)
setup_pbr_material("CABECA", image_path=head_tex, roughness=0.5, metalness=0.0)

# Body texture (Detailed skin with ambient occlusion, fingernails, palm creases, shirt folds)
setup_pbr_material("MatCORPO", image_path=body_tex, roughness=0.5, metalness=0.0)

# Hair (Sculpted hair locks with specular highlights to bring out 3D strands and volume)
setup_pbr_material("CABELO", base_color=(0.14, 0.12, 0.12, 1.0), roughness=0.38, metalness=0.05)

# Navy Shirt
setup_pbr_material("defaultMat", base_color=(0.12, 0.18, 0.45, 1.0), roughness=0.75, metalness=0.0)

# Dark Charcoal Pants
setup_pbr_material("defaultMat.001", base_color=(0.10, 0.10, 0.12, 1.0), roughness=0.85, metalness=0.0)

# Eyelids
setup_pbr_material("Palpebras", base_color=(0.82, 0.58, 0.44, 1.0), roughness=0.55, metalness=0.0)

# Eyes & Teeth
setup_pbr_material("MatOlhosDentes", base_color=(0.98, 0.98, 0.98, 1.0), roughness=0.1, metalness=0.0)

# Pupil / Black parts
setup_pbr_material("Material.004", base_color=(0.02, 0.02, 0.02, 1.0), roughness=0.1, metalness=0.0)

# Tongue
setup_pbr_material("LINGUA", base_color=(0.8, 0.25, 0.28, 1.0), roughness=0.4, metalness=0.0)

# 3. Export GLB
print(f"Exporting to: {output_glb} ...")
bpy.ops.export_scene.gltf(
    filepath=output_glb,
    export_format='GLB',
    export_selected=False,
    export_cameras=False,
    export_lights=False,
    export_skins=True,
    export_all_influences=True,
    export_morph=True,
    export_materials=True,
    export_colors=True
)

if os.path.exists(output_glb):
    shutil.copy2(output_glb, output_glb_alias)
    size_mb = os.path.getsize(output_glb) / (1024 * 1024)
    print(f"SUCCESS! Exported GLB size: {size_mb:.2f} MB")
    print(f"Generated: {output_glb}")
    print(f"Generated: {output_glb_alias}")
else:
    print("FAILED: Output file not created.")
