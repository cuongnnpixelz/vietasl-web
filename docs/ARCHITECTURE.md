# TÀI LIỆU KIẾN TRÚC HỆ THỐNG (SYSTEM ARCHITECTURE)
**Dự án:** VietASL Web — Trình dịch và Mô phỏng Ngôn ngữ Ký hiệu ASL 3D  
**Nền tảng:** Web App / PWA (Hỗ trợ PC, Tablet, Android, iOS Safari, Chrome, Edge)

---

## 1. TỔNG QUAN KIẾN TRÚC

VietASL Web được thiết kế theo mô hình **Client-Side Progressive Web App (PWA)** hiện đại, không phụ thuộc máy chủ backend trung gian cho các tác vụ dịch và render 3D cốt lõi. Mô hình này mang lại 4 lợi thế vượt trội:
1. **Tốc độ phản hồi tức thì (Zero Latency):** Phân tích từ vựng, tính toán Forward Kinematics và sinh hoạt ảnh chuyển động trong vài mili-giây ngay trên thiết bị người dùng.
2. **Bảo vệ quyền riêng tư tuyệt đối (Privacy by Design):** Nội dung văn bản, giọng nói qua micro và lịch sử dịch không bị gửi về bất kỳ máy chủ bên ngoài nào.
3. **Khả năng hoạt động ngoại tuyến (Offline-First):** PWA Service Worker cache toàn bộ giao diện và engine, IndexedDB lưu trữ dữ liệu cục bộ.
4. **Tính tương thích đa nền tảng:** Chạy mượt mà trên Windows PC, macOS, máy tính bảng iPad/Android và điện thoại thông minh.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              VIETASL WEB UI                                 │
│  (React 19 + TypeScript + Tailwind CSS v4 + Zustand + Lucide Icons)        │
│                                                                             │
│  ┌───────────────┐ ┌────────────────┐ ┌───────────────┐ ┌────────────────┐  │
│  │   Home/3D     │ │   Translator   │ │  Dictionary   │ │    History     │  │
│  │   Player      │ │  (Text/Voice)  │ │   & Alphabet  │ │  (IndexedDB)   │  │
│  └───────┬───────┘ └────────┬───────┘ └───────┬───────┘ └───────┬────────┘  │
│          │                  │                 │                 │           │
│          ▼                  ▼                 ▼                 ▼           │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                     GLOBAL STATE (Zustand Stores)                     │  │
│  │     playerStore   •   translationStore   •   appStore   •   settings  │  │
│  └──────────────────────────────────┬────────────────────────────────────┘  │
└─────────────────────────────────────┼───────────────────────────────────────┘
                                      │
            ┌─────────────────────────┴─────────────────────────┐
            ▼                                                   ▼
┌───────────────────────────────┐               ┌───────────────────────────────┐
│       ASL TRANSLATION         │               │          THREE.JS 3D          │
│       & GLOSS ENGINE          │               │        AVATAR ENGINE          │
│                               │               │                               │
│ • Text Normalization          │               │ • WebGL Studio Scene          │
│ • Lexicon Sign Lookup         │               │ • 43-Bone Humanoid Rig        │
│ • Fingerspelling Engine       │               │ • Articulated Finger Joints   │
│ • Facial Marker Mapping       │──────────────>│ • AnimationMixer Controller   │
│ • Three.js AnimationClip Gen  │  Clip Tracks  │ • Idle Breathing & Blinking   │
│   (@three-ws/sign-language)   │               │ • Orbit & Touch Camera        │
└───────────────────────────────┘               └───────────────────────────────┘
                                                                │
                                                                ▼
                                                ┌───────────────────────────────┐
                                                │        WEBGL CANVAS           │
                                                │   60 FPS Hardware Render      │
                                                └───────────────────────────────┘
```

---

## 2. CÁC PHÂN HỆ CHÍNH

### 2.1. Phân hệ Giao diện người dùng (Presentation Layer)
- **Tái tạo thiết kế VLibras:** Toàn bộ bảng màu, tỷ lệ khung hình, DrawerMenu trượt từ cạnh trái, thanh điều khiển nổi và thanh tiến độ được thiết kế chuẩn xác theo nguyên mẫu VLibras Mobile và VLibras Web.
- **Ngôn ngữ hoàn toàn bằng Tiếng Việt (`vi-VN`):** Các nhóm chức năng (DỊCH VỤ, TÙY CHỈNH, THÔNG TIN), tiêu đề, nút bấm, hướng dẫn và thông báo lỗi 100% bằng tiếng Việt chuẩn ngữ nghĩa.
- **Thiết kế thích ứng (Responsive Design):** Xử lý an toàn viewport, safe area trên iOS (`viewport-fit=cover`), và thanh bàn phím ảo trên điện thoại.

### 2.2. Phân hệ Xử lý Ngôn ngữ Ký hiệu ASL (ASL Translation Engine)
- **Chuẩn hoá văn bản đầu vào (Text Normalization):** Loại bỏ ký tự đặc biệt, chuẩn hoá dấu câu và khoảng trắng.
- **Kế hoạch biểu diễn (Sign Planning):** Phân đoạn câu thành các từ có trong từ điển ASL (Lexicon signs) và các từ cần đánh vần ngón tay (Fingerspelling).
- **Trình biên dịch hoạt ảnh (AnimationClip Compiler):** Tích hợp engine `@three-ws/sign-language` để tạo trực tiếp các `AnimationClip` Three.js chứa các track quay quaternion cho toàn bộ hệ xương cánh tay, bàn tay, ngón tay và các facial marker biểu cảm khuôn mặt.

### 2.3. Phân hệ Đồ hoạ 3D Avatar (3D Avatar Engine)
- **Khung hiển thị WebGL:** Sử dụng Three.js với hệ thống ánh sáng studio (Key light, Fill light, Back light, Shadow ground).
- **Hệ xương Humanoid Rig 43 Bones:**
  - Cột sống & Đầu: `Hips`, `Spine`, `Spine1`, `Spine2`, `Neck`, `Head`.
  - Cánh tay: `LeftShoulder`, `LeftArm`, `LeftForeArm`, `LeftHand` (và đối xứng `Right`).
  - Khớp ngón tay: 5 ngón x 3 khớp = 15 xương mỗi bàn tay (`Thumb1..3`, `Index1..3`, `Middle1..3`, `Ring1..3`, `Pinky1..3`).
- **Hoạt ảnh tự nhiên nhàn rỗi (Idle Animation):** Chu kỳ thở nhẹ nhàng của lồng ngực kết hợp chớp mắt tự nhiên 3-5 giây/lần.
- **Trình điều khiển AnimationMixer (`RigController`):** Hỗ trợ phát, tạm dừng, tiếp tục, phát lại, điều chỉnh tốc độ X1/X2/X3 và chuyển mượt về tư thế nghỉ.

### 2.4. Phân hệ Dịch vụ & Lưu trữ (Services & Storage Layer)
- **Web Speech API:** Tích hợp nhận diện giọng nói đa ngôn ngữ client-side qua microphone.
- **IndexedDB (`idb`):** Lưu trữ lịch sử các câu đã dịch, cấu hình màu sắc nhân vật và thiết lập cá nhân hóa của người dùng.
- **PWA Service Worker:** Cache tài nguyên tĩnh để hỗ trợ khởi động ứng dụng ngoại tuyến.

---

## 3. HỢP ĐỒNG DỮ LIỆU (DATA CONTRACTS)

### 3.1. Phân đoạn ký hiệu (`SignSegment`)
```typescript
export interface SignSegment {
  rawWord: string;                    // Từ thô ban đầu
  normalized: string;                 // Từ đã chuẩn hóa in hoa
  gloss: string;                      // Nhãn ký hiệu ASL (hoặc fs-WORD)
  status: 'verified' | 'fingerspelled' | 'unsupported';
  descriptionVi?: string;             // Giải nghĩa động tác bằng tiếng Việt
  duration?: number;                  // Thời lượng hiển thị ước tính (giây)
}
```

### 3.2. Kết quả biên dịch ASL (`ASLCompilationResult`)
```typescript
export interface ASLCompilationResult {
  clip: THREE.AnimationClip;          // Clip hoạt ảnh 3D Three.js
  signedWords: string[];              // Danh sách từ ký hiệu từ vựng
  spelledWords: string[];             // Danh sách từ đánh vần ngón tay
  segments: SignSegment[];            // Danh sách phân đoạn chi tiết
  duration: number;                   // Tổng thời lượng hoạt ảnh
  totalTracks: number;                // Số lượng track xương được điều khiển
}
```

### 3.3. Bản ghi lịch sử dịch (`TranslationHistoryItem`)
```typescript
export interface TranslationHistoryItem {
  id: string;                         // Khóa định danh duy nhất
  timestamp: number;                  // Thời điểm dịch (epoch ms)
  dateString: string;                 // Chuỗi ngày giờ hiển thị tiếng Việt
  inputText: string;                  // Nội dung văn bản gốc
  inputLang: 'en' | 'vi';             // Ngôn ngữ đầu vào
  gloss: string;                      // Chuỗi ASL Gloss
  signedCount: number;                // Số từ ký hiệu
  spelledCount: number;               // Số từ đánh vần
}
```
