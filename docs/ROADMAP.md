# LỘ TRÌNH PHÁT TRIỂN TIẾP THEO (PROJECT ROADMAP)
**Dự án:** VietASL Web — Hệ sinh thái Giao tiếp Ngôn ngữ Ký hiệu ASL

---

## GIAI ĐOẠN 1: MVP CỐT LÕI (ĐÃ HOÀN THÀNH 100%)
- [x] Nghiên cứu mã nguồn 7 kho lưu trữ liên quan đến VLibras và ASL.
- [x] Thiết lập kiến trúc Client-Side PWA với React 19, TypeScript, Vite, Tailwind CSS v4, Three.js và Zustand.
- [x] Tái tạo giao diện người dùng theo chuẩn phong cách VLibras (Header, DrawerMenu, Canvas, PlayerControls, FloatingButtons).
- [x] Chuyển đổi toàn bộ ngôn ngữ giao diện sang Tiếng Việt (`vi-VN`).
- [x] Tích hợp nhân vật 3D thật với hệ xương 43 bones, bao gồm đầy đủ 15 khớp xương ngón tay cho mỗi bàn tay.
- [x] Tích hợp engine ASL chuẩn (`@three-ws/sign-language`) với từ điển giải phẫu và fingerspelling.
- [x] Hoàn thiện các trang: Trình dịch, Từ điển, Lịch sử, Cá nhân hóa, Cài đặt, Hướng dẫn.
- [x] Tích hợp nhận diện giọng nói (Web Speech API) và lưu trữ cục bộ IndexedDB.
- [x] Kiểm thử tự động (Vitest) và kiểm thử giao diện thực tế (Browser Subagent).

---

## GIAI ĐOẠN 2: MỞ RỘNG VỐN TỪ VÀ THẾ TAY ASL (QUÝ 1/2027)
- [ ] Mở rộng từ điển ký hiệu ASL giải phẫu từ 75 từ hiện tại lên hơn 500 từ thông dụng hàng ngày.
- [ ] Bổ sung các nhóm ký hiệu chuyên ngành (Giáo dục, Y tế, Giao thông, Công nghệ).
- [ ] Bổ sung thêm các tư thế chuyển tiếp (Interpolation blend curves) để các chuyển động phức tạp ở tốc độ cao không bị gãy góc khuỷu tay.

---

## GIAI ĐOẠN 3: PIPELINE DỊCH TIẾNG VIỆT ĐẦU VÀO (QUÝ 2/2027)
- [ ] Xây dựng mô hình xử lý ngôn ngữ tự nhiên Tiếng Việt (Vietnamese NLP Tokenizer & POS Tagger).
- [ ] Xây dựng bộ quy tắc ánh xạ ngữ nghĩa Tiếng Việt sang cấu trúc khái niệm ASL.
- [ ] Hỗ trợ người dùng nhập trực tiếp câu tiếng Việt (ví dụ: "Tôi muốn giúp bạn") để hệ thống tự động sinh ký hiệu ASL tương đương `[I] [WANT] [HELP] [YOU]`.

---

## GIAI ĐOẠN 4: NGỮ PHÁP ASL TỰ NHIÊN & KHÔNG GIAN KÝ HIỆU (QUÝ 3/2027)
- [ ] Tích hợp mô hình ngôn ngữ lớn (LLM-based ASL Grammar Planner) để chuyển đổi từ thứ tự từ ngữ tiếng Anh sang cấu trúc câu Topic-Comment và biểu đạt thời gian trong không gian ký hiệu.
- [ ] Nâng cấp hệ thống morph target khuôn mặt để biểu cảm chân mày, mắt và miệng thể hiện trọn vẹn ngữ điệu câu hỏi, nghi vấn, cảm thán.

---

## GIAI ĐOẠN 5: ĐA NỀN TẢNG NATIVE APP (QUÝ 4/2027)
- [ ] Đóng gói phiên bản ứng dụng di động độc lập cho Android (Google Play) và iOS (App Store) qua Capacitor / Tauri.
- [ ] Bổ sung tiện ích mở rộng trình duyệt (Browser Extension) dịch nội dung trang web bất kỳ sang ASL tương tự như VLibras Web Widget.
