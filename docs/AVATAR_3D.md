# TÀI LIỆU KỸ THUẬT 3D AVATAR VÀ ĐỒ HỌA (3D AVATAR & GRAPHICS SPECIFICATION)
**Dự án:** VietASL Web — Đồ họa 3D Nhân vật và Hệ xương ký hiệu

---

## 1. THIẾT KẾ NHÂN VẬT & PHONG CÁCH ĐỒ HOẠ

Nhân vật 3D chính trong VietASL Web sử dụng trực tiếp mô hình 3D gốc của nhân vật **Ícaro** (VLibras) được trích xuất và chuyển đổi từ tệp Blender chuẩn `padrao.blend` (`BLENDER_PADRAO_VLIBRAS.zip`) do Đại học Liên bang Paraíba (UFPB) phát triển:
- **Tệp nguồn:** `padrao.blend` (Blender 2.76, 83 bones, `corpoModifAlisson`, `cabecaModifAlisson`, `CABELO__MAPEADO`).
- **Mô hình xuất bản:** `public/avatars/icaro_vlibras.glb` (4.23 MB binary GLTF).
- **Textures PBR:**
  - `cabecaAvatarCartoon.png` (2048x2048): Texture khuôn mặt hoạt hình, mũi, tai và biểu cảm.
  - `TxCorpo.png` (2048x2048): Texture chi tiết trang phục áo sơ mi polo và cánh tay.
- **Tỷ lệ cơ thể:** Bán thân trên rõ ràng (đầu, cổ, ngực, vai, hai cánh tay, hai bàn tay và thắt lưng).
- **Màu nền khung 3D:** `#E5E5E5` — màu xám sáng chuẩn mực của VLibras, giúp nổi bật tối đa tương phản của các ngón tay và đường nét cánh tay.
- **Ánh sáng Studio (Studio 3-Point Lighting):**
  - Ambient Light: Ánh sáng môi trường 0.82x giữ cho các vùng khuất bóng không bị đen tuyền.
  - Directional Key Light: Chiếu từ góc trên phải (1.5, 3.2, 2.5) với bóng đổ mềm PCFSoftShadowMap tạo khối sâu.
  - Fill Light: Ánh sáng phụ màu xanh nhạt `#DBEAFE` từ góc trái tạo sắc thái công nghệ.
  - Back Light: Chiếu từ phía sau (0, 2.6, -2.2) tôn đường viền vai và tóc của nhân vật.

---

## 2. HỆ THỐNG XƯƠNG CHUẨN HOÁ (43-BONE HUMANOID RIG)

Toàn bộ hệ xương được đặt tên theo quy ước Canonical Humanoid Rig (tương thích trực tiếp với output của `@three-ws/sign-language`, Ready Player Me, Avaturn và Mixamo):

```
Hips (0, 0.98, 0)
 └── Spine (0, 0.12, 0)
      └── Spine1 (0, 0.10, 0)
           └── Spine2 (0, 0.13, 0) [Ngực / Chest]
                ├── Neck (0, 0.20, 0)
                │    └── Head (0, 0.12, 0)
                │         ├── LeftEye & RightEye (Mắt có chức năng nhắm/mở)
                │         ├── LeftEyebrow & RightEyebrow (Chân mày biểu cảm)
                │         └── Mouth (Khuôn miệng)
                │
                ├── LeftShoulder (0.18, 0.15, 0)
                │    └── LeftArm (0.10, -0.05, 0)
                │         └── LeftForeArm (0, -0.26, 0)
                │              └── LeftHand (0, -0.24, 0)
                │                   ├── LeftHandThumb1  -> Thumb2  -> Thumb3
                │                   ├── LeftHandIndex1  -> Index2  -> Index3
                │                   ├── LeftHandMiddle1 -> Middle2 -> Middle3
                │                   ├── LeftHandRing1   -> Ring2   -> Ring3
                │                   └── LeftHandPinky1  -> Pinky2  -> Pinky3
                │
                └── RightShoulder (-0.18, 0.15, 0)
                     └── RightArm (-0.10, -0.05, 0)
                          └── RightForeArm (0, -0.26, 0)
                               └── RightHand (0, -0.24, 0)
                                    ├── RightHandThumb1  -> Thumb2  -> Thumb3
                                    ├── RightHandIndex1  -> Index2  -> Index3
                                    ├── RightHandMiddle1 -> Middle2 -> Middle3
                                    ├── RightHandRing1   -> Ring2   -> Ring3
                                    └── RightHandPinky1  -> Pinky2  -> Pinky3
```

---

## 3. THIẾT LẬP CAMERA VÀ KHUNG HÌNH (CAMERA FRAMING)

Một trong những yêu cầu kỹ thuật khắt khe nhất của ký hiệu ASL là **hai bàn tay không bao giờ được phép bị khuất khỏi màn hình hoặc bị cắt mép**:
- **Field of View (FOV):** 40 độ — ống kính góc hẹp tiêu cự chuẩn giúp giảm thiểu biến dạng phối cảnh.
- **Vị trí Camera:** `(0, 1.40, 1.55)` — điểm đặt máy ngang tầm ngực và cằm.
- **Điểm nhìn (LookAt):** `(0, 1.25, 0)` — tâm nhìn bao quát toàn bộ vùng không gian ký hiệu trước ngực.
- **Tương tác xoay 3D (Orbit Controls):** Người dùng có thể kéo chuột hoặc vuốt chạm để xoay góc nhìn 360 độ quanh nhân vật, đồng thời điều chỉnh độ cao để quan sát thế tay ở mọi góc độ.

---

## 4. HOẠT ẢNH TỰ NHIÊN (IDLE BREATHING & BLINKING)

Khi không có câu dịch đang phát, avatar không bị "bất động như tượng sáp" mà có chu kỳ sống động tự nhiên:
1. **Hơi thở lồng ngực (Natural Breathing):**
   - Xương `Spine2` dao động điều hòa theo hàm sin với chu kỳ 3.5 giây, nâng nhẹ lồng ngực lên xuống 6mm.
2. **Chớp mắt sinh học (Eye Blinking):**
   - Cứ mỗi 3.5 đến 5 giây, hai mí mắt tự động khép nhanh lại trong khoảng 150ms rồi mở ra, tạo cảm giác một con người đang chú ý lắng nghe.

---

## 5. TỐI ƯU HÓA HIỆU NĂNG & TIÊU THỤ BỘ NHỚ

- **Frame Rate:** Duy trì 60 FPS mượt mà trên trình duyệt máy tính và ổn định trên 30-45 FPS trên điện thoại.
- **Shadow Map:** Giới hạn 1024×1024 với bộ lọc mềm PCFSoftShadowMap.
- **Dọn dẹp WebGL (Garbage Collection):** Khi unmount component, toàn bộ geometry, material và WebGLRenderer context đều được gọi `.dispose()` để chống rò rỉ bộ nhớ (memory leak).
