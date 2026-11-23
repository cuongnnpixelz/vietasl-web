import os
from PIL import Image, ImageChops, ImageEnhance

tex_dir = r"c:\Users\ACER\Downloads\BLENDER_PADRAO_VLIBRAS\textures"
out_dir = r"C:\Users\ACER\.gemini\antigravity\scratch\vietasl-web\public\avatars\textures"
os.makedirs(out_dir, exist_ok=True)

base_path = os.path.join(tex_dir, "TxCorpo.png")
ao_path = os.path.join(tex_dir, "TxCorpo.tga.png")

base = Image.open(base_path).convert("RGB")
ao = Image.open(ao_path).convert("RGB")
ao_resized = ao.resize(base.size, Image.Resampling.LANCZOS)

# Enhance AO contrast slightly to make finger knuckles and nail lines pop crisply
enhancer = ImageEnhance.Contrast(ao_resized)
ao_enhanced = enhancer.enhance(1.15)

# Multiply base color with ambient occlusion / creases
detailed_corpo = ImageChops.multiply(base, ao_enhanced)

# Save to public textures
dst_corpo = os.path.join(out_dir, "TxCorpo.png")
detailed_corpo.save(dst_corpo, quality=100)
print(f"Saved detailed body texture to: {dst_corpo}")

# Also copy head texture to public textures
src_head = os.path.join(tex_dir, "cabecaAvatarCartoon.png")
dst_head = os.path.join(out_dir, "cabecaAvatarCartoon.png")
if os.path.exists(src_head):
    Image.open(src_head).save(dst_head)
    print(f"Saved head texture to: {dst_head}")
