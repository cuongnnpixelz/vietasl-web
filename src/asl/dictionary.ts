import { DictionaryItem } from '../types';
import { WLASL_150_SIGNS, WLASL_CATEGORIES } from './wlaslSigns';

export const ASL_DICTIONARY: DictionaryItem[] = [
  // 1. Chào hỏi & Xã giao
  {
    id: 'hello',
    word: 'hello',
    gloss: 'HELLO',
    meaningVi: 'Xin chào',
    category: 'chao-hoi',
    categoryLabelVi: 'Chào hỏi & Xã giao',
    verified: true,
    descriptionVi: 'Bàn tay mở phẳng, lòng bàn tay hướng ra ngoài, đặt cạnh thái dương rồi đưa nhẹ ra ngoài như động tác chào cờ.',
    dominantHand: 'Right'
  },
  {
    id: 'hi',
    word: 'hi',
    gloss: 'HI',
    meaningVi: 'Chào bạn',
    category: 'chao-hoi',
    categoryLabelVi: 'Chào hỏi & Xã giao',
    verified: true,
    descriptionVi: 'Bàn tay mở đưa lên gần vai vẫy nhẹ sang hai bên.',
    dominantHand: 'Right'
  },
  {
    id: 'goodbye',
    word: 'goodbye',
    gloss: 'GOODBYE',
    meaningVi: 'Tạm biệt',
    category: 'chao-hoi',
    categoryLabelVi: 'Chào hỏi & Xã giao',
    verified: true,
    descriptionVi: 'Bàn tay mở giơ lên ngang tầm đầu và vẫy nhẹ về phía trước chào tạm biệt.',
    dominantHand: 'Right'
  },
  {
    id: 'thankyou',
    word: 'thank you',
    gloss: 'THANK-YOU',
    meaningVi: 'Cảm ơn',
    category: 'chao-hoi',
    categoryLabelVi: 'Chào hỏi & Xã giao',
    verified: true,
    descriptionVi: 'Đầu các ngón tay của bàn tay phẳng chạm vào cằm hoặc môi dưới, sau đó đưa thẳng tay về phía người đối diện.',
    dominantHand: 'Right'
  },
  {
    id: 'thanks',
    word: 'thanks',
    gloss: 'THANKS',
    meaningVi: 'Cảm ơn nhiều',
    category: 'chao-hoi',
    categoryLabelVi: 'Chào hỏi & Xã giao',
    verified: true,
    descriptionVi: 'Đưa tay phẳng từ cằm mở hướng về phía trước với thái độ cảm kích.',
    dominantHand: 'Right'
  },
  {
    id: 'welcome',
    word: 'welcome',
    gloss: 'WELCOME',
    meaningVi: 'Hoan nghênh / Không có chi',
    category: 'chao-hoi',
    categoryLabelVi: 'Chào hỏi & Xã giao',
    verified: true,
    descriptionVi: 'Bàn tay mở ngửa hướng lên trên, đưa từ ngoài vào trong sát về phía ngực biểu thị sự chào đón.',
    dominantHand: 'Right'
  },
  {
    id: 'please',
    word: 'please',
    gloss: 'PLEASE',
    meaningVi: 'Làm ơn / Xin vui lòng',
    category: 'chao-hoi',
    categoryLabelVi: 'Chào hỏi & Xã giao',
    verified: true,
    descriptionVi: 'Lòng bàn tay phẳng áp vào giữa ngực và xoa nhẹ theo vòng tròn theo chiều kim đồng hồ.',
    dominantHand: 'Right'
  },
  {
    id: 'sorry',
    word: 'sorry',
    gloss: 'SORRY',
    meaningVi: 'Xin lỗi',
    category: 'chao-hoi',
    categoryLabelVi: 'Chào hỏi & Xã giao',
    verified: true,
    descriptionVi: 'Bàn tay nắm lại thành chữ A, ngón cái tựa vào bên cạnh, xoa nhẹ theo vòng tròn trên ngực.',
    dominantHand: 'Right'
  },

  // 2. Giao tiếp cơ bản
  {
    id: 'yes',
    word: 'yes',
    gloss: 'YES',
    meaningVi: 'Đúng / Vâng / Có',
    category: 'giao-tiep',
    categoryLabelVi: 'Giao tiếp cơ bản',
    verified: true,
    descriptionVi: 'Nắm bàn tay thành hình chữ S (nắm đấm) và gật cổ tay lên xuống giống như động tác gật đầu.',
    dominantHand: 'Right'
  },
  {
    id: 'no',
    word: 'no',
    gloss: 'NO',
    meaningVi: 'Không / Sai',
    category: 'giao-tiep',
    categoryLabelVi: 'Giao tiếp cơ bản',
    verified: true,
    descriptionVi: 'Ngón trỏ và ngón giữa duỗi ra rồi chụm nhanh lại chạm vào ngón cái như hình cái mỏ chim khép lại.',
    dominantHand: 'Right'
  },
  {
    id: 'name',
    word: 'name',
    gloss: 'NAME',
    meaningVi: 'Tên / Danh xưng',
    category: 'giao-tiep',
    categoryLabelVi: 'Giao tiếp cơ bản',
    verified: true,
    descriptionVi: 'Ngón trỏ và ngón giữa của cả hai bàn tay duỗi thẳng (chữ H), gõ chéo hai lần ngón tay thuận lên ngón tay không thuận.',
    dominantHand: 'Both'
  },
  {
    id: 'again',
    word: 'again',
    gloss: 'AGAIN',
    meaningVi: 'Lặp lại / Lần nữa',
    category: 'giao-tiep',
    categoryLabelVi: 'Giao tiếp cơ bản',
    verified: true,
    descriptionVi: 'Bàn tay thuận khum lại vòng cung rồi gõ nhẹ vào lòng bàn tay không thuận đang mở phẳng.',
    dominantHand: 'Both'
  },
  {
    id: 'more',
    word: 'more',
    gloss: 'MORE',
    meaningVi: 'Thêm nữa / Nhiều hơn',
    category: 'giao-tiep',
    categoryLabelVi: 'Giao tiếp cơ bản',
    verified: true,
    descriptionVi: 'Cả hai bàn tay chụm các ngón tay lại (dạng O bẹp) rồi chạm các đầu ngón tay vào nhau hai lần.',
    dominantHand: 'Both'
  },
  {
    id: 'need',
    word: 'need',
    gloss: 'NEED',
    meaningVi: 'Cần thiết / Bắt buộc',
    category: 'giao-tiep',
    categoryLabelVi: 'Giao tiếp cơ bản',
    verified: true,
    descriptionVi: 'Ngón trỏ cong hình chữ X, gập cổ tay xuống dưới một hoặc hai lần dứt khoát.',
    dominantHand: 'Right'
  },
  {
    id: 'know',
    word: 'know',
    gloss: 'KNOW',
    meaningVi: 'Biết / Hiểu rõ',
    category: 'giao-tiep',
    categoryLabelVi: 'Giao tiếp cơ bản',
    verified: true,
    descriptionVi: 'Các đầu ngón tay của bàn tay hơi khum chạm nhẹ vào một bên trán.',
    dominantHand: 'Right'
  },
  {
    id: 'understand',
    word: 'understand',
    gloss: 'UNDERSTAND',
    meaningVi: 'Hiểu rồi / Đã hiểu',
    category: 'giao-tiep',
    categoryLabelVi: 'Giao tiếp cơ bản',
    verified: true,
    descriptionVi: 'Nắm bàn tay chữ S gần thái dương, bật ngón trỏ thẳng lên kết hợp gật đầu nhẹ.',
    dominantHand: 'Right'
  },
  {
    id: 'think',
    word: 'think',
    gloss: 'THINK',
    meaningVi: 'Suy nghĩ / Nghĩ rằng',
    category: 'giao-tiep',
    categoryLabelVi: 'Giao tiếp cơ bản',
    verified: true,
    descriptionVi: 'Đầu ngón trỏ chạm nhẹ vào thái dương hoặc giữa trán.',
    dominantHand: 'Right'
  },
  {
    id: 'finish',
    word: 'finish',
    gloss: 'FINISH',
    meaningVi: 'Đã xong / Hoàn tất',
    category: 'giao-tiep',
    categoryLabelVi: 'Giao tiếp cơ bản',
    verified: true,
    descriptionVi: 'Cả hai bàn tay mở xòe úp trước ngực rồi cùng lúc lật ngửa hướng ra ngoài như thể hiện đã xong.',
    dominantHand: 'Both'
  },

  // 3. Từ để hỏi (Questions)
  {
    id: 'what',
    word: 'what',
    gloss: 'WHAT',
    meaningVi: 'Cái gì / Gì',
    category: 'cau-hoi',
    categoryLabelVi: 'Câu hỏi',
    verified: true,
    descriptionVi: 'Hai lòng bàn tay ngửa mở trước ngực, lắc nhẹ sang hai bên kết hợp nhíu mày thắc mắc.',
    dominantHand: 'Both'
  },
  {
    id: 'where',
    word: 'where',
    gloss: 'WHERE',
    meaningVi: 'Ở đâu / Nơi nào',
    category: 'cau-hoi',
    categoryLabelVi: 'Câu hỏi',
    verified: true,
    descriptionVi: 'Ngón trỏ dựng thẳng lắc qua lắc lại trước ngực với nét mặt tìm kiếm hỏi han.',
    dominantHand: 'Right'
  },
  {
    id: 'who',
    word: 'who',
    gloss: 'WHO',
    meaningVi: 'Ai / Người nào',
    category: 'cau-hoi',
    categoryLabelVi: 'Câu hỏi',
    verified: true,
    descriptionVi: 'Ngón cái chữ L đặt vào cằm, ngón trỏ gập mở hai lần kết hợp biểu cảm câu hỏi.',
    dominantHand: 'Right'
  },
  {
    id: 'why',
    word: 'why',
    gloss: 'WHY',
    meaningVi: 'Tại sao / Vì sao',
    category: 'cau-hoi',
    categoryLabelVi: 'Câu hỏi',
    verified: true,
    descriptionVi: 'Các ngón tay chạm trán rồi kéo ra ngoài biến thành hình chữ Y kèm nét mặt băn khoăn.',
    dominantHand: 'Right'
  },
  {
    id: 'how',
    word: 'how',
    gloss: 'HOW',
    meaningVi: 'Như thế nào / Ra sao',
    category: 'cau-hoi',
    categoryLabelVi: 'Câu hỏi',
    verified: true,
    descriptionVi: 'Hai bàn tay cong mu tay chạm nhau trước ngực rồi cuộn lật ngửa ra phía trước.',
    dominantHand: 'Both'
  },

  // 4. Cảm xúc & Tinh thần
  {
    id: 'happy',
    word: 'happy',
    gloss: 'HAPPY',
    meaningVi: 'Vui vẻ / Hạnh phúc',
    category: 'cam-xuc',
    categoryLabelVi: 'Cảm xúc & Tinh thần',
    verified: true,
    descriptionVi: 'Lòng bàn tay phẳng vỗ nhẹ và hất lên trên trước ngực nhiều lần kèm nụ cười tươi.',
    dominantHand: 'Right'
  },
  {
    id: 'good',
    word: 'good',
    gloss: 'GOOD',
    meaningVi: 'Tốt / Giỏi',
    category: 'cam-xuc',
    categoryLabelVi: 'Cảm xúc & Tinh thần',
    verified: true,
    descriptionVi: 'Ngón tay của tay thuận chạm vào môi rồi hạ xuống đặt lên lòng bàn tay không thuận đang mở ngửa.',
    dominantHand: 'Both'
  },
  {
    id: 'bad',
    word: 'bad',
    gloss: 'BAD',
    meaningVi: 'Xấu / Kém / Tệ',
    category: 'cam-xuc',
    categoryLabelVi: 'Cảm xúc & Tinh thần',
    verified: true,
    descriptionVi: 'Đầu ngón tay chạm cằm rồi lật úp bàn tay và đẩy dứt khoát xuống dưới.',
    dominantHand: 'Right'
  },
  {
    id: 'like',
    word: 'like',
    gloss: 'LIKE',
    meaningVi: 'Thích / Ưa chuộng',
    category: 'cam-xuc',
    categoryLabelVi: 'Cảm xúc & Tinh thần',
    verified: true,
    descriptionVi: 'Ngón cái và ngón giữa mở chạm vào ngực rồi kéo thẳng ra phía trước đồng thời chụm lại thành hình số 8.',
    dominantHand: 'Right'
  },
  {
    id: 'love',
    word: 'love',
    gloss: 'LOVE',
    meaningVi: 'Yêu thương',
    category: 'cam-xuc',
    categoryLabelVi: 'Cảm xúc & Tinh thần',
    verified: true,
    descriptionVi: 'Hai bàn tay nắm lại bắt chéo áp chặt vào trước ngực.',
    dominantHand: 'Both'
  },
  {
    id: 'nice',
    word: 'nice',
    gloss: 'NICE',
    meaningVi: 'Đẹp / Dễ mến / Tử tế',
    category: 'cam-xuc',
    categoryLabelVi: 'Cảm xúc & Tinh thần',
    verified: true,
    descriptionVi: 'Tay thuận phẳng vuốt trượt dọc trên lòng bàn tay không thuận từ trong cổ tay ra các đầu ngón tay.',
    dominantHand: 'Both'
  },
  {
    id: 'want',
    word: 'want',
    gloss: 'WANT',
    meaningVi: 'Muốn / Mong muốn',
    category: 'cam-xuc',
    categoryLabelVi: 'Cảm xúc & Tinh thần',
    verified: true,
    descriptionVi: 'Hai lòng bàn tay ngửa hướng lên, các ngón tay hơi co lại như móng vuốt kéo nhẹ về phía thân mình.',
    dominantHand: 'Both'
  },

  // 5. Hành động & Đời sống
  {
    id: 'water',
    word: 'water',
    gloss: 'WATER',
    meaningVi: 'Nước / Uống nước',
    category: 'doi-song',
    categoryLabelVi: 'Đời sống & Sinh hoạt',
    verified: true,
    descriptionVi: 'Bàn tay hình chữ W (ba ngón giữa giơ thẳng), chạm cạnh ngón trỏ vào cằm hoặc môi hai lần.',
    dominantHand: 'Right'
  },
  {
    id: 'eat',
    word: 'eat',
    gloss: 'EAT',
    meaningVi: 'Ăn / Thức ăn',
    category: 'doi-song',
    categoryLabelVi: 'Đời sống & Sinh hoạt',
    verified: true,
    descriptionVi: 'Các ngón tay chụm lại thành hình chữ O dẹt, gõ đầu ngón tay vào miệng hai lần.',
    dominantHand: 'Right'
  },
  {
    id: 'drink',
    word: 'drink',
    gloss: 'DRINK',
    meaningVi: 'Uống',
    category: 'doi-song',
    categoryLabelVi: 'Đời sống & Sinh hoạt',
    verified: true,
    descriptionVi: 'Bàn tay hình chữ C như cầm cốc nước, nâng lên nghiêng dần vào miệng kèm đầu hơi ngửa.',
    dominantHand: 'Right'
  },
  {
    id: 'book',
    word: 'book',
    gloss: 'BOOK',
    meaningVi: 'Sách / Quyển sách',
    category: 'doi-song',
    categoryLabelVi: 'Đời sống & Sinh hoạt',
    verified: true,
    descriptionVi: 'Hai lòng bàn tay áp vào nhau rồi lật mở sang hai bên như mở một cuốn sách.',
    dominantHand: 'Both'
  },
  {
    id: 'time',
    word: 'time',
    gloss: 'TIME',
    meaningVi: 'Thời gian / Giờ giấc',
    category: 'doi-song',
    categoryLabelVi: 'Đời sống & Sinh hoạt',
    verified: true,
    descriptionVi: 'Cánh tay trái đặt ngang ngực, ngón trỏ phải gõ nhẹ hai lần lên cổ tay trái giống xem đồng hồ.',
    dominantHand: 'Right'
  },
  {
    id: 'sleep',
    word: 'sleep',
    gloss: 'SLEEP',
    meaningVi: 'Ngủ / Nghỉ ngơi',
    category: 'doi-song',
    categoryLabelVi: 'Đời sống & Sinh hoạt',
    verified: true,
    descriptionVi: 'Bàn tay mở đặt trước mặt vuốt xuống cằm chụm lại và mắt nhắm nhẹ.',
    dominantHand: 'Right'
  },
  {
    id: 'day',
    word: 'day',
    gloss: 'DAY',
    meaningVi: 'Ban ngày / Ngày',
    category: 'doi-song',
    categoryLabelVi: 'Đời sống & Sinh hoạt',
    verified: true,
    descriptionVi: 'Cánh tay trái nằm ngang, cánh tay phải ngón trỏ giơ cao rồi hạ cánh tay xuống chạm tay trái như mặt trời di chuyển.',
    dominantHand: 'Right'
  },
  {
    id: 'night',
    word: 'night',
    gloss: 'NIGHT',
    meaningVi: 'Ban đêm / Đêm',
    category: 'doi-song',
    categoryLabelVi: 'Đời sống & Sinh hoạt',
    verified: true,
    descriptionVi: 'Tay trái ngang ngực, bàn tay phải cong gập cổ tay úp qua mu tay trái tượng trưng màn đêm buông xuống.',
    dominantHand: 'Right'
  },
  {
    id: 'help',
    word: 'help',
    gloss: 'HELP',
    meaningVi: 'Giúp đỡ / Cứu giúp',
    category: 'hanh-dong',
    categoryLabelVi: 'Hành động & Hoạt động',
    verified: true,
    descriptionVi: 'Tay không thuận mở phẳng ngửa lên. Tay thuận nắm lại với ngón cái chỉ lên (chữ A), đặt lên lòng bàn tay kia và cùng nâng lên.',
    dominantHand: 'Both'
  },
  {
    id: 'meet',
    word: 'meet',
    gloss: 'MEET',
    meaningVi: 'Gặp gỡ',
    category: 'hanh-dong',
    categoryLabelVi: 'Hành động & Hoạt động',
    verified: true,
    descriptionVi: 'Hai ngón trỏ giơ đứng tượng trưng hai người, di chuyển từ hai bên lại gần nhau đến khi chạm nhẹ.',
    dominantHand: 'Both'
  },
  {
    id: 'learn',
    word: 'learn',
    gloss: 'LEARN',
    meaningVi: 'Học tập',
    category: 'hanh-dong',
    categoryLabelVi: 'Hành động & Hoạt động',
    verified: true,
    descriptionVi: 'Bàn tay không thuận mở như trang sách, các ngón tay thuận chụm lại lấy từ sách rồi đưa lên chạm trán.',
    dominantHand: 'Both'
  },
  {
    id: 'work',
    word: 'work',
    gloss: 'WORK',
    meaningVi: 'Làm việc / Công việc',
    category: 'hanh-dong',
    categoryLabelVi: 'Hành động & Hoạt động',
    verified: true,
    descriptionVi: 'Cả hai bàn tay nắm lại thành nắm đấm, cườm tay thuận gõ nhẹ hai lần lên mu cổ tay không thuận.',
    dominantHand: 'Both'
  },
  {
    id: 'stop',
    word: 'stop',
    gloss: 'STOP',
    meaningVi: 'Dừng lại / Thôi',
    category: 'hanh-dong',
    categoryLabelVi: 'Hành động & Hoạt động',
    verified: true,
    descriptionVi: 'Cạnh bàn tay thuận chặt mạnh và dứt khoát vuông góc xuống lòng bàn tay không thuận đang mở.',
    dominantHand: 'Both'
  },
  {
    id: 'see',
    word: 'see',
    gloss: 'SEE',
    meaningVi: 'Nhìn / Thấy',
    category: 'hanh-dong',
    categoryLabelVi: 'Hành động & Hoạt động',
    verified: true,
    descriptionVi: 'Ngón trỏ và ngón giữa tạo thành chữ V, đưa từ dưới mắt hướng thẳng ra ngoài.',
    dominantHand: 'Right'
  },

  // 6. Con người & Gia đình
  {
    id: 'family',
    word: 'family',
    gloss: 'FAMILY',
    meaningVi: 'Gia đình',
    category: 'gia-dinh',
    categoryLabelVi: 'Gia đình & Người thân',
    verified: true,
    descriptionVi: 'Hai bàn tay chữ F ngón trỏ và cái chạm nhau trước ngực, vẽ vòng tròn ra ngoài rồi khép lại hai ngón út chạm nhau.',
    dominantHand: 'Both'
  },
  {
    id: 'mom',
    word: 'mom',
    gloss: 'MOM',
    meaningVi: 'Mẹ / Má',
    category: 'gia-dinh',
    categoryLabelVi: 'Gia đình & Người thân',
    verified: true,
    descriptionVi: 'Bàn tay mở số 5, ngón cái chạm nhẹ vào cằm hai lần.',
    dominantHand: 'Right'
  },
  {
    id: 'dad',
    word: 'dad',
    gloss: 'DAD',
    meaningVi: 'Bố / Ba / Cha',
    category: 'gia-dinh',
    categoryLabelVi: 'Gia đình & Người thân',
    verified: true,
    descriptionVi: 'Bàn tay mở số 5, ngón cái chạm nhẹ vào một bên trán hai lần.',
    dominantHand: 'Right'
  },
  {
    id: 'friend',
    word: 'friend',
    gloss: 'FRIEND',
    meaningVi: 'Bạn bè / Người bạn',
    category: 'dai-tu',
    categoryLabelVi: 'Đại từ & Con người',
    verified: true,
    descriptionVi: 'Hai ngón trỏ móc vào nhau một lần, sau đó đổi chiều móc lại lần thứ hai tượng trưng cho sự gắn kết.',
    dominantHand: 'Both'
  },
  {
    id: 'i',
    word: 'i',
    gloss: 'I',
    meaningVi: 'Tôi / Bản thân tôi',
    category: 'dai-tu',
    categoryLabelVi: 'Đại từ & Con người',
    verified: true,
    descriptionVi: 'Ngón trỏ chỉ thẳng vào giữa ngực mình.',
    dominantHand: 'Right'
  },
  {
    id: 'you',
    word: 'you',
    gloss: 'YOU',
    meaningVi: 'Bạn / Người đối diện',
    category: 'dai-tu',
    categoryLabelVi: 'Đại từ & Con người',
    verified: true,
    descriptionVi: 'Ngón trỏ chỉ thẳng về phía người đang giao tiếp cùng.',
    dominantHand: 'Right'
  },
  {
    id: 'everyone',
    word: 'everyone',
    gloss: 'EVERYONE',
    meaningVi: 'Mọi người / Tất cả',
    category: 'dai-tu',
    categoryLabelVi: 'Đại từ & Con người',
    verified: true,
    descriptionVi: 'Mặt lưng hai bàn tay lướt qua nhau rồi ngón cái chỉ sang hai bên mở rộng cho tất cả mọi người.',
    dominantHand: 'Both'
  },
  {
    id: 'today',
    word: 'today',
    gloss: 'TODAY',
    meaningVi: 'Hôm nay',
    category: 'doi-song',
    categoryLabelVi: 'Đời sống & Sinh hoạt',
    verified: true,
    descriptionVi: 'Hai bàn tay chữ Y đặt trước ngực hạ xuống hai lần.',
    dominantHand: 'Both'
  },
  {
    id: 'now',
    word: 'now',
    gloss: 'NOW',
    meaningVi: 'Bây giờ / Ngay lúc này',
    category: 'doi-song',
    categoryLabelVi: 'Đời sống & Sinh hoạt',
    verified: true,
    descriptionVi: 'Hai bàn tay chữ Y hạ dứt khoát một lần trước ngực.',
    dominantHand: 'Both'
  },
  {
    id: 'friday',
    word: 'friday',
    gloss: 'FRIDAY',
    meaningVi: 'Thứ sáu',
    category: 'doi-song',
    categoryLabelVi: 'Đời sống & Sinh hoạt',
    verified: true,
    descriptionVi: 'Bàn tay chữ F xoay nhẹ theo vòng tròn trước ngực.',
    dominantHand: 'Right'
  },
  {
    id: 'fine',
    word: 'fine',
    gloss: 'FINE',
    meaningVi: 'Khỏe / Bình thường / Tốt',
    category: 'cam-xuc',
    categoryLabelVi: 'Cảm xúc & Tinh thần',
    verified: true,
    descriptionVi: 'Bàn tay mở số 5, ngón cái chạm nhẹ vào giữa ngực kèm nụ cười.',
    dominantHand: 'Right'
  },
  {
    id: 'hot',
    word: 'hot',
    gloss: 'HOT',
    meaningVi: 'Nóng',
    category: 'doi-song',
    categoryLabelVi: 'Đời sống & Sinh hoạt',
    verified: true,
    descriptionVi: 'Bàn tay chữ C đặt trước miệng rồi xoay hất ra ngoài như thổi khí nóng.',
    dominantHand: 'Right'
  },
  {
    id: 'cold',
    word: 'cold',
    gloss: 'COLD',
    meaningVi: 'Lạnh',
    category: 'doi-song',
    categoryLabelVi: 'Đời sống & Sinh hoạt',
    verified: true,
    descriptionVi: 'Hai nắm đấm co trước ngực run rẩy nhẹ biểu thị lạnh giá.',
    dominantHand: 'Both'
  },
  {
    id: 'tired',
    word: 'tired',
    gloss: 'TIRED',
    meaningVi: 'Mệt mỏi',
    category: 'cam-xuc',
    categoryLabelVi: 'Cảm xúc & Tinh thần',
    verified: true,
    descriptionVi: 'Hai bàn tay khum đặt lên ngực rồi rũ xuống biểu thị sự mệt mỏi.',
    dominantHand: 'Both'
  },
  {
    id: 'house',
    word: 'house',
    gloss: 'HOUSE',
    meaningVi: 'Ngôi nhà',
    category: 'doi-song',
    categoryLabelVi: 'Đời sống & Sinh hoạt',
    verified: true,
    descriptionVi: 'Đầu các ngón tay hai bên chạm chéo tạo hình mái nhà, sau đó hạ thẳng xuống tạo vách tường.',
    dominantHand: 'Both'
  },
  {
    id: 'school',
    word: 'school',
    gloss: 'SCHOOL',
    meaningVi: 'Trường học',
    category: 'doi-song',
    categoryLabelVi: 'Đời sống & Sinh hoạt',
    verified: true,
    descriptionVi: 'Bàn tay phải mở phẳng vỗ nhẹ hai lần lên lòng bàn tay trái đang ngửa.',
    dominantHand: 'Both'
  },
  {
    id: 'money',
    word: 'money',
    gloss: 'MONEY',
    meaningVi: 'Tiền bạc',
    category: 'doi-song',
    categoryLabelVi: 'Đời sống & Sinh hoạt',
    verified: true,
    descriptionVi: 'Bàn tay phải chụm ngón tay gõ nhẹ hai lần vào lòng bàn tay trái đang ngửa.',
    dominantHand: 'Both'
  },
  {
    id: 'wish',
    word: 'wish',
    gloss: 'WISH',
    meaningVi: 'Chúc / Mong ước',
    category: 'cam-xuc',
    categoryLabelVi: 'Cảm xúc & Tinh thần',
    verified: true,
    descriptionVi: 'Bàn tay hình chữ C đặt trước cổ họng vuốt nhẹ xuống ngực.',
    dominantHand: 'Right'
  }
];

// Category index to ID mapping
const WLASL_CAT_IDS: Record<number, { id: DictionaryItem['category']; labelVi: string }> = {
  1: { id: 'chao-hoi', labelVi: 'Chào hỏi & Xã giao' },
  2: { id: 'dai-tu', labelVi: 'Đại từ & Con người' },
  3: { id: 'cau-hoi', labelVi: 'Từ để hỏi' },
  4: { id: 'cam-xuc', labelVi: 'Cảm xúc & Trạng thái' },
  5: { id: 'doi-song', labelVi: 'Sinh hoạt & Ăn uống' },
  6: { id: 'hanh-dong', labelVi: 'Hành động cơ bản' },
  7: { id: 'y-te', labelVi: 'Y tế & Khẩn cấp' },
  8: { id: 'thoi-gian', labelVi: 'Thời gian & Lịch trình' },
  9: { id: 'dia-diem', labelVi: 'Phương hướng & Địa điểm' },
  10: { id: 'tinh-chat', labelVi: 'Tính chất & Màu sắc' }
};

// Add all 150 WLASL signs to ASL_DICTIONARY (ensuring 100% dictionary completeness)
const existingWords = new Set(ASL_DICTIONARY.map((d) => d.gloss.toUpperCase()));

for (const sign of WLASL_150_SIGNS) {
  if (!existingWords.has(sign.gloss.toUpperCase())) {
    const catInfo = WLASL_CAT_IDS[sign.categoryIndex] || { id: 'doi-song', labelVi: sign.category };
    ASL_DICTIONARY.push({
      id: sign.key.toLowerCase(),
      word: sign.synonyms[0] || sign.key.toLowerCase(),
      gloss: sign.gloss,
      meaningVi: sign.meaningVi,
      category: catInfo.id,
      categoryLabelVi: catInfo.labelVi,
      verified: true,
      descriptionVi: sign.descriptionVi,
      dominantHand: sign.config.twoHanded ? 'Both' : 'Right'
    });
    existingWords.add(sign.gloss.toUpperCase());
  }
}

export const CATEGORIES = [
  { id: 'all', labelVi: 'Tất cả' },
  { id: 'chao-hoi', labelVi: 'Chào hỏi & Xã giao' },
  { id: 'dai-tu', labelVi: 'Đại từ & Con người' },
  { id: 'cau-hoi', labelVi: 'Từ để hỏi' },
  { id: 'cam-xuc', labelVi: 'Cảm xúc & Trạng thái' },
  { id: 'doi-song', labelVi: 'Sinh hoạt & Ăn uống' },
  { id: 'hanh-dong', labelVi: 'Hành động cơ bản' },
  { id: 'y-te', labelVi: 'Y tế & Khẩn cấp' },
  { id: 'thoi-gian', labelVi: 'Thời gian & Lịch trình' },
  { id: 'dia-diem', labelVi: 'Phương hướng & Địa điểm' },
  { id: 'tinh-chat', labelVi: 'Tính chất & Màu sắc' }
];
