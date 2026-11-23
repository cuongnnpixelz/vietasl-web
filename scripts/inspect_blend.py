import bpy

print("=== ALL MATERIALS IN BLEND FILE ===")
for mat in bpy.data.materials:
    print(f"\n--- Material: {mat.name} ---")
    print(f"  use_nodes: {mat.use_nodes}")
    if mat.use_nodes and mat.node_tree:
        for node in mat.node_tree.nodes:
            print(f"  Node: {node.name} ({node.type})")
            if node.type == 'TEX_IMAGE' and node.image:
                print(f"    Image: {node.image.name}, filepath: {node.image.filepath}")
            if hasattr(node, 'inputs'):
                for inp in node.inputs:
                    if inp.is_linked:
                        for l in inp.links:
                            print(f"    Input '{inp.name}' linked from {l.from_node.name} -> {l.from_socket.name}")
                    elif hasattr(inp, 'default_value'):
                        print(f"    Input '{inp.name}' default_value = {inp.default_value}")
    else:
        # Check diffuse
        if hasattr(mat, 'diffuse_color'):
            print(f"  diffuse_color: {list(mat.diffuse_color)}")
        for i, ts in enumerate(getattr(mat, 'texture_slots', [])):
            if ts and ts.texture:
                print(f"  TextureSlot {i}: {ts.texture.name} ({ts.texture.type})")
                if hasattr(ts.texture, 'image') and ts.texture.image:
                    print(f"    image: {ts.texture.image.name}, filepath: {ts.texture.image.filepath}")

print("\n=== MESH OBJECTS & THEIR MATERIAL SLOTS & UVs ===")
for obj in bpy.data.objects:
    if obj.type == 'MESH':
        print(f"\nObject: {obj.name}")
        uvs = [uv.name for uv in obj.data.uv_layers]
        print(f"  UV layers: {uvs}")
        for i, slot in enumerate(obj.material_slots):
            mat_name = slot.material.name if slot.material else 'None'
            # Count polygons using this slot
            count = sum(1 for p in obj.data.polygons if p.material_index == i)
            print(f"  Slot {i}: {mat_name} (used by {count} faces)")
