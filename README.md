# VietASL Web — Trình Dịch & Mô Phỏng Ngôn Ngữ Ký Hiệu ASL 3D

> **Dự án:** Tái tạo ứng dụng **VLibras** với giao diện hoàn toàn bằng **Tiếng Việt (`vi-VN`)** và biểu diễn **Ngôn ngữ Ký hiệu Mỹ (ASL)** với nhân vật 3D tương tác thời gian thực.

---

## Giới thiệu tổng quan

**VietASL Web** là ứng dụng Web/PWA được nghiên cứu và phát triển dựa trên kiến trúc, bố cục và trải nghiệm của bộ giải pháp trợ năng **VLibras** (do Bộ Kinh tế và Chính phủ Brazil bảo trợ). Ứng dụng đáp ứng trọn vẹn 2 thay đổi cốt lõi:
1. **Ngôn ngữ giao diện (UI):** 100% bằng tiếng Việt với các thuật ngữ chuẩn xác, dễ tiếp cận cho người dùng Việt Nam.
2. **Hệ thống ký hiệu:** Sử dụng hoàn toàn Ngôn ngữ Ký hiệu Mỹ (ASL) thực tế, thay thế triệt để cho hệ thống LIBRAS của Brazil.

Ứng dụng chạy 100% trong trình duyệt (Client-Side), không yêu cầu phần cứng bên ngoài, đảm bảo quyền riêng tư và tốc độ xử lý tức thì (zero latency).

---

## Các tính năng chính

- **Trình phát 3D Avatar (Home):**
  - Nhân vật 3D dựng bằng Three.js với hệ xương 43 bones chuẩn mực, điều khiển mượt mà 15 khớp xương ngón tay trên mỗi bàn tay.
  - Tương tác xoay 360 độ và thu phóng góc nhìn quanh nhân vật.
  - Chu kỳ thở lồng ngực tự nhiên (Idle Breathing) và chớp mắt sinh học (Eye Blinking).
  - Tùy chọn chuyển đổi nhanh giữa 3 nhân vật: Minh (Nam), Lan (Nữ) và ASL Bot.
- **Thanh điều khiển chuẩn VLibras:**
  - Vạch tiến độ mỏng 6px (`#D6E5F9` / `#003F86`).
  - Nút chuyển trạng thái động: Nhập bản dịch (Idle), Tạm dừng/Tiếp tục (Playing), Phát lại (Finished).
  - Tùy chỉnh tốc độ ký hiệu đa mức: X1 (1.0x), X2 (2.0x), X3 (3.0x), 0.5x.
  - Bật/Tắt phụ đề văn bản và nhãn ASL Gloss.
- **Trình dịch (Translator):**
  - Nhập văn bản tiếng Anh hoặc bấm biểu tượng micro để nói qua Web Speech API.
  - Gợi ý câu mẫu phổ biến ("Hello", "Thank you", "Happy to meet you", "Please help",...).
  - Xem trước chuỗi ASL Gloss và nhãn kiểm chứng trước khi phát.
- **Từ điển ký hiệu (Dictionary):**
  - Tra cứu hàng chục ký hiệu ASL thông dụng kèm giải nghĩa tiếng Việt chi tiết.
  - Bộ lọc danh mục: Chào hỏi, Giao tiếp, Cảm xúc, Hành động, Đại từ.
  - Bảng chữ cái ngón tay Fingerspelling A-Z: Nhấp vào từng chữ cái để avatar tạo hình ngón tay tương ứng.
  - Modal mô tả chi tiết thế tay, điểm neo cơ thể và hướng di chuyển.
- **Lịch sử dịch (History):**
  - Lưu trữ tự động trên thiết bị bằng IndexedDB.
  - Nhấp vào một mục để phát lại tức thì trên avatar 3D.
  - Quản lý xóa từng mục hoặc xóa toàn bộ.
- **Cá nhân hóa (Personalization):**
  - Chọn nhân vật và tùy chỉnh bảng màu: Màu áo, màu quần, màu tóc, tông da.
- **Cài đặt & Hướng dẫn (Settings & Tutorial):**
  - Tùy chỉnh ngôn ngữ đầu vào, ngôn ngữ micro, tùy chọn hiển thị.
  - Hướng dẫn tương tác 4 bước cho người mới bắt đầu.
- **PWA (Progressive Web App):**
  - Web App Manifest và Service Worker hỗ trợ cài đặt vào màn hình chính điện thoại và chạy offline shell.

---

## Hướng dẫn cài đặt và khởi chạy

### Yêu cầu môi trường
- **Node.js:** Phiên bản `>= 18.0.0` (Khuyến nghị Node 20+)
- **Trình duyệt:** Google Chrome, Microsoft Edge, Safari, Mozilla Firefox

### 1. Cài đặt các gói phụ thuộc
```bash
npm install
```

### 2. Khởi chạy môi trường phát triển (Dev Server)
```bash
npm run dev
```
Truy cập ứng dụng tại: `http://127.0.0.1:3000/` hoặc `http://localhost:3000/`

### 3. Chạy kiểm thử tự động (Unit Tests)
```bash
npm test
```

### 4. Đóng gói cho môi trường Production (Build)
```bash
npm run build
```
Các tệp đã tối ưu hóa và nén sẽ được xuất ra thư mục `dist/`.

---

## Cấu trúc thư mục dự án

```text
vietasl-web/
├── public/
│   ├── icons/             # Biểu tượng vector logo SVG
│   ├── manifest.webmanifest # Cấu hình PWA
│   └── sw.js              # Service Worker offline cache
├── src/
│   ├── asl/               # Động cơ ASL Lexicon, Compiler & Fingerspelling
│   │   ├── compiler.ts
│   │   ├── dictionary.ts
│   │   └── fingerspelling.ts
│   ├── three/             # Động cơ đồ họa 3D Avatar Three.js WebGL
│   │   ├── AvatarCanvas.tsx
│   │   ├── AvatarModel.ts
│   │   └── RigController.ts
│   ├── components/        # Các thành phần giao diện người dùng
│   │   ├── common/        # Header, DrawerMenu
│   │   ├── player/        # PlayerControls, FloatingControls, SubtitleOverlay
│   │   └── modals/        # EvaluationModal, WordDetailModal, ShareModal
│   ├── pages/             # Các màn hình chính
│   │   ├── Home.tsx
│   │   ├── Translator.tsx
│   │   ├── Dictionary.tsx
│   │   ├── History.tsx
│   │   ├── Customization.tsx
│   │   ├── Settings.tsx
│   │   └── Tutorial.tsx
│   ├── services/          # IndexedDB & Web Speech API
│   ├── stores/            # Quản lý trạng thái toàn cục bằng Zustand
│   ├── types/             # Định nghĩa kiểu dữ liệu TypeScript
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tests/                 # Bộ kiểm thử tự động Vitest
├── docs/                  # Tài liệu kiến trúc và nghiên cứu chi tiết
│   ├── REPOSITORY_RESEARCH.md
│   ├── ARCHITECTURE.md
│   ├── UI_REFERENCE.md
│   ├── ASL_ENGINE.md
│   ├── AVATAR_3D.md
│   ├── DATA_LICENSES.md
│   ├── IMPLEMENTATION_STATUS.md
│   ├── TEST_REPORT.md
│   └── ROADMAP.md
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Tài liệu chi tiết trong thư mục `docs/`
- [Báo cáo nghiên cứu mã nguồn](docs/REPOSITORY_RESEARCH.md)
- [Kiến trúc hệ thống](docs/ARCHITECTURE.md)
- [Tham chiếu giao diện VLibras](docs/UI_REFERENCE.md)
- [Cơ chế xử lý ASL & Hoạt ảnh](docs/ASL_ENGINE.md)
- [Thông số kỹ thuật 3D Avatar & Rigging](docs/AVATAR_3D.md)
- [Giấy phép nguồn mở & Bản quyền](docs/DATA_LICENSES.md)
- [Trạng thái triển khai chức năng](docs/IMPLEMENTATION_STATUS.md)
- [Báo cáo kết quả kiểm thử](docs/TEST_REPORT.md)
- [Lộ trình phát triển](docs/ROADMAP.md)
