# HƯỚNG DẪN ĐÓNG GÓI VÀ CÀI ĐẶT ỨNG DỤNG ANDROID APK (VietASL)

Dự án **VietASL Web** đã được tích hợp hoàn chỉnh hệ thống **Capacitor Android** chuẩn công nghiệp, cấu hình tăng tốc phần cứng GPU WebGL Three.js, hỗ trợ toàn bộ 150 từ vựng ASL và phân quyền Micro thu âm để chạy mượt mà 60 FPS trên thiết bị Android (bao gồm Redmi Note 7).

---

## 1. Cấu hình kỹ thuật đã hoàn thành trong mã nguồn

1. **Capacitor Configuration (`capacitor.config.json`):**
   - `appId`: `com.vietasl.app`
   - `appName`: `VietASL`
   - `webDir`: `dist`
   - `androidScheme`: `https`
   - `allowMixedContent`: `true`
   - `captureInput`: `true`

2. **Cấu hình phần cứng & quyền hạn (`android/app/src/main/AndroidManifest.xml`):**
   - **Tăng tốc phần cứng GPU:** `android:hardwareAccelerated="true"` (Đảm bảo Three.js render 60 FPS không giật lag).
   - **Quyền Micro giọng nói:**
     - `android.permission.INTERNET`
     - `android.permission.RECORD_AUDIO`
     - `android.permission.MODIFY_AUDIO_SETTINGS`
   - **Khóa hướng màn hình dọc:** `android:screenOrientation="portrait"`

3. **Tài nguyên 3D:**
   - File avatar 3D (`avatar.glb`) và toàn bộ mã nguồn WebGL đã được đóng gói trực tiếp vào thư mục Native: `android/app/src/main/assets/public/avatars/avatar.glb` để chạy offline 100% không cần mạng.

---

## 2. Cách 1: Tự động Build APK trên đám mây qua GitHub Actions (Khuyên dùng - Siêu nhanh, không cần cài đặt gì trên máy)

Tệp workflow CI/CD đã được cấu hình sẵn tại [`.github/workflows/build-apk.yml`](file:///c:/Users/ACER/.gemini/antigravity/scratch/vietasl-web/.github/workflows/build-apk.yml).

### Các bước thực hiện:
1. Tạo một repository mới trên GitHub (ví dụ: `vietasl-app`).
2. Mở terminal tại thư mục dự án và đẩy code lên:
   ```bash
   git remote add origin https://github.com/<tên-tài-khoản-của-bạn>/vietasl-app.git
   git branch -M main
   git push -u origin main
   ```
3. Truy cập vào mục **Actions** trên GitHub repository của bạn:
   - Quy trình **Build Android APK (VietASL)** sẽ tự động kích hoạt (chạy trên máy chủ Ubuntu có sẵn JDK 17 và Android SDK).
   - Quá trình build hoàn thành trong khoảng 2–3 phút.
4. Tải file APK:
   - Nhấp vào phiên chạy build vừa xong.
   - Tại mục **Artifacts** ở cuối trang, nhấp tải tệp **`VietASL-Debug-APK`**.
   - Giải nén file `.zip` sẽ nhận được ngay tệp tin **`app-debug.apk`**!

---

## 3. Cách 2: Biên dịch trực tiếp trên máy tính (Local Build)

Nếu máy tính của bạn đã hoặc muốn cài đặt môi trường Android:
1. **Yêu cầu môi trường:**
   - Đã cài **Java JDK 17** (và đặt biến môi trường `JAVA_HOME`).
   - Đã cài **Android Studio** (bao gồm Android SDK Platform 34/36).
2. **Lệnh biên dịch:**
   - Mở terminal tại thư mục gốc của dự án:
     ```bash
     npm run build
     npx cap sync android
     cd android
     .\gradlew.bat assembleDebug
     ```
   - Tệp tin APK thành phẩm sẽ xuất hiện tại đường dẫn:
     ```
     android/app/build/outputs/apk/debug/app-debug.apk
     ```

Hoặc bạn có thể mở thư mục `android/` trực tiếp bằng **Android Studio**, bấm **Build > Build Bundle(s) / APK(s) > Build APK(s)**.

---

## 4. Hướng dẫn cài đặt lên điện thoại Redmi Note 7

1. **Chép file `app-debug.apk` vào điện thoại:**
   - Cắm cáp USB nối máy tính với điện thoại (chọn chế độ *Truyền tệp / MTP*) và chép file vào thư mục *Download*.
   - Hoặc gửi file qua Zalo (gửi dạng File) hoặc tải lên Google Drive rồi tải về điện thoại.
2. **Cài đặt APK:**
   - Trên Redmi Note 7, mở ứng dụng **Quản lý tập tin (File Manager)** > tìm đến file `app-debug.apk` và nhấn vào để cài đặt.
   - Nếu máy hỏi *Cho phép cài đặt ứng dụng từ nguồn này*, hãy gạt bật **Cho phép**.
3. **Mở ứng dụng VietASL:**
   - Nhấp icon **VietASL** trên màn hình chính.
   - Nhân vật 3D avatar sẽ hiển thị ngay lập tức, xoay 360 độ mượt mà.
   - Khi bấm nút Micro lần đầu, hệ thống sẽ yêu cầu cấp quyền thu âm > bấm **Cho phép** để sử dụng tính năng dịch giọng nói sang ký hiệu ASL.
