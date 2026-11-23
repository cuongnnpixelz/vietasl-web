# BÁO CÁO NGHIÊN CỨU MÃ NGUỒN CÁC REPOSITORY (REPOSITORY RESEARCH)
**Dự án:** VietASL Web — Tái tạo VLibras với Giao diện Tiếng Việt và Ngôn ngữ Ký hiệu ASL  
**Ngày thực hiện:** 21/11/2026  
**Thực hiện bởi:** AI Software Engineering Agent (Antigravity)

---

## 1. TỔNG QUAN NGHIÊN CỨU

Theo chỉ thị của dự án, 7 kho lưu trữ mã nguồn đã được clone cục bộ vào thư mục tham chiếu `reference-repos` để kiểm tra chi tiết cấu trúc thư mục, tệp cấu hình, dependencies, luồng dữ liệu, cách điều khiển 3D avatar và các giấy phép bản quyền.

Danh sách 7 kho lưu trữ:
1. `spbgovbr-vlibras/vlibras-mobile-cross-platform`
2. `spbgovbr-vlibras/vlibras-web-browsers`
3. `spbgovbr-vlibras/vlibras-player-webjs`
4. `spbgovbr-vlibras/vlibras-translator-api`
5. `spbgovbr-vlibras/vlibras-translator-text-core`
6. `nirholas/sign-language` (`@three-ws/sign-language`)
7. `SonicTheHedghoge/signbridge`

---

## 2. BẢNG PHÂN TÍCH SO SÁNH CHI TIẾT

| Repository | Chức năng | Công nghệ | Giấy phép | Có thể tái sử dụng không? | Thành phần tái sử dụng | Thành phần cần thay thế | Lý do lựa chọn |
|---|---|---|---|---|---|---|---|
| **1. VLibras Mobile** (`vlibras-mobile-cross-platform`) | Ứng dụng di động chính thức của chính phủ Brazil dịch Bồ Đào Nha sang LIBRAS | React 17, Ionic 5, Redux, Capacitor, react-unity-webgl | GPL-3.0 | **Tái sử dụng một phần (Thiết kế UI/UX & Luồng điều khiển)** | - Cấu trúc Navigation & DrawerMenu (Header, Services, Customization)<br>- Layout màn hình Player (khung 3D nền `#E5E5E5`, bottom bar, floating controls)<br>- Layout màn hình Translator, Dictionary, Historic, Settings<br>- Hệ màu chuẩn: `#1447A6`, `#2365DE`, `#D6E5F9`, `#373F41`, `#939293`<br>- Logic chuyển đổi Avatar, chỉnh tốc độ (X1, X2, X3), phụ đề, thanh tiến độ | - Thay toàn bộ ngôn ngữ tiếng Bồ Đào Nha sang tiếng Việt<br>- Thay toàn bộ Ionic/Capacitor/Redux cồng kềnh bằng React 19 + Tailwind CSS + Zustand<br>- Thay `react-unity-webgl` bằng Three.js WebGL Engine | Giao diện mobile của VLibras cực kỳ tiện dụng, thân thiện và đạt chuẩn accessibility. Tái tạo chính xác giao diện này mang lại trải nghiệm giống VLibras nhất. |
| **2. VLibras Web** (`vlibras-web-browsers`) | Tiện ích (Widget/Extension) dịch ngôn ngữ ký hiệu nhúng trên trình duyệt web | Preact 11, Vite, Tailwind CSS v4, Zustand, DaisyUI | LGPL-3.0-or-later | **Tái sử dụng kiến trúc Web** | - Kiến trúc Vite + Tailwind CSS + Zustand hiện đại<br>- Tinh thần tổ chức component tinh gọn<br>- Quản lý trạng thái bằng Zustand | - Đổi từ Widget popup nhúng sang ứng dụng Web/PWA đầy đủ<br>- Thay thế backend gọi API LIBRAS sang ASL Engine nội bộ | Cung cấp chuẩn kỹ thuật hiện đại (Vite + Tailwind + Zustand) thay cho các thư viện cũ. |
| **3. VLibras Player** (`vlibras-player-webjs`) | Trình phát hoạt ảnh 3D cho web | JavaScript, WebGL (Unity WebGL export), EventEmitter | LGPL-3.0-or-later | **KHÔNG tái sử dụng trực tiếp engine** | - Luồng state machine của player: `idle` -> `preparing` -> `playing` -> `finished`<br>- Cơ chế Play, Pause, Stop, Replay, SetSpeed, SetSubtitle, SetPersonalization | - Thay thế toàn bộ Unity WebGL build và `.unity3d` AssetBundles tải từ `dicionario2-dth.vlibras.gov.br`<br>- Thay bằng Three.js animation engine | Unity WebGL của VLibras tải các tệp nhị phân độc quyền từ máy chủ chính phủ Brazil chỉ chứa ký hiệu LIBRAS. Không tương thích với ASL và không thể chỉnh sửa xương ngón tay thủ công trên web. |
| **4. VLibras Translator API** (`vlibras-translator-api`) | API Gateway điều phối dịch thuật | Node.js, Express, Docker, Kubernetes, RabbitMQ | LGPL-3.0-or-later | **Tham khảo kiến trúc** | - Mô hình phân tách yêu cầu dịch (Text -> Tokens -> Gloss -> Player) | - Thay thế API dịch tiếng Bồ Đào Nha bằng client-side ASL Sentence/Utterance Planner | VLibras Translator API phụ thuộc vào RabbitMQ và hạ tầng máy chủ Brazil, chỉ xử lý tiếng Bồ Đào Nha. Với MVP của VietASL, xử lý trực tiếp trên client bảo đảm tốc độ tức thì, hoạt động offline và không tốn chi phí server. |
| **5. VLibras Translator Text Core** (`vlibras-translator-text-core`) | Pipeline NLP chuyển đổi ngữ pháp văn bản sang ký hiệu | Python, spaCy, NLTK | GPL-3.0 | **Tham khảo quy trình** | - Luồng chuẩn hoá: Text Normalization -> Tokenization -> POS Tagging -> Gloss Generation | - Thay bộ quy tắc ngữ pháp Bồ Đào Nha - LIBRAS bằng ASL Gloss Mapping và Fingerspelling Engine | LIBRAS và ASL có ngữ pháp và từ điển hoàn toàn khác nhau. |
| **6. ASL Sign Engine** (`nirholas/sign-language` - `@three-ws/sign-language`) | Thư viện dịch văn bản sang hoạt ảnh ASL 3D | TypeScript/JavaScript, Forward Kinematics, Two-Bone Arm IK, Canonical Skeleton | Apache-2.0 | **TÁI SỬ DỤNG TRỌNG TÂM (RẤT CAO)** | - Hàm `compileUtterance()`, `signLookup()`, `signGloss()`<br>- Lexicon ASL phong phú (`HELLO`, `THANKYOU`, `PLEASE`, `YES`, `NO`, `HELP`, `WATER`, `NAME`, `FRIEND`,...)<br>- Hệ thống fingerspelling A-Z, 0-9 chuẩn xác đến từng khớp ngón tay<br>- Facial expression markers (cặp chân mày, mắt, miệng)<br>- Xuất chuẩn Three.js `AnimationClip` không phụ thuộc runtime | - Tích hợp trực tiếp vào Three.js `AnimationMixer`<br>- Mở rộng thêm từ điển và giải nghĩa tiếng Việt | Thư viện chuẩn mực, giấy phép Apache-2.0 tự do thương mại và nghiên cứu, sinh chuyển động ASL thực tế với đầy đủ giải phẫu tay và mặt, hoạt động 100% trong trình duyệt không cần backend. |
| **7. ASL Visualization Reference** (`SonicTheHedghoge/signbridge`) | Dự án tham khảo hiển thị ASL bằng Three.js | HTML5, Three.js, GSAP, Web Speech API | MIT | **Tái sử dụng kỹ thuật Web Speech & Three.js** | - Cách tích hợp Web Speech API (nhận diện giọng nói đa ngôn ngữ, mic button)<br>- Cách xử lý bone rotation và chuyển động mềm mại trong Three.js | - Thay procedural geometry cơ bản bằng mô hình 3D avatar có skinned mesh và rig đầy đủ | Minh chứng xuất sắc cho việc nhận diện giọng nói và render Three.js hoàn toàn client-side. |

---

## 3. KẾT LUẬN VÀ QUYẾT ĐỊNH KIẾN TRÚC CHO VIETASL WEB

1. **Frontend Architecture:**
   - Xây dựng Web App / PWA bằng **React 19 + TypeScript + Vite + Tailwind CSS v4**.
   - Tái tạo 100% bố cục, màu sắc, font chữ và phong cách của **VLibras Mobile**:
     - Thanh điều hướng trên cùng với nút mở Menu trượt từ trái (`DrawerMenu`).
     - Khung 3D avatar chiếm phần lớn diện tích với màu nền xám sáng `#E5E5E5`.
     - Thanh điều khiển nổi: Nút đổi nhân vật, nút đóng/dừng.
     - Thanh công cụ phát bên dưới với thanh tiến độ xanh dương (`#003F86`), nút Trình dịch / Tạm dừng / Phát lại, nút Tốc độ (X1, X2, X3) và Bật/Tắt phụ đề.
     - Các trang đầy đủ: `Trình dịch` (Translator), `Từ điển` (Dictionary), `Lịch sử` (History), `Cá nhân hóa` (Personalization), `Cài đặt` (Settings).
   - Toàn bộ nhãn, nội dung trợ giúp và thông báo hiển thị bằng **Tiếng Việt (`vi-VN`)**.

2. **3D Avatar & ASL Engine:**
   - Sử dụng **Three.js** với hệ xương hình người (Humanoid Rig) chuẩn 43 bones: `Hips`, `Spine`, `Chest`, `Neck`, `Head`, `LeftShoulder`/`RightShoulder`, `LeftArm`/`RightArm`, `LeftForeArm`/`RightForeArm`, `LeftHand`/`RightHand`, cùng 15 xương đốt ngón tay cho mỗi bàn tay (`Thumb1..3`, `Index1..3`, `Middle1..3`, `Ring1..3`, `Pinky1..3`).
   - Tích hợp `@three-ws/sign-language` để biên dịch trực tiếp văn bản đầu vào thành `AnimationClip` Three.js thật, điều khiển chuyển động ngón tay và cánh tay tự nhiên.
   - Khi từ có trong từ điển ASL: thực hiện ký hiệu cử chỉ chuẩn (Lexicon sign).
   - Khi từ chưa có trong từ điển: tự động chuyển sang cơ chế đánh vần ngón tay (Fingerspelling) chính xác từng chữ cái A-Z và số 0-9.
   - Thêm trạng thái nhàn rỗi (Idle animation: hô hấp thở nhẹ và chớp mắt tự nhiên) để nhân vật sống động khi không ký hiệu.

3. **Lưu trữ & PWA:**
   - Lưu trữ lịch sử dịch và cài đặt người dùng bằng **IndexedDB** (`idb`), bảo mật cục bộ trên thiết bị người dùng.
   - Web App Manifest và Service Worker cho phép cài đặt vào màn hình chính điện thoại và chạy offline shell.
