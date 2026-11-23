// @ts-nocheck
// Dynamic Sign Learning & Knowledge Base Engine for ASL & VSL
// Allows the avatar to learn, persist, and execute new signs dynamically
// Integrates with procedural sign generation and custom keyframes

import { generateProceduralKeyframes } from './proceduralSignGenerator';
import { WLASL_SIGN_MAP, WLASL_FRAMES } from './wlaslSigns';

const STORAGE_KEY = 'sign_studio_learned_signs_v2';

// Built-in extended dictionary templates for ASL and VSL
export const BUILTIN_EXTENDED_SIGNS = {
  // ACTIONS
  EAT: {
    words: ['ăn', 'eat', 'ăn cơm', 'eating', 'food'],
    asl: { gloss: 'EAT', duration: 1000, nmm: { smile: 0.3 }, desc: 'Bàn tay chụm đưa vào miệng hai lần' },
    vsl: { gloss: 'ĂN', duration: 1000, nmm: { smile: 0.4 }, desc: 'VSL: Bàn tay chụm các ngón gõ nhẹ hướng vào miệng hai lần' },
    config: { handshape: 'pinch', location: 'mouth', motion: 'tap', twoHanded: false, nmm: { smile: 0.35 } }
  },
  DRINK: {
    words: ['uống', 'drink', 'drinking', 'uống nước'],
    asl: { gloss: 'DRINK', duration: 1000, nmm: { smile: 0.2 }, desc: 'Tay cầm cốc đưa lên miệng nghiêng nhẹ' },
    vsl: { gloss: 'UỐNG', duration: 1000, nmm: { smile: 0.3 }, desc: 'VSL: Bàn tay khum chữ C đưa lên miệng mô phỏng uống nước' },
    config: { handshape: 'cup', location: 'mouth', motion: 'push', twoHanded: false, nmm: { smile: 0.3 } }
  },
  WATER: {
    words: ['nước', 'water'],
    asl: { gloss: 'WATER', duration: 950, nmm: { smile: 0.2 }, desc: 'Tay chữ W chạm cằm hai lần' },
    vsl: { gloss: 'NƯỚC', duration: 950, nmm: { smile: 0.2 }, desc: 'VSL: Ngón tay chạm cằm hoặc vuốt họng nhẹ' },
    config: { handshape: 'point', location: 'chin', motion: 'tap', twoHanded: false, nmm: { smile: 0.2 } }
  },
  FOOD: {
    words: ['thức ăn', 'cơm', 'đồ ăn', 'food', 'meal'],
    asl: { gloss: 'FOOD', duration: 1000, nmm: { smile: 0.3 }, desc: 'Chụm ngón tay chạm môi' },
    vsl: { gloss: 'CƠM / THỨC ĂN', duration: 1000, nmm: { smile: 0.3 }, desc: 'VSL: Tay chụm đưa vào miệng biểu thị cơm, đồ ăn' },
    config: { handshape: 'pinch', location: 'mouth', motion: 'tap', twoHanded: false, nmm: { smile: 0.3 } }
  },
  GO: {
    words: ['đi', 'go', 'đi chơi', 'going', 'rời khỏi'],
    asl: { gloss: 'GO', duration: 900, nmm: { eyebrows: 'neutral' }, desc: 'Hai ngón trỏ cùng vung hướng về phía trước' },
    vsl: { gloss: 'ĐI', duration: 900, nmm: { eyebrows: 'neutral' }, desc: 'VSL: Hai ngón trỏ hoặc bàn tay đẩy thẳng về phía trước' },
    config: { handshape: 'point', location: 'front', motion: 'push', twoHanded: true, nmm: { eyebrows: 'neutral' } }
  },
  COME: {
    words: ['đến', 'tới', 'come', 'coming'],
    asl: { gloss: 'COME', duration: 900, nmm: { smile: 0.3 }, desc: 'Hai ngón trỏ vẫy hướng về phía người nói' },
    vsl: { gloss: 'ĐẾN / TỚI', duration: 900, nmm: { smile: 0.3 }, desc: 'VSL: Hai ngón trỏ hoặc tay vẫy hướng về bản thân' },
    config: { handshape: 'point', location: 'chest', motion: 'pull', twoHanded: true, nmm: { smile: 0.3 } }
  },
  WANT: {
    words: ['muốn', 'want', 'mong muốn', 'cần'],
    asl: { gloss: 'WANT', duration: 950, nmm: { eyebrows: 'raised', smile: 0.3 }, desc: 'Hai bàn tay ngửa co nhẹ kéo về ngực' },
    vsl: { gloss: 'MUỐN', duration: 950, nmm: { eyebrows: 'raised', smile: 0.3 }, desc: 'VSL: Hai bàn tay khum ngửa kéo nhẹ về phía ngực' },
    config: { handshape: 'cup', location: 'chest', motion: 'pull', twoHanded: true, nmm: { eyebrows: 'raised', smile: 0.3 } }
  },
  LIKE: {
    words: ['thích', 'like', 'khoái', 'ưa'],
    asl: { gloss: 'LIKE', duration: 950, nmm: { smile: 0.7 }, desc: 'Ngón cái và giữa từ ngực kéo ra trước' },
    vsl: { gloss: 'THÍCH', duration: 950, nmm: { smile: 0.7 }, desc: 'VSL: Bàn tay vuốt cằm hoặc vuốt nhẹ ngực mỉm cười' },
    config: { handshape: 'flat', location: 'chest', motion: 'brush', twoHanded: false, nmm: { smile: 0.75 } }
  },
  WORK: {
    words: ['làm việc', 'work', 'working', 'làm'],
    asl: { gloss: 'WORK', duration: 1000, nmm: { eyebrows: 'neutral' }, desc: 'Nắm tay phải gõ lên nắm tay trái hai lần' },
    vsl: { gloss: 'LÀM VIỆC', duration: 1000, nmm: { eyebrows: 'neutral' }, desc: 'VSL: Hai nắm tay gõ chéo nhau mô tả công việc' },
    config: { handshape: 'fist', location: 'front', motion: 'tap', twoHanded: true, nmm: { eyebrows: 'neutral' } }
  },
  SLEEP: {
    words: ['ngủ', 'sleep', 'đi ngủ', 'sleeping'],
    asl: { gloss: 'SLEEP', duration: 1000, nmm: { smile: 0.1, headTilt: 0.18 }, desc: 'Tay mở trên trán từ từ khép lại kéo xuống cằm, nghiêng đầu' },
    vsl: { gloss: 'NGỦ', duration: 1000, nmm: { smile: 0.1, headTilt: 0.2 }, desc: 'VSL: Áp bàn tay nghiêng vào một bên má nhắm mắt nhẹ' },
    config: { handshape: 'flat', location: 'chin', motion: 'tap', twoHanded: false, nmm: { headTilt: 0.2, smile: 0.2 } }
  },
  SEE: {
    words: ['xem', 'nhìn', 'thấy', 'see', 'look', 'watch'],
    asl: { gloss: 'SEE', duration: 900, nmm: { eyebrows: 'neutral' }, desc: 'Bàn tay chữ V từ dưới mắt đưa thẳng về trước' },
    vsl: { gloss: 'XEM / NHÌN', duration: 900, nmm: { eyebrows: 'neutral' }, desc: 'VSL: Hai ngón tay trỏ và giữa từ mắt chỉ thẳng về đối tượng' },
    config: { handshape: 'peace', location: 'chin', motion: 'push', twoHanded: false, nmm: { eyebrows: 'neutral' } }
  },
  KNOW: {
    words: ['biết', 'know', 'rõ', 'hiểu rõ'],
    asl: { gloss: 'KNOW', duration: 850, nmm: { headNod: 0.2, smile: 0.4 }, desc: 'Các đầu ngón tay chạm nhẹ lên thái dương gật đầu' },
    vsl: { gloss: 'BIẾT', duration: 850, nmm: { headNod: 0.25, smile: 0.4 }, desc: 'VSL: Ngón trỏ hoặc các đầu ngón tay gõ nhẹ thái dương gật đầu' },
    config: { handshape: 'flat', location: 'forehead', motion: 'tap', twoHanded: false, nmm: { headNod: 0.2, smile: 0.4 } }
  },
  DONT_KNOW: {
    words: ['không biết', 'dont know', 'không rõ', 'chưa biết'],
    asl: { gloss: 'DONT-KNOW', duration: 950, nmm: { headShake: 0.35, eyebrows: 'furrowed' }, desc: 'Tay từ trán vung ra ngoài kết hợp lắc đầu' },
    vsl: { gloss: 'KHÔNG BIẾT', duration: 950, nmm: { headShake: 0.4, eyebrows: 'furrowed' }, desc: 'VSL: Ngón tay chạm thái dương rồi lắc tay ra ngoài phủ định' },
    config: { handshape: 'flat', location: 'forehead', motion: 'wave', twoHanded: false, nmm: { headShake: 0.35, eyebrows: 'furrowed' } }
  },
  THINK: {
    words: ['nghĩ', 'suy nghĩ', 'think', 'thinking'],
    asl: { gloss: 'THINK', duration: 900, nmm: { eyebrows: 'furrowed', headTilt: 0.1 }, desc: 'Ngón trỏ đặt lên trán xoay nhẹ suy nghĩ' },
    vsl: { gloss: 'NGHĨ / SUY NGHĨ', duration: 900, nmm: { eyebrows: 'furrowed', headTilt: 0.1 }, desc: 'VSL: Ngón trỏ chỉ vào thái dương suy nghĩ' },
    config: { handshape: 'point', location: 'forehead', motion: 'rotate', twoHanded: false, nmm: { eyebrows: 'furrowed', headTilt: 0.1 } }
  },
  SORRY: {
    words: ['xin lỗi', 'sorry', 'apologize', 'thứ lỗi'],
    asl: { gloss: 'SORRY', duration: 1100, nmm: { eyebrows: 'furrowed', smile: 0.1, headTilt: 0.08 }, desc: 'Nắm tay chữ A xoa tròn trước ngực với ánh mắt chân thành' },
    vsl: { gloss: 'XIN LỖI', duration: 1100, nmm: { eyebrows: 'furrowed', smile: 0.1, headTilt: 0.08 }, desc: 'VSL: Nắm tay xoay tròn trước ngực hoặc hai tay chắp tạ lỗi' },
    config: { handshape: 'fist', location: 'chest', motion: 'rotate', twoHanded: false, nmm: { eyebrows: 'furrowed', smile: 0.1, headTilt: 0.08 } }
  },

  // PEOPLE & FAMILY
  FAMILY: {
    words: ['gia đình', 'family'],
    asl: { gloss: 'FAMILY', duration: 1200, nmm: { smile: 0.7 }, desc: 'Hai bàn tay chữ F xoay tròn gặp nhau tạo thành vòng gia đình' },
    vsl: { gloss: 'GIA ĐÌNH', duration: 1200, nmm: { smile: 0.7 }, desc: 'VSL: Hai bàn tay ôm vòng tròn trước ngực biểu thị tổ ấm' },
    config: { handshape: 'cup', location: 'front', motion: 'openClose', twoHanded: true, nmm: { smile: 0.7 } }
  },
  FATHER: {
    words: ['bố', 'ba', 'cha', 'father', 'dad'],
    asl: { gloss: 'FATHER', duration: 950, nmm: { smile: 0.5 }, desc: 'Ngón cái bàn tay số 5 chạm trán' },
    vsl: { gloss: 'BỐ / CHA', duration: 950, nmm: { smile: 0.5 }, desc: 'VSL: Ngón cái hoặc ngón trỏ chạm bên thái dương/trán' },
    config: { handshape: 'thumbsUp', location: 'forehead', motion: 'tap', twoHanded: false, nmm: { smile: 0.5 } }
  },
  MOTHER: {
    words: ['mẹ', 'má', 'mother', 'mom'],
    asl: { gloss: 'MOTHER', duration: 950, nmm: { smile: 0.6 }, desc: 'Ngón cái bàn tay số 5 chạm cằm' },
    vsl: { gloss: 'MẸ', duration: 950, nmm: { smile: 0.6 }, desc: 'VSL: Các ngón tay hoặc ngón cái chạm nhẹ má hoặc cằm' },
    config: { handshape: 'flat', location: 'chin', motion: 'tap', twoHanded: false, nmm: { smile: 0.6 } }
  },
  DOCTOR: {
    words: ['bác sĩ', 'bác sỹ', 'doctor', 'thầy thuốc', 'y tá'],
    asl: { gloss: 'DOCTOR', duration: 1000, nmm: { eyebrows: 'neutral' }, desc: 'Hai ngón tay chạm cổ tay kiểm tra mạch' },
    vsl: { gloss: 'BÁC SĨ', duration: 1000, nmm: { eyebrows: 'neutral' }, desc: 'VSL: Ngón trỏ và giữa tay phải gõ nhẹ cổ tay trái bắt mạch' },
    config: { handshape: 'peace', location: 'waist', motion: 'tap', twoHanded: true, nmm: { eyebrows: 'neutral' } }
  },
  TEACHER: {
    words: ['thầy giáo', 'cô giáo', 'giáo viên', 'thầy cô', 'teacher'],
    asl: { gloss: 'TEACHER', duration: 1100, nmm: { smile: 0.4 }, desc: 'Hai tay từ trán đưa ra rồi hạ xuống biểu thị người dạy học' },
    vsl: { gloss: 'THẦY CÔ / GIÁO VIÊN', duration: 1100, nmm: { smile: 0.5 }, desc: 'VSL: Cử chỉ truyền đạt kiến thức từ đầu đưa ra trang trọng' },
    config: { handshape: 'flat', location: 'front', motion: 'push', twoHanded: true, nmm: { smile: 0.4 } }
  },

  // COMMON NOUNS & OBJECTS
  HOUSE: {
    words: ['nhà', 'ngôi nhà', 'house', 'home'],
    asl: { gloss: 'HOUSE', duration: 1050, nmm: { eyebrows: 'neutral' }, desc: 'Hai bàn tay tạo mái nhà nhọn rồi hạ vách nhà' },
    vsl: { gloss: 'NHÀ', duration: 1050, nmm: { eyebrows: 'neutral' }, desc: 'VSL: Hai bàn tay nghiêng chạm đầu ngón tay tạo hình mái nhà' },
    config: { handshape: 'flat', location: 'front', motion: 'openClose', twoHanded: true, nmm: { smile: 0.3 } }
  },
  SCHOOL: {
    words: ['trường học', 'trường', 'school'],
    asl: { gloss: 'SCHOOL', duration: 1000, nmm: { smile: 0.3 }, desc: 'Hai bàn tay vỗ vào nhau hai lần theo chiều ngang' },
    vsl: { gloss: 'TRƯỜNG HỌC', duration: 1000, nmm: { smile: 0.3 }, desc: 'VSL: Hai lòng bàn tay vỗ nhẹ ngang nhau' },
    config: { handshape: 'flat', location: 'front', motion: 'tap', twoHanded: true, nmm: { smile: 0.3 } }
  },
  BOOK: {
    words: ['sách', 'quyển sách', 'book', 'cuốn sách'],
    asl: { gloss: 'BOOK', duration: 950, nmm: { eyebrows: 'neutral' }, desc: 'Hai bàn tay áp vào nhau rồi mở ra như mở sách' },
    vsl: { gloss: 'SÁCH', duration: 950, nmm: { eyebrows: 'neutral' }, desc: 'VSL: Hai lòng bàn tay áp sát mở ra như trang sách' },
    config: { handshape: 'flat', location: 'front', motion: 'openClose', twoHanded: true, nmm: { smile: 0.2 } }
  },
  MONEY: {
    words: ['tiền', 'money', 'giá', 'chi phí'],
    asl: { gloss: 'MONEY', duration: 950, nmm: { smile: 0.3 }, desc: 'Mu bàn tay gõ vào lòng bàn tay kia hoặc vê ngón tay' },
    vsl: { gloss: 'TIỀN', duration: 950, nmm: { smile: 0.3 }, desc: 'VSL: Ngón cái xoa ngón trỏ và giữa biểu thị tiền bạc' },
    config: { handshape: 'pinch', location: 'front', motion: 'rotate', twoHanded: false, nmm: { smile: 0.3 } }
  },
  TIME: {
    words: ['thời gian', 'giờ', 'time', 'lúc'],
    asl: { gloss: 'TIME', duration: 900, nmm: { eyebrows: 'neutral' }, desc: 'Ngón trỏ gõ vào cổ tay nơi đeo đồng hồ' },
    vsl: { gloss: 'THỜI GIAN', duration: 900, nmm: { eyebrows: 'neutral' }, desc: 'VSL: Ngón trỏ tay phải gõ nhẹ cổ tay trái vị trí đồng hồ' },
    config: { handshape: 'point', location: 'waist', motion: 'tap', twoHanded: true, nmm: { eyebrows: 'neutral' } }
  },
  VIETNAM: {
    words: ['việt nam', 'vietnam', 'viet nam'],
    asl: { gloss: 'VIETNAM', duration: 1100, nmm: { smile: 0.7 }, desc: 'Tay chữ V hoặc vẽ hình chữ S' },
    vsl: { gloss: 'VIỆT NAM', duration: 1100, nmm: { smile: 0.8 }, desc: 'VSL: Tay vẽ đường cong chữ S từ ngực xuống biểu tượng dải đất hình chữ S' },
    config: { handshape: 'flat', location: 'chest', motion: 'sCurve', twoHanded: false, nmm: { smile: 0.8 } }
  },

  // QUESTIONS
  WHEN: {
    words: ['khi nào', 'bao giờ', 'when'],
    asl: { gloss: 'WHEN', duration: 950, nmm: { eyebrows: 'furrowed', headTilt: 0.12 }, desc: 'Ngón trỏ xoay một vòng quanh ngón trỏ kia rồi chạm đầu ngón' },
    vsl: { gloss: 'KHI NÀO / BAO GIỜ', duration: 950, nmm: { eyebrows: 'furrowed', headTilt: 0.12 }, desc: 'VSL: Ngón tay chỉ cổ tay hoặc lắc hỏi thời điểm' },
    config: { handshape: 'point', location: 'front', motion: 'rotate', twoHanded: false, nmm: { eyebrows: 'furrowed', headTilt: 0.12 } }
  },
  WHERE: {
    words: ['ở đâu', 'đâu', 'nơi nào', 'chỗ nào', 'where'],
    asl: { gloss: 'WHERE', duration: 950, nmm: { eyebrows: 'furrowed', headTilt: 0.12 }, desc: 'Ngón trỏ lắc qua lại hoặc hai lòng bàn tay ngửa lắc hỏi vị trí' },
    vsl: { gloss: 'Ở ĐÂU', duration: 950, nmm: { eyebrows: 'furrowed', headTilt: 0.12 }, desc: 'VSL: Hai lòng bàn tay ngửa mở rộng lắc nhẹ hỏi nơi chốn' },
    config: { handshape: 'flat', location: 'front', motion: 'shake', twoHanded: true, nmm: { eyebrows: 'furrowed', headTilt: 0.12 } }
  },
  WHY: {
    words: ['tại sao', 'sao', 'vì sao', 'why'],
    asl: { gloss: 'WHY', duration: 950, nmm: { eyebrows: 'furrowed', headTilt: 0.1 }, desc: 'Tay từ trán hạ xuống tạo chữ Y hỏi lý do' },
    vsl: { gloss: 'TẠI SAO / VÌ SAO', duration: 950, nmm: { eyebrows: 'furrowed', headTilt: 0.1 }, desc: 'VSL: Ngón trỏ từ thái dương vẩy ra trước với vẻ thắc mắc' },
    config: { handshape: 'point', location: 'forehead', motion: 'push', twoHanded: false, nmm: { eyebrows: 'furrowed', headTilt: 0.1 } }
  },
  WHO: {
    words: ['ai', 'người nào', 'who'],
    asl: { gloss: 'WHO', duration: 950, nmm: { eyebrows: 'furrowed', mouthOpen: 0.15 }, desc: 'Ngón cái đặt ở cằm, ngón trỏ cong lại co duỗi hỏi ai' },
    vsl: { gloss: 'AI', duration: 950, nmm: { eyebrows: 'furrowed', mouthOpen: 0.15 }, desc: 'VSL: Ngón trỏ vẽ vòng tròn nhỏ quanh cằm hoặc chỉ hỏi' },
    config: { handshape: 'point', location: 'chin', motion: 'rotate', twoHanded: false, nmm: { eyebrows: 'furrowed', mouthOpen: 0.15 } }
  },
  HOW_MUCH: {
    words: ['bao nhiêu', 'giá bao nhiêu', 'how much', 'how many'],
    asl: { gloss: 'HOW-MUCH', duration: 950, nmm: { eyebrows: 'furrowed', headTilt: 0.12 }, desc: 'Hai bàn tay mở bung lên hỏi số lượng' },
    vsl: { gloss: 'BAO NHIÊU', duration: 950, nmm: { eyebrows: 'furrowed', headTilt: 0.12 }, desc: 'VSL: Các ngón tay vê xoa nhẹ hoặc hai tay bung ngửa hỏi giá/số lượng' },
    config: { handshape: 'pinch', location: 'front', motion: 'shake', twoHanded: true, nmm: { eyebrows: 'furrowed', headTilt: 0.12 } }
  },

  // STATES & ADJECTIVES
  BEAUTIFUL: {
    words: ['đẹp', 'xinh', 'xinh đẹp', 'beautiful', 'pretty'],
    asl: { gloss: 'BEAUTIFUL', duration: 1100, nmm: { smile: 0.85, eyebrows: 'raised' }, desc: 'Bàn tay mở xoay tròn quanh khuôn mặt rồi chụm lại' },
    vsl: { gloss: 'ĐẸP / XINH', duration: 1100, nmm: { smile: 0.85, eyebrows: 'raised' }, desc: 'VSL: Bàn tay vuốt nhẹ quanh má hoặc vuốt cằm khen ngợi' },
    config: { handshape: 'flat', location: 'chin', motion: 'brush', twoHanded: false, nmm: { smile: 0.85, eyebrows: 'raised' } }
  },
  TIRED: {
    words: ['mệt', 'mệt mỏi', 'tired', 'exhausted'],
    asl: { gloss: 'TIRED', duration: 1000, nmm: { eyebrows: 'furrowed', smile: 0.0, headTilt: 0.08 }, desc: 'Hai bàn tay khum đặt trước ngực rồi rũ xuống' },
    vsl: { gloss: 'MỆT', duration: 1000, nmm: { eyebrows: 'furrowed', smile: 0.0, headTilt: 0.1 }, desc: 'VSL: Hai tay buông rũ nhẹ trước ngực thở dài' },
    config: { handshape: 'cup', location: 'chest', motion: 'pull', twoHanded: true, nmm: { eyebrows: 'furrowed', smile: 0.0, headTilt: 0.1 } }
  },
  HOT: {
    words: ['nóng', 'hot', 'nóng nực'],
    asl: { gloss: 'HOT', duration: 900, nmm: { smile: 0.0, mouthOpen: 0.2 }, desc: 'Tay chữ C ở miệng ném nhanh ra ngoài' },
    vsl: { gloss: 'NÓNG', duration: 900, nmm: { mouthOpen: 0.2 }, desc: 'VSL: Bàn tay quạt nhẹ trước mặt hoặc lau mồ hôi trán' },
    config: { handshape: 'flat', location: 'forehead', motion: 'wave', twoHanded: false, nmm: { mouthOpen: 0.2 } }
  },
  COLD: {
    words: ['lạnh', 'cold', 'lạnh buốt'],
    asl: { gloss: 'COLD', duration: 1000, nmm: { eyebrows: 'furrowed' }, desc: 'Hai nắm tay run rẩy trước ngực' },
    vsl: { gloss: 'LẠNH', duration: 1000, nmm: { eyebrows: 'furrowed' }, desc: 'VSL: Hai tay ôm ngực co ro run nhẹ vì lạnh' },
    config: { handshape: 'fist', location: 'chest', motion: 'shake', twoHanded: true, nmm: { eyebrows: 'furrowed' } }
  },
  STOP: {
    words: ['dừng', 'dừng lại', 'stop', 'ngừng'],
    asl: { gloss: 'STOP', duration: 850, nmm: { eyebrows: 'furrowed' }, desc: 'Cạnh bàn tay phải chặt dứt khoát vào lòng bàn tay trái' },
    vsl: { gloss: 'DỪNG LẠI', duration: 850, nmm: { eyebrows: 'furrowed' }, desc: 'VSL: Bàn tay giơ thẳng đứng chắn phía trước ngăn lại' },
    config: { handshape: 'flat', location: 'front', motion: 'push', twoHanded: false, nmm: { eyebrows: 'furrowed' } }
  },
  HOSPITAL: {
    words: ['bệnh viện', 'nhà thương', 'viện', 'hospital'],
    asl: { gloss: 'HOSPITAL', duration: 1000, nmm: { eyebrows: 'neutral' }, desc: 'Vẽ chữ thập chữ H trên bắp tay' },
    vsl: { gloss: 'BỆNH VIỆN', duration: 1000, nmm: { eyebrows: 'neutral' }, desc: 'VSL: Hai ngón tay tạo chữ thập cứu thương hoặc chỉ vị trí bệnh viện' },
    config: { handshape: 'peace', location: 'chest', motion: 'tap', twoHanded: true, nmm: { eyebrows: 'neutral' } }
  },
  PHARMACY: {
    words: ['tiệm thuốc', 'nhà thuốc', 'thuốc', 'pharmacy', 'medicine'],
    asl: { gloss: 'MEDICINE', duration: 950, nmm: { smile: 0.2 }, desc: 'Ngón giữa xoay trong lòng bàn tay nghiền thuốc' },
    vsl: { gloss: 'THUỐC / TIỆM THUỐC', duration: 950, nmm: { smile: 0.2 }, desc: 'VSL: Ngón tay mô phỏng viên thuốc uống hoặc nghiền thuốc' },
    config: { handshape: 'pinch', location: 'mouth', motion: 'tap', twoHanded: false, nmm: { smile: 0.2 } }
  },
  POLICE: {
    words: ['công an', 'cảnh sát', 'police'],
    asl: { gloss: 'POLICE', duration: 1000, nmm: { eyebrows: 'neutral' }, desc: 'Tay chữ C chạm ngực trái biểu tượng huy hiệu cảnh sát' },
    vsl: { gloss: 'CÔNG AN / CẢNH SÁT', duration: 1000, nmm: { eyebrows: 'neutral' }, desc: 'VSL: Tay chữ C chạm ngực biểu thị phù hiệu công an' },
    config: { handshape: 'cup', location: 'chest', motion: 'tap', twoHanded: false, nmm: { eyebrows: 'neutral' } }
  },
  STUDENT: {
    words: ['học sinh', 'sinh viên', 'người học', 'student'],
    asl: { gloss: 'STUDENT', duration: 1100, nmm: { smile: 0.4 }, desc: 'Ký hiệu học rồi hạ hai tay biểu thị người học' },
    vsl: { gloss: 'HỌC SINH / SINH VIÊN', duration: 1100, nmm: { smile: 0.4 }, desc: 'VSL: Cử chỉ học tập và khoác cặp sách' },
    config: { handshape: 'flat', location: 'front', motion: 'openClose', twoHanded: true, nmm: { smile: 0.4 } }
  },
  BROTHER: {
    words: ['anh', 'anh trai', 'em trai', 'brother'],
    asl: { gloss: 'BROTHER', duration: 1000, nmm: { smile: 0.4 }, desc: 'Tay từ trán hạ xuống chạm tay kia biểu thị anh em trai' },
    vsl: { gloss: 'ANH / EM TRAI', duration: 1000, nmm: { smile: 0.4 }, desc: 'VSL: Ngón tay trỏ hoặc cái đưa từ thái dương ra trước' },
    config: { handshape: 'thumbsUp', location: 'forehead', motion: 'push', twoHanded: false, nmm: { smile: 0.4 } }
  },
  SISTER: {
    words: ['chị', 'chị gái', 'em gái', 'sister'],
    asl: { gloss: 'SISTER', duration: 1000, nmm: { smile: 0.5 }, desc: 'Tay từ cằm hạ xuống chạm tay kia biểu thị chị em gái' },
    vsl: { gloss: 'CHỊ / EM GÁI', duration: 1000, nmm: { smile: 0.5 }, desc: 'VSL: Bàn tay vuốt cằm hoặc má đưa ra trước' },
    config: { handshape: 'flat', location: 'chin', motion: 'push', twoHanded: false, nmm: { smile: 0.5 } }
  },
  WELCOME: {
    words: ['chào mừng', 'hoan nghênh', 'welcome'],
    asl: { gloss: 'WELCOME', duration: 1000, nmm: { smile: 0.8 }, desc: 'Hai tay mở rộng đón chào' },
    vsl: { gloss: 'CHÀO MỪNG', duration: 1000, nmm: { smile: 0.8 }, desc: 'Hai tay mở rộng đón chào' },
    config: { handshape: 'flat', location: 'front', motion: 'openClose', twoHanded: true, nmm: { smile: 0.8 } }
  },
  LEARN: {
    words: ['học', 'học tập', 'learn', 'học bài'],
    asl: { gloss: 'LEARN', duration: 1000, nmm: { smile: 0.3 }, desc: 'Lấy kiến thức từ lòng bàn tay đưa lên trán' },
    vsl: { gloss: 'HỌC', duration: 1000, nmm: { smile: 0.3 }, desc: 'Bốc kiến thức từ bàn tay đưa lên thái dương' },
    config: { handshape: 'flat', location: 'forehead', motion: 'tap', twoHanded: false, nmm: { smile: 0.3 } }
  },
  SIGN_LANGUAGE: {
    words: ['ngôn ngữ ký hiệu', 'thủ ngữ', 'sign language'],
    asl: { gloss: 'SIGN-LANGUAGE', duration: 1200, nmm: { smile: 0.5 }, desc: 'Hai tay vẫy và xoay tròn biểu diễn ký hiệu' },
    vsl: { gloss: 'NGÔN NGỮ KÝ HIỆU', duration: 1200, nmm: { smile: 0.5 }, desc: 'Hai tay vẫy và xoay tròn biểu diễn ký hiệu' },
    config: { handshape: 'flat', location: 'front', motion: 'openClose', twoHanded: true, nmm: { smile: 0.5 } }
  },
  SIGN_LANG: {
    words: ['ngôn ngữ ký hiệu', 'thủ ngữ', 'sign language'],
    asl: { gloss: 'SIGN-LANGUAGE', duration: 1100, nmm: { smile: 0.6 }, desc: 'Hai bàn tay số 1 xoay vòng tròn trước ngực' },
    vsl: { gloss: 'NGÔN NGỮ KÝ HIỆU', duration: 1100, nmm: { smile: 0.7 }, desc: 'VSL: Hai bàn tay mở uyển chuyển trước ngực mô tả ký hiệu' },
    config: { handshape: 'flat', location: 'front', motion: 'openClose', twoHanded: true, nmm: { smile: 0.6 } }
  },
  TOMORROW: {
    words: ['ngày mai', 'mai', 'tomorrow'],
    asl: { gloss: 'TOMORROW', duration: 900, nmm: { smile: 0.3 }, desc: 'Ngón cái chữ A từ cằm xoay đẩy ra trước' },
    vsl: { gloss: 'NGÀY MAI', duration: 900, nmm: { smile: 0.3 }, desc: 'VSL: Ngón tay từ cằm/gò má đẩy hướng về phía trước' },
    config: { handshape: 'thumbsUp', location: 'chin', motion: 'push', twoHanded: false, nmm: { smile: 0.3 } }
  },
  YESTERDAY: {
    words: ['hôm qua', 'qua', 'yesterday'],
    asl: { gloss: 'YESTERDAY', duration: 900, nmm: { smile: 0.2 }, desc: 'Ngón cái chữ A từ cằm kéo ngược về sau tai' },
    vsl: { gloss: 'HÔM QUA', duration: 900, nmm: { smile: 0.2 }, desc: 'VSL: Ngón tay từ má trỏ ngược về phía sau vai' },
    config: { handshape: 'thumbsUp', location: 'chin', motion: 'pull', twoHanded: false, nmm: { smile: 0.2 } }
  },
  NOW: {
    words: ['bây giờ', 'ngay bây giờ', 'hiện tại', 'now'],
    asl: { gloss: 'NOW', duration: 850, nmm: { eyebrows: 'neutral' }, desc: 'Hai bàn tay chữ Y nhấn nhẹ xuống' },
    vsl: { gloss: 'BÂY GIỜ / HIỆN TẠI', duration: 850, nmm: { eyebrows: 'neutral' }, desc: 'VSL: Hai bàn tay khum nhấn nhẹ xuống trước ngực biểu thị hiện tại' },
    config: { handshape: 'cup', location: 'front', motion: 'tap', twoHanded: true, nmm: { eyebrows: 'neutral' } }
  },
  PAIN: {
    words: ['đau', 'nhức', 'bệnh', 'ốm', 'pain', 'hurt', 'sick'],
    asl: { gloss: 'PAIN', duration: 950, nmm: { smile: 0.0, eyebrows: 'furrowed' }, desc: 'Hai ngón trỏ xoay hướng vào nhau mô tả cơn đau' },
    vsl: { gloss: 'ĐAU / BỆNH', duration: 950, nmm: { smile: 0.0, eyebrows: 'furrowed' }, desc: 'VSL: Bàn tay ôm ngực hoặc trán nhăn mặt đau đớn' },
    config: { handshape: 'point', location: 'chest', motion: 'rotate', twoHanded: false, nmm: { smile: 0.0, eyebrows: 'furrowed' } }
  },
  SAD: {
    words: ['buồn', 'buồn bã', 'sad', 'unhappy'],
    asl: { gloss: 'SAD', duration: 1000, nmm: { smile: 0.0, eyebrows: 'furrowed', headTilt: 0.1 }, desc: 'Hai bàn tay từ từ hạ xuống khuôn mặt rầu rĩ' },
    vsl: { gloss: 'BUỒN', duration: 1000, nmm: { smile: 0.0, eyebrows: 'furrowed', headTilt: 0.1 }, desc: 'VSL: Vuốt nhẹ mặt cúi đầu buồn bã' },
    config: { handshape: 'flat', location: 'chin', motion: 'pull', twoHanded: false, nmm: { smile: 0.0, eyebrows: 'furrowed', headTilt: 0.1 } }
  },
  CONGRATS: {
    words: ['chúc mừng', 'khen', 'congratulations', 'khen ngợi'],
    asl: { gloss: 'CONGRATULATIONS', duration: 1100, nmm: { smile: 0.85, eyebrows: 'raised' }, desc: 'Vỗ tay giơ cao hoặc vẫy hai bàn tay chúc mừng' },
    vsl: { gloss: 'CHÚC MỪNG', duration: 1100, nmm: { smile: 0.85, eyebrows: 'raised' }, desc: 'VSL: Hai tay giơ cao vẫy xoay tròn chúc mừng' },
    config: { handshape: 'flat', location: 'front', motion: 'wave', twoHanded: true, nmm: { smile: 0.85, eyebrows: 'raised' } }
  }
};

/**
 * Sign Learner & Knowledge Base Manager
 */
export class SignLearner {
  constructor() {
    this.learnedSigns = this.loadFromStorage();
    this.cacheKeyframes = new Map();
  }

  loadFromStorage() {
    try {
      if (typeof localStorage === 'undefined') return {};
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  saveToStorage() {
    try {
      if (typeof localStorage === 'undefined') return;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.learnedSigns));
    } catch (e) {
    }
  }

  /**
   * Registers or updates a newly learned sign
   * @param {Object} signData
   */
  teachSign(signData) {
    if (!signData || !signData.word) throw new Error('Cần nhập từ ngữ cho ký hiệu.');
    const key = signData.key || signData.word.trim().toUpperCase().replace(/[\s-]+/g, '_');
    const signLang = signData.signLang || 'vsl';

    const entry = {
      key,
      word: signData.word.trim().toLowerCase(),
      signLang,
      gloss: (signData.gloss || signData.word).trim().toUpperCase(),
      desc: signData.desc || `Ký hiệu tự học: ${signData.word}`,
      duration: signData.duration || 1000,
      config: signData.config || {
        handshape: signData.handshape || 'flat',
        location: signData.location || 'chest',
        motion: signData.motion || 'push',
        twoHanded: !!signData.twoHanded,
        nmm: signData.nmm || { smile: 0.4 }
      },
      createdAt: Date.now()
    };

    this.learnedSigns[key] = entry;
    this.saveToStorage();
    this.cacheKeyframes.delete(key);
    return entry;
  }

  /**
   * Automatically synthesizes a plausible procedural sign for any unknown word
   * @param {string} word
   * @param {string} signLang
   */
  autoSynthesize(word, signLang = 'vsl') {
    if (!word) return null;
    const clean = word.toLowerCase().trim();

    // Semantic heuristics
    let handshape = 'flat';
    let location = 'front';
    let motion = 'push';
    let twoHanded = false;
    let nmm = { smile: 0.3 };

    if (/ăn|uống|món|bánh|cơm|trái|uong|an|food|eat|drink|tea|coffee/.test(clean)) {
      handshape = 'pinch'; location = 'mouth'; motion = 'tap';
    } else if (/nghĩ|biết|học|thông minh|não|hiểu|nhớ|quên|think|know|learn/.test(clean)) {
      handshape = 'point'; location = 'forehead'; motion = 'tap'; nmm = { headTilt: 0.1 };
    } else if (/yêu|thương|thích|vui|buồn|tâm|lòng|love|like|heart|feel/.test(clean)) {
      handshape = 'flat'; location = 'chest'; motion = 'brush'; nmm = { smile: 0.8 };
    } else if (/nói|chuyện|bảo|hỏi|kể|speak|talk|tell|say/.test(clean)) {
      handshape = 'point'; location = 'chin'; motion = 'push';
    } else if (/gì|đâu|sao|ai|nào|mấy|what|where|why|who|how/.test(clean)) {
      handshape = 'flat'; location = 'front'; motion = 'shake'; nmm = { eyebrows: 'furrowed' }; twoHanded = true;
    } else if (/nhà|phòng|trường|cửa|bàn|house|room|door|table/.test(clean)) {
      handshape = 'flat'; location = 'front'; motion = 'openClose'; twoHanded = true;
    } else if (/dừng|ngừng|cấm|không|stop|no/.test(clean)) {
      handshape = 'flat'; location = 'front'; motion = 'push'; nmm = { headShake: 0.3 };
    } else if (/đi|tới|đến|chạy|bước|go|come|run/.test(clean)) {
      handshape = 'point'; location = 'front'; motion = 'push'; twoHanded = true;
    }

    const key = `LEARNED_${clean.toUpperCase().replace(/[\s-]+/g, '_')}`;
    return {
      key,
      word: clean,
      signLang,
      gloss: clean.toUpperCase(),
      desc: `Ký hiệu tự động suy diễn cho: ${clean}`,
      duration: 1000,
      config: { handshape, location, motion, twoHanded, nmm }
    };
  }

  deleteSign(key) {
    if (this.learnedSigns[key]) {
      delete this.learnedSigns[key];
      this.saveToStorage();
      this.cacheKeyframes.delete(key);
      return true;
    }
    return false;
  }

  getAllLearned() {
    return Object.values(this.learnedSigns);
  }

  /**
   * Resolves keyframes for a token key, checking learned signs, built-ins, or auto-synthesis
   */
  resolveFrames(key, signLang = 'asl') {
    if (this.cacheKeyframes.has(key)) return this.cacheKeyframes.get(key);

    // 1. Check custom learned signs in localStorage
    if (this.learnedSigns[key]) {
      const entry = this.learnedSigns[key];
      const frames = generateProceduralKeyframes(entry.config);
      this.cacheKeyframes.set(key, frames);
      return frames;
    }

    // 2. Check built-in extended signs
    if (BUILTIN_EXTENDED_SIGNS[key]) {
      const entry = BUILTIN_EXTENDED_SIGNS[key];
      const frames = generateProceduralKeyframes(entry.config);
      this.cacheKeyframes.set(key, frames);
      return frames;
    }

    // 3. Check WLASL Core 150 elite signs
    if (WLASL_SIGN_MAP[key]) {
      const entry = WLASL_SIGN_MAP[key];
      const frames = WLASL_FRAMES[key] || generateProceduralKeyframes({
        handshape: entry.config.handshape,
        location: entry.config.location,
        motion: entry.config.motion,
        twoHanded: entry.config.twoHanded,
        nmm: entry.nmm
      });
      this.cacheKeyframes.set(key, frames);
      return frames;
    }

    return null;
  }

  exportJson() {
    return JSON.stringify(this.learnedSigns, null, 2);
  }

  importJson(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (typeof parsed !== 'object' || parsed === null) throw new Error('Dữ liệu JSON không hợp lệ.');
      this.learnedSigns = { ...this.learnedSigns, ...parsed };
      this.saveToStorage();
      this.cacheKeyframes.clear();
      return Object.keys(parsed).length;
    } catch (e) {
      throw new Error(`Nhập dữ liệu thất bại: ${e.message}`);
    }
  }
}

export const signLearnerInstance = new SignLearner();
