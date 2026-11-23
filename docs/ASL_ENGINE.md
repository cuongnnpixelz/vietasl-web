# TÀI LIỆU CƠ CHẾ DỊCH VÀ XỬ LÝ HOẠT ẢNH ASL (ASL SIGN ENGINE)
**Dự án:** VietASL Web — Động cơ Ngôn ngữ Ký hiệu Mỹ (American Sign Language)

---

## 1. NGUYÊN TẮC NGÔN NGỮ HỌC QUAN TRỌNG

1. **Phân biệt triệt để giữa ASL và LIBRAS:**
   - VLibras sử dụng Ngôn ngữ Ký hiệu Brazil (LIBRAS) vốn có hệ thống thế tay, vị trí và ngữ pháp hoàn toàn khác biệt với Ngôn ngữ Ký hiệu Mỹ (ASL).
   - Dự án VietASL Web **thay thế hoàn toàn 100%** dữ liệu ký hiệu của Brazil bằng hệ thống ASL hợp lệ. Tuyệt đối không giữ hoạt ảnh LIBRAS rồi đổi nhãn sang tiếng Anh/ASL.
2. **Nguyên tắc trung thực về ngữ pháp ASL:**
   - Động cơ chuyển đổi văn bản sang ký hiệu hiện tại biểu diễn các từ tiếng Anh theo từ vựng ASL chuẩn (ASL Lexicon) và bảng chữ cái ngón tay (Fingerspelling).
   - Đây là hệ thống hỗ trợ giao tiếp trực quan (Assistive Sign Presentation). Nó chưa cấu thành toàn bộ ngữ pháp không gian phức tạp của người Điếc bản ngữ (chẳng hạn cấu trúc Topic-Comment hay Classifier Predicates).
   - Vì vậy, ứng dụng luôn hiển thị phụ đề văn bản song song với hoạt ảnh ký hiệu để hỗ trợ tối đa người tiếp nhận.

---

## 2. QUY TRÌNH XỬ LÝ DỊCH THUẬT (TRANSLATION PIPELINE)

```
Văn bản đầu vào (Text Input)
         │
         ▼
[1] Chuẩn hoá văn bản (Text Normalization)
    • Loại bỏ ký tự đặc biệt, dấu câu thừa
    • Phân tách các từ (Tokenization)
         │
         ▼
[2] Lập kế hoạch ký hiệu (ASL Sign Planning)
    • Tra cứu từ vựng trong ASL Lexicon (signLookup)
    • Nếu có trong từ điển: Đánh dấu VERIFIED SIGN (Từ vựng đã kiểm chứng)
    • Nếu chưa có trong từ điển: Chuyển sang FINGERSPELLING (Đánh vần từng chữ cái)
         │
         ▼
[3] Sinh chuỗi ASL Gloss
    • Tạo chuỗi nhãn chuẩn hoá: [HELLO] [THANK-YOU] [fs-WORLD]
         │
         ▼
[4] Tính toán động học ngược (Kinematics & Contact Solving)
    • Two-Bone Arm Inverse Kinematics (Cánh tay & Cẳng tay)
    • Đặt bàn tay theo các điểm neo giải phẫu trên cơ thể (Anchors: trán, thái dương, cằm, ngực, thắt lưng)
    • Gập 15 đốt ngón tay theo thế tay giải phẫu (Handshape locals)
         │
         ▼
[5] Biên dịch Three.js AnimationClip
    • Tạo AnimationClip chứa các quaternion tracks cho 43 xương
    • Chèn các mốc biểu cảm nét mặt (Facial Markers)
         │
         ▼
[6] Trình phát 3D AnimationMixer
    • Nhận diện xương theo tên khớp
    • Điều khiển xoay khớp ngón tay và cánh tay mượt mà ở 60 FPS
```

---

## 3. TỪ ĐIỂN KÝ HIỆU ĐÃ KIỂM CHỨNG (VERIFIED ASL LEXICON)

Các ký hiệu sau đây được xây dựng từ các thông số giải phẫu chính xác của ASL (Thế tay, Điểm neo cơ thể, Hướng di chuyển và Hướng lòng bàn tay):

| Từ vựng | ASL Gloss | Nghĩa tiếng Việt | Nhóm từ | Động tác & Thế tay giải phẫu |
|---|---|---|---|---|
| **hello** | `HELLO` | Xin chào | Chào hỏi | Bàn tay phẳng (B-handshape), đầu ngón tay chạm thái dương rồi đưa dứt khoát ra ngoài như động tác chào cờ trang trọng. |
| **thank you** | `THANK-YOU` | Cảm ơn | Chào hỏi | Các đầu ngón tay phẳng chạm vào cằm/môi dưới rồi mở thẳng về phía người đối diện với nét mặt cảm kích. |
| **please** | `PLEASE` | Làm ơn / Xin vui lòng | Chào hỏi | Lòng bàn tay phẳng áp vào giữa ngực, xoa nhẹ theo hình tròn theo chiều kim đồng hồ. |
| **sorry** | `SORRY` | Xin lỗi | Xã giao | Bàn tay nắm chữ A xoa nhẹ trên ngực theo vòng tròn kèm nét mặt hối lỗi. |
| **welcome** | `WELCOME` | Hoan nghênh / Không có chi | Xã giao | Bàn tay ngửa mở rộng từ phía trước kéo nhẹ về phía thân mình thể hiện sự chào đón. |
| **yes** | `YES` | Đúng / Vâng / Có | Giao tiếp | Bàn tay nắm đấm (S-handshape) gật cổ tay lên xuống 2 lần như động tác gật đầu đồng ý. |
| **no** | `NO` | Không / Sai | Giao tiếp | Ngón trỏ và ngón giữa chụm nhanh chạm vào ngón cái như chiếc mỏ chim khép lại. |
| **help** | `HELP` | Giúp đỡ / Cứu giúp | Hành động | Tay trái mở phẳng làm bệ đỡ; tay phải nắm đấm với ngón cái giơ lên (A-handshape) đặt lên lòng bàn tay trái và nâng lên. |
| **friend** | `FRIEND` | Bạn bè | Con người | Hai ngón trỏ móc vào nhau một lần rồi đổi chiều móc lại lần hai. |
| **name** | `NAME` | Tên là | Giao tiếp | Hai ngón tay hình chữ H gõ chéo hai lần lên nhau. |
| **happy** | `HAPPY` | Vui vẻ / Hạnh phúc | Cảm xúc | Lòng bàn tay phẳng vỗ nhẹ hất lên trước ngực nhiều lần kèm nụ cười. |
| **good** | `GOOD` | Tốt / Tuyệt vời | Cảm xúc | Tay phải từ môi chạm xuống lòng bàn tay trái đang ngửa. |
| **bad** | `BAD` | Xấu / Kém / Tệ | Cảm xúc | Đầu ngón tay từ cằm lật úp và đẩy dứt khoát xuống dưới. |
| **like** | `LIKE` | Thích thú | Cảm xúc | Ngón cái và ngón giữa từ ngực kéo ra trước đồng thời khép lại thành hình số 8. |
| **love** | `LOVE` | Yêu thương | Cảm xúc | Hai bàn tay nắm chéo áp chặt trước ngực. |
| **meet** | `MEET` | Gặp gỡ | Hành động | Hai ngón trỏ giơ đứng di chuyển lại gần nhau đến khi chạm nhẹ. |
| **work** | `WORK` | Làm việc | Hành động | Hai nắm đấm, cườm tay phải gõ hai lần lên cổ tay trái. |
| **stop** | `STOP` | Dừng lại | Hành động | Cạnh bàn tay phải chặt dứt khoát vuông góc xuống lòng bàn tay trái. |
| **again** | `AGAIN` | Lặp lại | Giao tiếp | Bàn tay phải khum cong gõ nhẹ vào lòng bàn tay trái. |
| **more** | `MORE` | Thêm nữa | Giao tiếp | Các đầu ngón tay hai bàn tay chụm lại gõ vào nhau hai lần. |
| **want** | `WANT` | Mong muốn | Cảm xúc | Hai lòng bàn tay ngửa với các ngón co nhẹ kéo về phía mình. |
| **need** | `NEED` | Cần thiết | Giao tiếp | Ngón trỏ cong chữ X gập cổ tay xuống dứt khoát. |
| **think** | `THINK` | Suy nghĩ | Nhận thức | Ngón trỏ chạm nhẹ vào thái dương hoặc giữa trán. |
| **see** | `SEE` | Nhìn / Thấy | Hành động | Ngón trỏ và ngón giữa tạo chữ V đưa từ mắt ra phía trước. |
| **finish** | `FINISH` | Hoàn tất / Xong | Giao tiếp | Hai bàn tay xòe úp trước ngực cùng lúc lật ngửa hướng ra ngoài. |

---

## 4. CƠ CHẾ ĐÁNH VẦN NGÓN TAY (FINGERSPELLING ENGINE)

Khi một từ chưa có trong từ điển (ví dụ tên riêng, địa danh, thuật ngữ mới), hệ thống tự động kích hoạt **Fingerspelling Engine**:
- **Bảng chữ cái 26 ký tự (A-Z):** Mỗi chữ cái được định nghĩa chính xác theo chuẩn ASL Manual Alphabet với cấu hình xoay của 15 đốt xương ngón tay.
- **Quy tắc chuyển đổi mềm (Blending):** Giữa các chữ cái liên tiếp có thời gian chuyển tiếp (interpolation) 0.15s - 0.25s để tay di chuyển nhịp nhàng không bị giật.
- **Ký tự kép (Double-letter bounce):** Với các chữ cái lặp lại (như 'LL' trong 'HELLO' hay 'EE' trong 'MEET'), bàn tay thực hiện động tác nảy nhẹ sang bên phải theo quy chuẩn ASL tự nhiên.

---

## 5. DẤU HIỆU BIỂU CẢM PHI THỦ CÔNG (NON-MANUAL FACIAL MARKERS)

Trong ASL, biểu cảm khuôn mặt mang giá trị ngữ pháp cấu thành câu:
- **Câu hỏi Yes/No (`question`):** Nhướng cao chân mày trong (`browInnerUp: 0.75`), mắt mở to.
- **Câu hỏi Wh- (`wh`):** Nheo nhẹ chân mày (`browDown: 0.7`), nheo mắt nhẹ (`eyeSquint: 0.25`).
- **Phủ định (`negate`):** Hạ chân mày, lắc đầu nhẹ.
- **Thân thiện / Xã giao (`pleasant`):** Khóe miệng cười nhẹ (`mouthSmile: 0.45`).
