# TÀI LIỆU THAM CHIẾU GIAO DIỆN VLIBRAS (UI REFERENCE & DESIGN DECISIONS)
**Dự án:** VietASL Web — Tái tạo VLibras với Giao diện Tiếng Việt và Ngôn ngữ Ký hiệu ASL

---

## 1. NGUYÊN TẮC THIẾT KẾ & TƯƠNG ĐỒNG THỊ GIÁC

Yêu cầu cao nhất của dự án là **không tự ý thiết kế giao diện theo phong cách SaaS dashboard thông thường**, mà phải tái tạo trung thực nhất có thể ngôn ngữ thiết kế, tương tác và bố cục của **VLibras Mobile** và **VLibras Web**.

### Bảng đối chiếu Hệ thống màu sắc (Color Tokens)

| Token Thiết kế | Mã Hex | Vai trò trong VLibras | Ứng dụng trong VietASL Web |
|---|---|---|---|
| **Primary Brand Blue** | `#1447A6` | Màu thương hiệu chính, nút Play/Translate chính, màu chữ menu đang chọn | Nút tròn trung tâm 48px, text active menu, header icons, nút xác nhận chính |
| **Secondary Blue** | `#2365DE` | Màu xanh sáng nhấn hover/focus | Hiệu ứng hover, badge ASL, áo avatar nữ |
| **Active Soft Blue** | `#D6E5F9` | Màu nền của menu item đang active, thanh tiến độ rỗng | Nền mục menu đang chọn, nền chip danh mục, rãnh tiến độ (`h-1.5`) |
| **Progress Fill Blue** | `#003F86` | Màu vạch tiến độ hoạt ảnh đang chạy | Thanh tiến độ hoạt ảnh 3D chạy từ 0% đến 100% |
| **Player Canvas Gray** | `#E5E5E5` | Màu nền xám sáng của khung hiển thị Unity 3D | Màu nền chuẩn của Three.js WebGL Scene (`#E5E5E5`) |
| **Dark Neutral (Heading)** | `#373F41` | Màu tiêu đề, logo text | Tiêu đề trang, tên từ vựng, text chính |
| **Body Neutral** | `#4B4B4B` | Màu chữ nội dung, biểu tượng thanh công cụ khi idle | Text mô tả, các nút chức năng phụ |
| **Muted Neutral** | `#939293` | Màu chữ phụ, nhãn nhóm menu (DỊCH VỤ, TÙY CHỈNH) | Tiêu đề phân mục, ngày tháng lịch sử |
| **Floating Dark Pill** | `rgba(27, 27, 27, 0.75)` | Nút tròn nổi trên nền 3D (Đổi avatar, Đóng/Dừng, Thumbs, Share) | Nút đổi avatar góc trên phải, nút Dừng (X), nút Đánh giá và Chia sẻ |

---

## 2. PHÂN TÍCH CHI TIẾT CÁC MÀN HÌNH

### 2.1. Màn hình chính (Home — Trình phát 3D Avatar)
- **Tỷ lệ khung hình:** Khung 3D chiếm toàn bộ không gian trung tâm (`flex: 1`), nền màu `#E5E5E5`. Avatar hiển thị chính diện từ thắt lưng trở lên, đảm bảo hai bàn tay luôn nằm trong vùng nhìn thấy được khi ký hiệu ở mọi độ cao (từ đỉnh đầu, trán, cằm, ngực đến thắt lưng).
- **Nút điều khiển nổi (Floating Controls):**
  - *Khi ở trạng thái nghỉ (Idle):* Góc trên bên phải có nút tròn nền đen mờ (`#1B1B1B/85`) hiển thị biểu tượng Avatar để chuyển đổi nhanh giữa các nhân vật (Minh, Lan, ASL Bot).
  - *Khi đang phát hoặc đã phát xong:* Nút góc trên đổi thành nút "X" màu trắng trên nền đen mờ để dừng ngay lập tức và đưa avatar về tư thế nghỉ.
  - *Khi hoàn thành (Finished):* Góc dưới bên phải nổi lên 2 nút tròn: Đánh giá (ngón tay cái / thumbs up) và Chia sẻ (share).
- **Thanh công cụ phát bên dưới (Bottom Action Bar):**
  - Phía trên cùng thanh bar là đường tiến độ siêu mỏng (`h-1.5`) với nền `#D6E5F9` và thanh chạy màu `#003F86`.
  - Chiều cao thanh điều khiển 78px, nền trắng có viền bóng đổ nhẹ.
  - *Trạng thái Idle:* Nút Từ điển (trái) — Nút Tròn Xanh 56px mở Trình dịch (giữa) — Nút Lịch sử (phải).
  - *Trạng thái Playing:* Nút chọn Tốc độ X1/X2/X3 (trái) — Nút Tạm dừng/Tiếp tục tròn xanh (giữa) — Nút Bật/Tắt phụ đề (phải).
  - *Trạng thái Finished:* Nút chọn Tốc độ (trái) — Nút Phát lại (Replay) tròn xanh (giữa) — Nút Bật/Tắt phụ đề (phải).

### 2.2. Menu trượt cạnh trái (DrawerMenu)
- Trượt mượt từ mép trái màn hình với hiệu ứng làm tối nền nhẹ (`bg-black/50`).
- **Phần đầu:** Logo VietASL, tên ứng dụng "VietASL" font đậm (`#373F41`), phụ đề "Ngôn ngữ ký hiệu 3D".
- **Nhóm 1 — DỊCH VỤ:**
  - `Trình dịch`: Biểu tượng dịch thuật, nhãn badge xanh "ASL".
  - `Từ điển ký hiệu`: Biểu tượng cuốn sách mở.
  - `Lịch sử`: Biểu tượng đồng hồ lịch sử.
- **Đường phân cách mảnh (Divider):** 1px màu xám mờ.
- **Nhóm 2 — TÙY CHỈNH:**
  - `Cá nhân hóa`: Biểu tượng bảng màu palette (đổi màu quần áo, tóc, da).
  - `Cài đặt`: Biểu tượng bánh răng thiết lập.
- **Nhóm 3 — THÔNG TIN:**
  - `Hướng dẫn`: Biểu tượng trợ giúp và các bước sử dụng.
  - `Giới thiệu dự án`: Thông tin bản quyền, giấy phép mở.
- **Mục đang chọn (Active Item):** Nền xanh nhạt `#D6E5F9`, chữ và icon màu xanh đậm `#1447A6`, bo góc 4px.

### 2.3. Màn hình Trình dịch (Translator)
- Thanh tiêu đề có nút mũi tên quay lại màn hình Home.
- Hộp nhập văn bản lớn với placeholder rõ ràng, hỗ trợ nhập câu tiếng Anh.
- Nút micro ghi âm giọng nói tích hợp Web Speech API, có trạng thái nhấp nháy đỏ khi đang nghe.
- Dải gợi ý câu mẫu: "Hello", "Thank you", "Happy to meet you", "Please help",...
- Xem trước chuỗi ASL Gloss với các badge màu xanh (ký hiệu đã kiểm chứng) hoặc cam (đánh vần ngón tay).
- Nút bấm chính "Bắt đầu dịch sang ASL" màu xanh `#1447A6` rộng toàn màn hình ở chân trang.

### 2.4. Màn hình Từ điển (Dictionary)
- Thanh tìm kiếm tức thì hỗ trợ tìm theo từ tiếng Anh, giải nghĩa tiếng Việt hoặc mã ASL Gloss.
- Bộ lọc danh mục dạng chip tròn: Tất cả, Chào hỏi, Giao tiếp, Cảm xúc, Hành động, Đại từ.
- Thẻ chuyển đổi: Danh mục từ vựng ASL vs. Bảng chữ cái ngón tay (Fingerspelling A-Z).
- Mỗi mục từ hiển thị chữ cái đầu, từ vựng, nghĩa tiếng Việt, ASL Gloss và nút Play nhanh.
- Nhấp vào từ mở Modal chi tiết kèm mô tả động tác tay giải phẫu chi tiết.

### 2.5. Màn hình Lịch sử (History)
- Liệt kê các bản dịch theo thứ tự thời gian gần nhất.
- Hiển thị ngày giờ, câu gốc tiếng Anh, chuỗi ASL Gloss.
- Nhấp vào một mục sẽ phát lại ngay lập tức trên avatar 3D.
- Hỗ trợ xóa từng mục hoặc xóa toàn bộ lịch sử.

---

## 3. TƯƠNG THÍCH ĐIỆN THOẠI & MOBILE WEB (PWA)

1. **Safe Area:** Hỗ trợ `viewport-fit=cover` cho iPhone (tai thỏ / Dynamic Island) và các dòng điện thoại Android hiện đại.
2. **Không cuộn ngang (Zero Horizontal Scroll):** Tất cả thành phần đều căn chỉnh trong `max-w-full overflow-hidden`.
3. **Thao tác chạm tối ưu (Touch-Friendly):** Kích thước vùng bấm tối thiểu 44×44px cho tất cả các nút bấm trên màn hình cảm ứng.
4. **Hỗ trợ xoay ngang/dọc:** Avatar Canvas tự động tính toán lại tỷ lệ khung nhìn (Aspect Ratio) và ma trận chiếu của Camera khi xoay thiết bị.
