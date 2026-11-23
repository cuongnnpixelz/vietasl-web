// @ts-nocheck
/**
 * WLASL Core 150 Elite Gesture Lexicon for ASL & VSL
 * Sourced directly from WLASL (Word-Level American Sign Language) Core Matrix
 * Covers 150 daily vocabulary signs across 10 vital life categories.
 * 
 * Each sign provides:
 * - Canonical ASL gloss
 * - Vietnamese meaning and anatomical execution description
 * - Non-Manual Markers (NMM: eyebrows, smile, headTilt, headNod, headShake)
 * - Procedural kinematic solver parameters (handshape, location, motion, twoHanded)
 * - Keyframes ready for Three.js AnimationClip synthesis
 */

import { generateProceduralKeyframes } from './proceduralSignGenerator';

export interface WLASLSignDefinition {
  key: string;
  gloss: string;
  category: string;
  categoryIndex: number;
  meaningVi: string;
  descriptionVi: string;
  synonyms: string[];
  duration: number;
  nmm: {
    smile?: number;
    eyebrows?: 'neutral' | 'raised' | 'furrowed';
    headTilt?: number;
    headNod?: number;
    headShake?: number;
    mouthOpen?: number;
  };
  config: {
    handshape: 'flat' | 'fist' | 'point' | 'peace' | 'cup' | 'pinch' | 'thumbsUp' | 'yShape' | 'cShape' | 'hShape';
    location: 'chest' | 'chin' | 'mouth' | 'forehead' | 'front' | 'waist';
    motion: 'tap' | 'wave' | 'push' | 'pull' | 'rotate' | 'cross' | 'brush' | 'nod' | 'shake' | 'sCurve' | 'openClose';
    twoHanded: boolean;
  };
  ikTarget?: {
    right?: [number, number, number];
    left?: [number, number, number];
    rRotation?: [number, number, number];
    lRotation?: [number, number, number];
  };
}

export const WLASL_CATEGORIES = [
  { index: 1, nameVi: 'Chào hỏi, Lịch sự & Xã giao', nameEn: 'Greetings & Courtesy', count: 15 },
  { index: 2, nameVi: 'Đại từ & Con người', nameEn: 'Pronouns & People', count: 15 },
  { index: 3, nameVi: 'Từ để hỏi', nameEn: 'Question Words', count: 10 },
  { index: 4, nameVi: 'Cảm xúc & Trạng thái', nameEn: 'Emotions & Physical States', count: 18 },
  { index: 5, nameVi: 'Sinh hoạt & Ăn uống', nameEn: 'Daily Life & Dining', count: 18 },
  { index: 6, nameVi: 'Hành động cơ bản', nameEn: 'Essential Actions', count: 22 },
  { index: 7, nameVi: 'Y tế, Khẩn cấp & An toàn', nameEn: 'Health & Emergency', count: 12 },
  { index: 8, nameVi: 'Thời gian & Lịch trình', nameEn: 'Time & Calendar', count: 16 },
  { index: 9, nameVi: 'Phương hướng & Địa điểm', nameEn: 'Directions & Places', count: 12 },
  { index: 10, nameVi: 'Tính chất & Màu sắc', nameEn: 'Qualities & Colors', count: 12 }
];

export const WLASL_150_SIGNS: WLASLSignDefinition[] = [
  // ==========================================
  // NHÓM 1: Chào hỏi, Lịch sự & Xã giao (15 từ)
  // ==========================================
  {
    key: 'HELLO',
    gloss: 'HELLO',
    category: 'Chào hỏi, Lịch sự & Xã giao',
    categoryIndex: 1,
    meaningVi: 'Xin chào',
    descriptionVi: 'Bàn tay phẳng B chạm thái dương đưa dứt khoát ra ngoài chào đón',
    synonyms: ['hello', 'hi', 'xin chào', 'chào', 'chào bạn', 'greetings', 'hey'],
    duration: 1100,
    nmm: { smile: 0.8, eyebrows: 'neutral', headTilt: 0.06 },
    config: { handshape: 'flat', location: 'forehead', motion: 'push', twoHanded: false }
  },
  {
    key: 'GOODBYE',
    gloss: 'GOODBYE',
    category: 'Chào hỏi, Lịch sự & Xã giao',
    categoryIndex: 1,
    meaningVi: 'Tạm biệt',
    descriptionVi: 'Mở lòng bàn tay hướng về trước, vẫy 4 ngón tay gập mở chào tạm biệt',
    synonyms: ['goodbye', 'bye', 'tạm biệt', 'chào tạm biệt', 'farewell'],
    duration: 1000,
    nmm: { smile: 0.6, eyebrows: 'neutral', headTilt: 0.04 },
    config: { handshape: 'flat', location: 'front', motion: 'wave', twoHanded: false }
  },
  {
    key: 'THANK_YOU',
    gloss: 'THANK-YOU',
    category: 'Chào hỏi, Lịch sự & Xã giao',
    categoryIndex: 1,
    meaningVi: 'Cảm ơn',
    descriptionVi: 'Các đầu ngón tay chạm cằm/môi dưới rồi mở thẳng về phía trước bày tỏ lòng biết ơn',
    synonyms: ['thank you', 'thank', 'thanks', 'cảm ơn', 'cám ơn', 'xin cảm ơn', 'đa tạ'],
    duration: 1000,
    nmm: { smile: 0.85, eyebrows: 'neutral', headTilt: 0.08, headNod: 0.15 },
    config: { handshape: 'flat', location: 'chin', motion: 'push', twoHanded: false }
  },
  {
    key: 'PLEASE',
    gloss: 'PLEASE',
    category: 'Chào hỏi, Lịch sự & Xã giao',
    categoryIndex: 1,
    meaningVi: 'Làm ơn / Xin vui lòng',
    descriptionVi: 'Lòng bàn tay phẳng xoa tròn theo chiều kim đồng hồ giữa ngực',
    synonyms: ['please', 'làm ơn', 'xin vui lòng', 'xin', 'vui lòng'],
    duration: 1100,
    nmm: { smile: 0.35, eyebrows: 'raised', headTilt: 0.08 },
    config: { handshape: 'flat', location: 'chest', motion: 'rotate', twoHanded: false }
  },
  {
    key: 'SORRY',
    gloss: 'SORRY',
    category: 'Chào hỏi, Lịch sự & Xã giao',
    categoryIndex: 1,
    meaningVi: 'Xin lỗi',
    descriptionVi: 'Nắm tay chữ A xoa tròn trước ngực kết hợp vẻ mặt hối lỗi',
    synonyms: ['sorry', 'xin lỗi', 'xin tha lỗi', 'thứ lỗi', 'apologize'],
    duration: 1100,
    nmm: { smile: 0.05, eyebrows: 'furrowed', headTilt: 0.1, headNod: 0.12 },
    config: { handshape: 'fist', location: 'chest', motion: 'rotate', twoHanded: false }
  },
  {
    key: 'WELCOME',
    gloss: 'WELCOME',
    category: 'Chào hỏi, Lịch sự & Xã giao',
    categoryIndex: 1,
    meaningVi: 'Không có gì / Hoan nghênh',
    descriptionVi: 'Bàn tay ngửa từ ngoài kéo nhẹ về phía thân mình đón nhận thân thiện',
    synonyms: ['welcome', 'không có gì', 'chào mừng', 'hoan nghênh', 'you are welcome', 'youre welcome'],
    duration: 1000,
    nmm: { smile: 0.8, eyebrows: 'neutral', headTilt: 0.05 },
    config: { handshape: 'flat', location: 'chest', motion: 'pull', twoHanded: false }
  },
  {
    key: 'EXCUSE_ME',
    gloss: 'EXCUSE-ME',
    category: 'Chào hỏi, Lịch sự & Xã giao',
    categoryIndex: 1,
    meaningVi: 'Xin phép / Cho hỏi',
    descriptionVi: 'Các đầu ngón tay phải vuốt nhẹ trên lòng bàn tay trái 2 lần xin phép',
    synonyms: ['excuse me', 'xin phép', 'cho hỏi', 'làm phiền', 'cho tôi hỏi'],
    duration: 1050,
    nmm: { smile: 0.4, eyebrows: 'raised', headTilt: 0.06 },
    config: { handshape: 'flat', location: 'front', motion: 'brush', twoHanded: true }
  },
  {
    key: 'NICE',
    gloss: 'NICE',
    category: 'Chào hỏi, Lịch sự & Xã giao',
    categoryIndex: 1,
    meaningVi: 'Tốt lành / Rất vui',
    descriptionVi: 'Lòng bàn tay phải trượt phẳng trên lòng bàn tay trái từ cổ tay ra đầu ngón',
    synonyms: ['nice', 'tốt lành', 'rất vui', 'tuyệt vời', 'dễ thương'],
    duration: 950,
    nmm: { smile: 0.75, eyebrows: 'neutral', headNod: 0.1 },
    config: { handshape: 'flat', location: 'front', motion: 'brush', twoHanded: true }
  },
  {
    key: 'MEET',
    gloss: 'MEET',
    category: 'Chào hỏi, Lịch sự & Xã giao',
    categoryIndex: 1,
    meaningVi: 'Gặp gỡ',
    descriptionVi: 'Hai ngón trỏ dựng đứng di chuyển lại gần nhau đến khi chạm nhẹ',
    synonyms: ['meet', 'meeting', 'gặp', 'gặp gỡ', 'hân hạnh gặp', 'hội ngộ'],
    duration: 1000,
    nmm: { smile: 0.7, eyebrows: 'neutral' },
    config: { handshape: 'point', location: 'front', motion: 'pull', twoHanded: true }
  },
  {
    key: 'NAME',
    gloss: 'NAME',
    category: 'Chào hỏi, Lịch sự & Xã giao',
    categoryIndex: 1,
    meaningVi: 'Tên',
    descriptionVi: 'Hai ngón tay chữ H gõ chéo 2 lần lên nhau trước ngực',
    synonyms: ['name', 'tên', 'tên là', 'danh tính'],
    duration: 950,
    nmm: { smile: 0.3, eyebrows: 'neutral' },
    config: { handshape: 'hShape', location: 'front', motion: 'tap', twoHanded: true }
  },
  {
    key: 'YES',
    gloss: 'YES',
    category: 'Chào hỏi, Lịch sự & Xã giao',
    categoryIndex: 1,
    meaningVi: 'Có / Đúng / Vâng',
    descriptionVi: 'Nắm đấm chữ S gật lên xuống 2 lần như động tác gật đầu xác nhận',
    synonyms: ['yes', 'có', 'vâng', 'dạ', 'đúng', 'ừ', 'đồng ý', 'chính xác'],
    duration: 900,
    nmm: { smile: 0.6, eyebrows: 'neutral', headNod: 0.35 },
    config: { handshape: 'fist', location: 'front', motion: 'nod', twoHanded: false }
  },
  {
    key: 'NO',
    gloss: 'NO',
    category: 'Chào hỏi, Lịch sự & Xã giao',
    categoryIndex: 1,
    meaningVi: 'Không / Sai',
    descriptionVi: 'Ngón trỏ và ngón giữa chụm nhanh chạm vào ngón cái dứt khoát',
    synonyms: ['no', 'không', 'sai', 'chẳng', 'chưa', 'không phải', 'từ chối'],
    duration: 850,
    nmm: { smile: 0.0, eyebrows: 'furrowed', headShake: 0.35 },
    config: { handshape: 'pinch', location: 'front', motion: 'tap', twoHanded: false }
  },
  {
    key: 'MAYBE',
    gloss: 'MAYBE',
    category: 'Chào hỏi, Lịch sự & Xã giao',
    categoryIndex: 1,
    meaningVi: 'Có thể / Có lẽ',
    descriptionVi: 'Hai bàn tay ngửa nhấp nhô luân phiên như cái cân đong đếm khả năng',
    synonyms: ['maybe', 'perhaps', 'có thể', 'có lẽ', 'chắc là'],
    duration: 1000,
    nmm: { smile: 0.2, eyebrows: 'raised', headTilt: 0.1 },
    config: { handshape: 'flat', location: 'front', motion: 'wave', twoHanded: true }
  },
  {
    key: 'AGAIN',
    gloss: 'AGAIN',
    category: 'Chào hỏi, Lịch sự & Xã giao',
    categoryIndex: 1,
    meaningVi: 'Lặp lại / Lần nữa',
    descriptionVi: 'Bàn tay phải cong gập chạm vào lòng bàn tay trái đang ngửa',
    synonyms: ['again', 'repeat', 'lặp lại', 'lần nữa', 'nhắc lại', 'lại'],
    duration: 950,
    nmm: { smile: 0.3, eyebrows: 'raised', headNod: 0.15 },
    config: { handshape: 'cup', location: 'front', motion: 'tap', twoHanded: true }
  },
  {
    key: 'UNDERSTAND',
    gloss: 'UNDERSTAND',
    category: 'Chào hỏi, Lịch sự & Xã giao',
    categoryIndex: 1,
    meaningVi: 'Hiểu rồi',
    descriptionVi: 'Ngón trỏ búng thẳng lên gần thái dương như bóng đèn bật sáng',
    synonyms: ['understand', 'hiểu', 'hiểu rồi', 'rõ', 'đã hiểu'],
    duration: 1000,
    nmm: { smile: 0.6, eyebrows: 'raised', headNod: 0.25 },
    config: { handshape: 'point', location: 'forehead', motion: 'push', twoHanded: false }
  },

  // ==========================================
  // NHÓM 2: Đại từ & Con người (15 từ)
  // ==========================================
  {
    key: 'ME',
    gloss: 'ME / I',
    category: 'Đại từ & Con người',
    categoryIndex: 2,
    meaningVi: 'Tôi / Mình',
    descriptionVi: 'Ngón trỏ chỉ vào giữa ngực mình',
    synonyms: ['i', 'me', 'tôi', 'mình', 'em', 'anh', 'tớ'],
    duration: 750,
    nmm: { eyebrows: 'neutral', headNod: 0.08 },
    config: { handshape: 'point', location: 'chest', motion: 'tap', twoHanded: false }
  },
  {
    key: 'YOU',
    gloss: 'YOU',
    category: 'Đại từ & Con người',
    categoryIndex: 2,
    meaningVi: 'Bạn / Anh / Chị',
    descriptionVi: 'Ngón trỏ chỉ thẳng về phía người đối diện',
    synonyms: ['you', 'bạn', 'anh', 'chị', 'cậu', 'ngươi'],
    duration: 750,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'point', location: 'front', motion: 'push', twoHanded: false }
  },
  {
    key: 'HE',
    gloss: 'HE / SHE',
    category: 'Đại từ & Con người',
    categoryIndex: 2,
    meaningVi: 'Anh ấy / Cô ấy / Nó',
    descriptionVi: 'Ngón trỏ chỉ về phía một bên (ngôi thứ ba)',
    synonyms: ['he', 'she', 'it', 'him', 'her', 'anh ấy', 'cô ấy', 'nó', 'chị ấy', 'ông ấy', 'bà ấy'],
    duration: 800,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'point', location: 'front', motion: 'push', twoHanded: false }
  },
  {
    key: 'WE',
    gloss: 'WE / US',
    category: 'Đại từ & Con người',
    categoryIndex: 2,
    meaningVi: 'Chúng tôi / Chúng ta',
    descriptionVi: 'Ngón trỏ chạm vai phải rồi vòng cung chạm vai trái bao quát',
    synonyms: ['we', 'us', 'chúng tôi', 'chúng ta', 'chúng mình', 'tụi mình'],
    duration: 1000,
    nmm: { smile: 0.3, eyebrows: 'neutral' },
    config: { handshape: 'point', location: 'chest', motion: 'brush', twoHanded: false }
  },
  {
    key: 'THEY',
    gloss: 'THEY / THEM',
    category: 'Đại từ & Con người',
    categoryIndex: 2,
    meaningVi: 'Họ / Bọn họ',
    descriptionVi: 'Ngón trỏ quét một đường vòng cung ngang phía trước',
    synonyms: ['they', 'them', 'họ', 'bọn họ', 'chúng nó', 'các bạn ấy'],
    duration: 950,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'point', location: 'front', motion: 'wave', twoHanded: false }
  },
  {
    key: 'MY',
    gloss: 'MY',
    category: 'Đại từ & Con người',
    categoryIndex: 2,
    meaningVi: 'Của tôi',
    descriptionVi: 'Bàn tay mở áp phẳng lên giữa ngực xác định quyền sở hữu',
    synonyms: ['my', 'mine', 'của tôi', 'của mình', 'của em'],
    duration: 800,
    nmm: { eyebrows: 'neutral', headNod: 0.1 },
    config: { handshape: 'flat', location: 'chest', motion: 'tap', twoHanded: false }
  },
  {
    key: 'YOUR',
    gloss: 'YOUR',
    category: 'Đại từ & Con người',
    categoryIndex: 2,
    meaningVi: 'Của bạn',
    descriptionVi: 'Lòng bàn tay mở phẳng đẩy nhẹ về phía đối phương',
    synonyms: ['your', 'yours', 'của bạn', 'của anh', 'của chị'],
    duration: 800,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'flat', location: 'front', motion: 'push', twoHanded: false }
  },
  {
    key: 'FRIEND',
    gloss: 'FRIEND',
    category: 'Đại từ & Con người',
    categoryIndex: 2,
    meaningVi: 'Bạn bè',
    descriptionVi: 'Hai ngón trỏ móc vào nhau một lần rồi đảo ngược móc lại lần hai gắn kết',
    synonyms: ['friend', 'friends', 'bạn bè', 'người bạn', 'bạn thân'],
    duration: 1050,
    nmm: { smile: 0.7, eyebrows: 'neutral' },
    config: { handshape: 'point', location: 'front', motion: 'cross', twoHanded: true }
  },
  {
    key: 'FAMILY',
    gloss: 'FAMILY',
    category: 'Đại từ & Con người',
    categoryIndex: 2,
    meaningVi: 'Gia đình',
    descriptionVi: 'Hai bàn tay chữ F chạm ngón cái/trỏ rồi vẽ vòng tròn chạm cườm tay đoàn tụ',
    synonyms: ['family', 'gia đình', 'nhà', 'tổ ấm'],
    duration: 1200,
    nmm: { smile: 0.65, eyebrows: 'neutral' },
    config: { handshape: 'pinch', location: 'front', motion: 'rotate', twoHanded: true }
  },
  {
    key: 'FATHER',
    gloss: 'FATHER',
    category: 'Đại từ & Con người',
    categoryIndex: 2,
    meaningVi: 'Cha / Bố',
    descriptionVi: 'Ngón cái của bàn tay mở 5 chạm nhẹ 2 lần lên trán',
    synonyms: ['father', 'dad', 'bố', 'ba', 'cha', 'thầy'],
    duration: 950,
    nmm: { smile: 0.4, eyebrows: 'neutral' },
    config: { handshape: 'flat', location: 'forehead', motion: 'tap', twoHanded: false }
  },
  {
    key: 'MOTHER',
    gloss: 'MOTHER',
    category: 'Đại từ & Con người',
    categoryIndex: 2,
    meaningVi: 'Mẹ',
    descriptionVi: 'Ngón cái của bàn tay mở 5 chạm nhẹ 2 lần lên cằm',
    synonyms: ['mother', 'mom', 'mẹ', 'má', 'u', 'mẹ hiền'],
    duration: 950,
    nmm: { smile: 0.6, eyebrows: 'neutral' },
    config: { handshape: 'flat', location: 'chin', motion: 'tap', twoHanded: false }
  },
  {
    key: 'BROTHER',
    gloss: 'BROTHER',
    category: 'Đại từ & Con người',
    categoryIndex: 2,
    meaningVi: 'Anh / Em trai',
    descriptionVi: 'Tay chữ L từ trán chạm xuống tay chữ L trước ngực',
    synonyms: ['brother', 'anh trai', 'em trai', 'huynh đệ'],
    duration: 1050,
    nmm: { smile: 0.35, eyebrows: 'neutral' },
    config: { handshape: 'point', location: 'front', motion: 'tap', twoHanded: true }
  },
  {
    key: 'SISTER',
    gloss: 'SISTER',
    category: 'Đại từ & Con người',
    categoryIndex: 2,
    meaningVi: 'Chị / Em gái',
    descriptionVi: 'Tay chữ L từ cằm chạm xuống tay chữ L trước ngực',
    synonyms: ['sister', 'chị gái', 'em gái', 'chị em'],
    duration: 1050,
    nmm: { smile: 0.4, eyebrows: 'neutral' },
    config: { handshape: 'point', location: 'front', motion: 'tap', twoHanded: true }
  },
  {
    key: 'CHILD',
    gloss: 'CHILD',
    category: 'Đại từ & Con người',
    categoryIndex: 2,
    meaningVi: 'Trẻ em / Em bé',
    descriptionVi: 'Bàn tay hạ thấp vỗ nhẹ đầu hoặc hai tay bế ẵm lắc lư nhẹ nhàng',
    synonyms: ['child', 'children', 'baby', 'trẻ em', 'em bé', 'con', 'con cái', 'trẻ con'],
    duration: 1000,
    nmm: { smile: 0.7, eyebrows: 'neutral' },
    config: { handshape: 'flat', location: 'waist', motion: 'tap', twoHanded: false }
  },
  {
    key: 'PEOPLE',
    gloss: 'PEOPLE',
    category: 'Đại từ & Con người',
    categoryIndex: 2,
    meaningVi: 'Mọi người',
    descriptionVi: 'Hai tay chữ P xoay vòng tròn luân phiên trước ngực',
    synonyms: ['people', 'mọi người', 'con người', 'người ta', 'quần chúng'],
    duration: 1100,
    nmm: { smile: 0.3, eyebrows: 'neutral' },
    config: { handshape: 'peace', location: 'front', motion: 'rotate', twoHanded: true }
  },

  // ==========================================
  // NHÓM 3: Từ để hỏi (10 từ)
  // ==========================================
  {
    key: 'WHAT',
    gloss: 'WHAT',
    category: 'Từ để hỏi',
    categoryIndex: 3,
    meaningVi: 'Cái gì',
    descriptionVi: 'Hai bàn tay ngửa lắc nhẹ sang hai bên, mặt nhíu mày thắc mắc',
    synonyms: ['what', 'cái gì', 'gì'],
    duration: 900,
    nmm: { eyebrows: 'furrowed', headTilt: 0.12, smile: 0.0 },
    config: { handshape: 'flat', location: 'front', motion: 'shake', twoHanded: true }
  },
  {
    key: 'WHO',
    gloss: 'WHO',
    category: 'Từ để hỏi',
    categoryIndex: 3,
    meaningVi: 'Ai',
    descriptionVi: 'Ngón cái đặt ở cằm, ngón trỏ co gập liên tục 2 lần',
    synonyms: ['who', 'ai', 'người nào'],
    duration: 900,
    nmm: { eyebrows: 'furrowed', headTilt: 0.1 },
    config: { handshape: 'point', location: 'chin', motion: 'tap', twoHanded: false }
  },
  {
    key: 'WHERE',
    gloss: 'WHERE',
    category: 'Từ để hỏi',
    categoryIndex: 3,
    meaningVi: 'Ở đâu',
    descriptionVi: 'Ngón trỏ dựng đứng lắc qua lại như chiếc kim đồng hồ',
    synonyms: ['where', 'ở đâu', 'đâu', 'nơi nào'],
    duration: 900,
    nmm: { eyebrows: 'furrowed', headTilt: 0.12 },
    config: { handshape: 'point', location: 'front', motion: 'shake', twoHanded: false }
  },
  {
    key: 'WHEN',
    gloss: 'WHEN',
    category: 'Từ để hỏi',
    categoryIndex: 3,
    meaningVi: 'Khi nào',
    descriptionVi: 'Ngón trỏ phải vẽ một vòng quanh đầu ngón trỏ trái rồi chạm đầu ngón',
    synonyms: ['when', 'khi nào', 'bao giờ', 'lúc nào'],
    duration: 1050,
    nmm: { eyebrows: 'furrowed', headTilt: 0.1 },
    config: { handshape: 'point', location: 'front', motion: 'rotate', twoHanded: true }
  },
  {
    key: 'WHY',
    gloss: 'WHY',
    category: 'Từ để hỏi',
    categoryIndex: 3,
    meaningVi: 'Tại sao',
    descriptionVi: 'Các ngón tay từ trán kéo ra biến thành thế tay chữ Y',
    synonyms: ['why', 'tại sao', 'vì sao', 'sao', 'lý do'],
    duration: 950,
    nmm: { eyebrows: 'furrowed', headTilt: 0.14 },
    config: { handshape: 'yShape', location: 'forehead', motion: 'push', twoHanded: false }
  },
  {
    key: 'HOW',
    gloss: 'HOW',
    category: 'Từ để hỏi',
    categoryIndex: 3,
    meaningVi: 'Như thế nào',
    descriptionVi: 'Hai bàn tay khum úp lưng ngón tay vào nhau rồi xoay lật ngửa lên',
    synonyms: ['how', 'như thế nào', 'thế nào', 'làm sao'],
    duration: 950,
    nmm: { eyebrows: 'furrowed', headTilt: 0.12 },
    config: { handshape: 'cup', location: 'front', motion: 'rotate', twoHanded: true }
  },
  {
    key: 'HOW_MUCH',
    gloss: 'HOW-MUCH',
    category: 'Từ để hỏi',
    categoryIndex: 3,
    meaningVi: 'Bao nhiêu',
    descriptionVi: 'Hai bàn tay nắm bung ngửa các ngón tay hất lên trên hỏi số lượng/giá cả',
    synonyms: ['how much', 'how many', 'bao nhiêu', 'mấy'],
    duration: 950,
    nmm: { eyebrows: 'furrowed', headTilt: 0.1 },
    config: { handshape: 'fist', location: 'front', motion: 'wave', twoHanded: true }
  },
  {
    key: 'WHICH',
    gloss: 'WHICH',
    category: 'Từ để hỏi',
    categoryIndex: 3,
    meaningVi: 'Cái nào',
    descriptionVi: 'Hai bàn tay chữ A có ngón cái dựng nhấp nhô luân phiên',
    synonyms: ['which', 'cái nào', 'nào', 'người nào'],
    duration: 950,
    nmm: { eyebrows: 'furrowed', headTilt: 0.08 },
    config: { handshape: 'thumbsUp', location: 'front', motion: 'wave', twoHanded: true }
  },
  {
    key: 'CAN',
    gloss: 'CAN',
    category: 'Từ để hỏi',
    categoryIndex: 3,
    meaningVi: 'Có thể',
    descriptionVi: 'Hai nắm tay chữ S nhấn dứt khoát xuống trước ngực biểu thị khả năng',
    synonyms: ['can', 'có thể', 'được', 'có khả năng'],
    duration: 850,
    nmm: { eyebrows: 'raised', headNod: 0.2 },
    config: { handshape: 'fist', location: 'front', motion: 'nod', twoHanded: true }
  },
  {
    key: 'CANNOT',
    gloss: 'CANNOT',
    category: 'Từ để hỏi',
    categoryIndex: 3,
    meaningVi: 'Không thể',
    descriptionVi: 'Ngón trỏ phải chặt gạt xuống đầu ngón trỏ trái đang nằm ngang phủ định dứt khoát',
    synonyms: ['cannot', 'cant', 'không thể', 'chẳng thể', 'không được'],
    duration: 900,
    nmm: { eyebrows: 'furrowed', headShake: 0.3 },
    config: { handshape: 'point', location: 'front', motion: 'tap', twoHanded: true }
  },

  // ==========================================
  // NHÓM 4: Cảm xúc & Trạng thái (18 từ)
  // ==========================================
  {
    key: 'HAPPY',
    gloss: 'HAPPY',
    category: 'Cảm xúc & Trạng thái',
    categoryIndex: 4,
    meaningVi: 'Vui vẻ / Hạnh phúc',
    descriptionVi: 'Hai bàn tay mở vuốt nhẹ hất lên trước ngực 2 lần kèm nụ cười rạng rỡ',
    synonyms: ['happy', 'glad', 'vui vẻ', 'hạnh phúc', 'vui', 'hoan hỉ'],
    duration: 1000,
    nmm: { smile: 0.95, eyebrows: 'neutral', headTilt: 0.06, headNod: 0.15 },
    config: { handshape: 'flat', location: 'chest', motion: 'brush', twoHanded: true }
  },
  {
    key: 'SAD',
    gloss: 'SAD',
    category: 'Cảm xúc & Trạng thái',
    categoryIndex: 4,
    meaningVi: 'Buồn bã',
    descriptionVi: 'Hai bàn tay mở trước mặt hạ từ từ xuống kèm nét mặt ủ rũ',
    synonyms: ['sad', 'buồn bã', 'buồn', 'sầu', 'u sầu', 'buồn tủi'],
    duration: 1100,
    nmm: { smile: 0.0, eyebrows: 'furrowed', headTilt: 0.12 },
    config: { handshape: 'flat', location: 'chin', motion: 'pull', twoHanded: true }
  },
  {
    key: 'GOOD',
    gloss: 'GOOD',
    category: 'Cảm xúc & Trạng thái',
    categoryIndex: 4,
    meaningVi: 'Tốt / Khỏe',
    descriptionVi: 'Bàn tay phải từ môi chạm xuống lòng bàn tay trái đang ngửa',
    synonyms: ['good', 'tốt', 'khỏe', 'ổn', 'tuyệt', 'lành'],
    duration: 950,
    nmm: { smile: 0.75, eyebrows: 'neutral', headNod: 0.2 },
    config: { handshape: 'flat', location: 'mouth', motion: 'push', twoHanded: true }
  },
  {
    key: 'FINE',
    gloss: 'FINE',
    category: 'Cảm xúc & Trạng thái',
    categoryIndex: 4,
    meaningVi: 'Khỏe / Bình thường',
    descriptionVi: 'Ngón cái bàn tay số 5 chạm nhẹ vào giữa ngực 2 lần',
    synonyms: ['fine', 'khỏe', 'bình thường', 'tốt lành', 'ổn thỏa'],
    duration: 900,
    nmm: { smile: 0.65, eyebrows: 'neutral', headNod: 0.1 },
    config: { handshape: 'flat', location: 'chest', motion: 'tap', twoHanded: false }
  },
  {
    key: 'BAD',
    gloss: 'BAD',
    category: 'Cảm xúc & Trạng thái',
    categoryIndex: 4,
    meaningVi: 'Tồi tệ / Kém',
    descriptionVi: 'Bàn tay từ cằm lật úp đẩy dứt khoát xuống dưới chê bai',
    synonyms: ['bad', 'tồi tệ', 'xấu', 'kém', 'dở'],
    duration: 900,
    nmm: { smile: 0.0, eyebrows: 'furrowed', headShake: 0.2 },
    config: { handshape: 'flat', location: 'chin', motion: 'push', twoHanded: false }
  },
  {
    key: 'LOVE',
    gloss: 'LOVE',
    category: 'Cảm xúc & Trạng thái',
    categoryIndex: 4,
    meaningVi: 'Yêu thương',
    descriptionVi: 'Hai nắm tay bắt chéo ôm chặt trước ngực như ôm trọn trái tim',
    synonyms: ['love', 'yêu', 'thương', 'yêu thương', 'quý mến', 'ái mộ'],
    duration: 1100,
    nmm: { smile: 0.9, eyebrows: 'neutral', headTilt: 0.08, headNod: 0.1 },
    config: { handshape: 'fist', location: 'chest', motion: 'cross', twoHanded: true }
  },
  {
    key: 'LIKE',
    gloss: 'LIKE',
    category: 'Cảm xúc & Trạng thái',
    categoryIndex: 4,
    meaningVi: 'Thích',
    descriptionVi: 'Ngón cái và ngón giữa từ ngực kéo ra trước đồng thời khép chạm nhau',
    synonyms: ['like', 'thích', 'khoái', 'ưa chuộng', 'ưa'],
    duration: 950,
    nmm: { smile: 0.75, eyebrows: 'neutral' },
    config: { handshape: 'pinch', location: 'chest', motion: 'pull', twoHanded: false }
  },
  {
    key: 'DISLIKE',
    gloss: 'DISLIKE',
    category: 'Cảm xúc & Trạng thái',
    categoryIndex: 4,
    meaningVi: 'Không thích',
    descriptionVi: 'Thế tay LIKE từ ngực kéo ra rồi búng hất dứt khoát xuống đất từ chối',
    synonyms: ['dislike', 'không thích', 'ghét', 'chẳng thích'],
    duration: 1000,
    nmm: { smile: 0.0, eyebrows: 'furrowed', headShake: 0.25 },
    config: { handshape: 'pinch', location: 'chest', motion: 'push', twoHanded: false }
  },
  {
    key: 'TIRED',
    gloss: 'TIRED',
    category: 'Cảm xúc & Trạng thái',
    categoryIndex: 4,
    meaningVi: 'Mệt mỏi',
    descriptionVi: 'Hai bàn tay khum đặt trước ngực rồi rũ gập xuống, vai buông lỏng',
    synonyms: ['tired', 'mệt mỏi', 'mệt', 'kiệt sức'],
    duration: 1050,
    nmm: { smile: 0.0, eyebrows: 'furrowed', headTilt: 0.1 },
    config: { handshape: 'cup', location: 'chest', motion: 'pull', twoHanded: true }
  },
  {
    key: 'SICK',
    gloss: 'SICK',
    category: 'Cảm xúc & Trạng thái',
    categoryIndex: 4,
    meaningVi: 'Bị ốm / Bệnh',
    descriptionVi: 'Ngón giữa tay phải chạm trán, ngón giữa tay trái chạm bụng cảm sốt đau nhức',
    synonyms: ['sick', 'ill', 'ốm', 'bệnh', 'bị ốm', 'đau ốm'],
    duration: 1050,
    nmm: { smile: 0.0, eyebrows: 'furrowed', headTilt: 0.1 },
    config: { handshape: 'point', location: 'forehead', motion: 'tap', twoHanded: true }
  },
  {
    key: 'HURT',
    gloss: 'HURT',
    category: 'Cảm xúc & Trạng thái',
    categoryIndex: 4,
    meaningVi: 'Đau đớn',
    descriptionVi: 'Hai ngón trỏ chĩa vào nhau xoắn vặn gần vị trí bị đau biểu thị cơn đau',
    synonyms: ['hurt', 'pain', 'đau', 'đau đớn', 'nhức'],
    duration: 1000,
    nmm: { smile: 0.0, eyebrows: 'furrowed', headTilt: 0.12 },
    config: { handshape: 'point', location: 'front', motion: 'rotate', twoHanded: true }
  },
  {
    key: 'HOT',
    gloss: 'HOT',
    category: 'Cảm xúc & Trạng thái',
    categoryIndex: 4,
    meaningVi: 'Nóng bức',
    descriptionVi: 'Bàn tay khum trước miệng như đang nhả vật nóng ra ngoài',
    synonyms: ['hot', 'nóng', 'nóng bức', 'oi bức'],
    duration: 900,
    nmm: { smile: 0.0, eyebrows: 'furrowed' },
    config: { handshape: 'cup', location: 'mouth', motion: 'push', twoHanded: false }
  },
  {
    key: 'COLD',
    gloss: 'COLD',
    category: 'Cảm xúc & Trạng thái',
    categoryIndex: 4,
    meaningVi: 'Lạnh',
    descriptionVi: 'Hai nắm tay co trước ngực run rẩy nhẹ vì lạnh buốt',
    synonyms: ['cold', 'lạnh', 'lạnh lẽo', 'rét'],
    duration: 950,
    nmm: { smile: 0.0, eyebrows: 'furrowed' },
    config: { handshape: 'fist', location: 'chest', motion: 'shake', twoHanded: true }
  },
  {
    key: 'HUNGRY',
    gloss: 'HUNGRY',
    category: 'Cảm xúc & Trạng thái',
    categoryIndex: 4,
    meaningVi: 'Đói bụng',
    descriptionVi: 'Bàn tay chữ C vuốt dọc từ cổ họng xuống bụng thèm ăn',
    synonyms: ['hungry', 'đói', 'đói bụng', 'cồn cào'],
    duration: 1000,
    nmm: { smile: 0.1, eyebrows: 'furrowed' },
    config: { handshape: 'cShape', location: 'chest', motion: 'pull', twoHanded: false }
  },
  {
    key: 'THIRSTY',
    gloss: 'THIRSTY',
    category: 'Cảm xúc & Trạng thái',
    categoryIndex: 4,
    meaningVi: 'Khát nước',
    descriptionVi: 'Ngón trỏ vuốt một đường thẳng từ cằm xuống cổ họng',
    synonyms: ['thirsty', 'khát', 'khát nước'],
    duration: 950,
    nmm: { smile: 0.1, eyebrows: 'furrowed' },
    config: { handshape: 'point', location: 'chin', motion: 'pull', twoHanded: false }
  },
  {
    key: 'AFRAID',
    gloss: 'AFRAID',
    category: 'Cảm xúc & Trạng thái',
    categoryIndex: 4,
    meaningVi: 'Sợ hãi',
    descriptionVi: 'Hai bàn tay mở từ hai bên hông đưa nhanh vào che chắn trước ngực phòng vệ',
    synonyms: ['afraid', 'scared', 'sợ hãi', 'sợ', 'lo sợ', 'hoảng sợ'],
    duration: 950,
    nmm: { smile: 0.0, eyebrows: 'raised', headTilt: 0.08 },
    config: { handshape: 'flat', location: 'chest', motion: 'pull', twoHanded: true }
  },
  {
    key: 'ANGRY',
    gloss: 'ANGRY',
    category: 'Cảm xúc & Trạng thái',
    categoryIndex: 4,
    meaningVi: 'Tức giận',
    descriptionVi: 'Bàn tay cong quắp dạng móng vuốt giật mạnh trước mặt biểu thị thịnh nộ',
    synonyms: ['angry', 'tức giận', 'giận', 'bực mình', 'nổi giận'],
    duration: 950,
    nmm: { smile: 0.0, eyebrows: 'furrowed' },
    config: { handshape: 'cup', location: 'chin', motion: 'pull', twoHanded: false }
  },
  {
    key: 'BUSY',
    gloss: 'BUSY',
    category: 'Cảm xúc & Trạng thái',
    categoryIndex: 4,
    meaningVi: 'Bận rộn',
    descriptionVi: 'Cạnh bàn tay phải chữ B quét qua lại trên cổ tay trái bận rộn công việc',
    synonyms: ['busy', 'bận rộn', 'bận', 'bận bịu'],
    duration: 1000,
    nmm: { smile: 0.2, eyebrows: 'neutral' },
    config: { handshape: 'flat', location: 'front', motion: 'brush', twoHanded: true }
  },

  // ==========================================
  // NHÓM 5: Sinh hoạt & Ăn uống (18 từ)
  // ==========================================
  {
    key: 'EAT',
    gloss: 'EAT',
    category: 'Sinh hoạt & Ăn uống',
    categoryIndex: 5,
    meaningVi: 'Ăn / Đồ ăn',
    descriptionVi: 'Đầu các ngón tay chụm lại đưa vào miệng 2 lần',
    synonyms: ['eat', 'food', 'ăn', 'ăn cơm', 'đồ ăn', 'thức ăn'],
    duration: 1000,
    nmm: { smile: 0.4 },
    config: { handshape: 'pinch', location: 'mouth', motion: 'tap', twoHanded: false }
  },
  {
    key: 'DRINK',
    gloss: 'DRINK',
    category: 'Sinh hoạt & Ăn uống',
    categoryIndex: 5,
    meaningVi: 'Uống nước',
    descriptionVi: 'Bàn tay chữ C nghiêng về phía miệng như đang cầm cốc uống',
    synonyms: ['drink', 'uống', 'uống nước', 'nhấp ngụm'],
    duration: 950,
    nmm: { smile: 0.3 },
    config: { handshape: 'cShape', location: 'mouth', motion: 'push', twoHanded: false }
  },
  {
    key: 'WATER',
    gloss: 'WATER',
    category: 'Sinh hoạt & Ăn uống',
    categoryIndex: 5,
    meaningVi: 'Nước',
    descriptionVi: 'Bàn tay chữ W, ngón trỏ chạm cằm 2 lần',
    synonyms: ['water', 'nước', 'nước uống', 'nước lọc'],
    duration: 950,
    nmm: { smile: 0.3 },
    config: { handshape: 'peace', location: 'chin', motion: 'tap', twoHanded: false }
  },
  {
    key: 'RICE',
    gloss: 'RICE',
    category: 'Sinh hoạt & Ăn uống',
    categoryIndex: 5,
    meaningVi: 'Cơm / Bánh mì',
    descriptionVi: 'Cử chỉ bới cơm đưa lên miệng hoặc cạnh bàn tay gõ nhẹ lên mu bàn tay',
    synonyms: ['rice', 'bread', 'cơm', 'bánh mì', 'gạo'],
    duration: 1000,
    nmm: { smile: 0.4 },
    config: { handshape: 'cup', location: 'mouth', motion: 'tap', twoHanded: false }
  },
  {
    key: 'COFFEE',
    gloss: 'COFFEE',
    category: 'Sinh hoạt & Ăn uống',
    categoryIndex: 5,
    meaningVi: 'Cà phê',
    descriptionVi: 'Hai nắm tay đặt chồng lên nhau, tay trên xoay tròn như xay cà phê',
    synonyms: ['coffee', 'cà phê', 'cafe'],
    duration: 1050,
    nmm: { smile: 0.4 },
    config: { handshape: 'fist', location: 'front', motion: 'rotate', twoHanded: true }
  },
  {
    key: 'TEA',
    gloss: 'TEA',
    category: 'Sinh hoạt & Ăn uống',
    categoryIndex: 5,
    meaningVi: 'Trà',
    descriptionVi: 'Tay phải chữ F nhúng nhẹ vào miệng bàn tay trái chữ O như nhúng túi trà',
    synonyms: ['tea', 'trà', 'chè'],
    duration: 1000,
    nmm: { smile: 0.4 },
    config: { handshape: 'pinch', location: 'front', motion: 'tap', twoHanded: true }
  },
  {
    key: 'SLEEP',
    gloss: 'SLEEP',
    category: 'Sinh hoạt & Ăn uống',
    categoryIndex: 5,
    meaningVi: 'Đi ngủ',
    descriptionVi: 'Bàn tay mở trước trán hạ dần xuống cằm đồng thời khép ngón và nhắm mắt nghỉ ngơi',
    synonyms: ['sleep', 'ngủ', 'đi ngủ', 'giấc ngủ'],
    duration: 1100,
    nmm: { smile: 0.15, headTilt: 0.2 },
    config: { handshape: 'flat', location: 'chin', motion: 'pull', twoHanded: false }
  },
  {
    key: 'WAKE_UP',
    gloss: 'WAKE-UP',
    category: 'Sinh hoạt & Ăn uống',
    categoryIndex: 5,
    meaningVi: 'Thức dậy',
    descriptionVi: 'Ngón trỏ và cái chụm đặt gần mắt rồi mở bung ra đồng thời mở to mắt',
    synonyms: ['wake up', 'thức dậy', 'dậy', 'tỉnh dậy'],
    duration: 950,
    nmm: { smile: 0.5, eyebrows: 'raised' },
    config: { handshape: 'pinch', location: 'forehead', motion: 'openClose', twoHanded: false }
  },
  {
    key: 'BATHROOM',
    gloss: 'BATHROOM',
    category: 'Sinh hoạt & Ăn uống',
    categoryIndex: 5,
    meaningVi: 'Nhà vệ sinh',
    descriptionVi: 'Bàn tay chữ T lắc nhẹ qua lại trước ngực',
    synonyms: ['bathroom', 'toilet', 'nhà vệ sinh', 'wc', 'phòng vệ sinh'],
    duration: 900,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'fist', location: 'front', motion: 'shake', twoHanded: false }
  },
  {
    key: 'HOUSE',
    gloss: 'HOUSE',
    category: 'Sinh hoạt & Ăn uống',
    categoryIndex: 5,
    meaningVi: 'Nhà ở',
    descriptionVi: 'Hai bàn tay phẳng chạm đầu ngón tay tạo hình mái nhà rồi hạ xuống tạo tường',
    synonyms: ['house', 'home', 'nhà ở', 'nhà', 'ngôi nhà'],
    duration: 1100,
    nmm: { smile: 0.4 },
    config: { handshape: 'flat', location: 'front', motion: 'openClose', twoHanded: true }
  },
  {
    key: 'ROOM',
    gloss: 'ROOM',
    category: 'Sinh hoạt & Ăn uống',
    categoryIndex: 5,
    meaningVi: 'Căn phòng',
    descriptionVi: 'Hai bàn tay phẳng tạo thành 4 góc của một chiếc hộp vuông',
    synonyms: ['room', 'căn phòng', 'phòng'],
    duration: 1050,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'flat', location: 'front', motion: 'openClose', twoHanded: true }
  },
  {
    key: 'DOOR',
    gloss: 'DOOR',
    category: 'Sinh hoạt & Ăn uống',
    categoryIndex: 5,
    meaningVi: 'Cửa ra vào',
    descriptionVi: 'Hai bàn tay chữ B nằm ngang, tay phải xoay mở ra rồi khép lại cánh cửa',
    synonyms: ['door', 'cửa', 'cửa ra vào', 'cánh cửa'],
    duration: 950,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'flat', location: 'front', motion: 'openClose', twoHanded: true }
  },
  {
    key: 'BOOK',
    gloss: 'BOOK',
    category: 'Sinh hoạt & Ăn uống',
    categoryIndex: 5,
    meaningVi: 'Quyển sách',
    descriptionVi: 'Hai lòng bàn tay phẳng áp vào nhau rồi mở rộng ra như mở cuốn sách tri thức',
    synonyms: ['book', 'sách', 'quyển sách', 'cuốn sách'],
    duration: 1050,
    nmm: { smile: 0.4 },
    config: { handshape: 'flat', location: 'front', motion: 'openClose', twoHanded: true }
  },
  {
    key: 'PHONE',
    gloss: 'PHONE',
    category: 'Sinh hoạt & Ăn uống',
    categoryIndex: 5,
    meaningVi: 'Điện thoại',
    descriptionVi: 'Bàn tay chữ Y áp vào tai (ngón cái ở tai, ngón út ở miệng)',
    synonyms: ['phone', 'telephone', 'điện thoại', 'máy điện thoại'],
    duration: 950,
    nmm: { smile: 0.4 },
    config: { handshape: 'yShape', location: 'forehead', motion: 'tap', twoHanded: false }
  },
  {
    key: 'COMPUTER',
    gloss: 'COMPUTER',
    category: 'Sinh hoạt & Ăn uống',
    categoryIndex: 5,
    meaningVi: 'Máy tính',
    descriptionVi: 'Bàn tay chữ C trượt nhẹ dọc theo cẳng tay trái đang nằm ngang',
    synonyms: ['computer', 'laptop', 'máy tính', 'máy vi tính'],
    duration: 1050,
    nmm: { smile: 0.3 },
    config: { handshape: 'cShape', location: 'front', motion: 'brush', twoHanded: true }
  },
  {
    key: 'CAR',
    gloss: 'CAR',
    category: 'Sinh hoạt & Ăn uống',
    categoryIndex: 5,
    meaningVi: 'Xe hơi / Ô tô',
    descriptionVi: 'Hai nắm tay cầm vô lăng vô hình lắc qua lại lái xe',
    synonyms: ['car', 'automobile', 'xe hơi', 'ô tô', 'xe bốn bánh'],
    duration: 1000,
    nmm: { smile: 0.4 },
    config: { handshape: 'fist', location: 'front', motion: 'rotate', twoHanded: true }
  },
  {
    key: 'BUS',
    gloss: 'BUS',
    category: 'Sinh hoạt & Ăn uống',
    categoryIndex: 5,
    meaningVi: 'Xe buýt',
    descriptionVi: 'Fingerspelling nhanh B-U-S hoặc hai tay nắm vô lăng lớn lắc nhẹ',
    synonyms: ['bus', 'xe buýt', 'xe bus'],
    duration: 950,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'fist', location: 'front', motion: 'rotate', twoHanded: true }
  },
  {
    key: 'MONEY',
    gloss: 'MONEY',
    category: 'Sinh hoạt & Ăn uống',
    categoryIndex: 5,
    meaningVi: 'Tiền bạc',
    descriptionVi: 'Lưng ngón tay phải chụm vỗ nhẹ vào lòng bàn tay trái 2 lần đếm tiền',
    synonyms: ['money', 'cash', 'tiền', 'tiền bạc', 'chi phí', 'giá'],
    duration: 950,
    nmm: { smile: 0.4 },
    config: { handshape: 'pinch', location: 'front', motion: 'tap', twoHanded: true }
  },

  // ==========================================
  // NHÓM 6: Hành động cơ bản (22 từ)
  // ==========================================
  {
    key: 'HELP',
    gloss: 'HELP',
    category: 'Hành động cơ bản',
    categoryIndex: 6,
    meaningVi: 'Giúp đỡ',
    descriptionVi: 'Bàn tay trái phẳng làm bệ đỡ, tay phải nắm chữ A đặt lên rồi cùng nâng lên',
    synonyms: ['help', 'giúp đỡ', 'giúp', 'cứu', 'hỗ trợ'],
    duration: 1000,
    nmm: { smile: 0.5, eyebrows: 'raised', headTilt: 0.08 },
    config: { handshape: 'thumbsUp', location: 'front', motion: 'push', twoHanded: true }
  },
  {
    key: 'WANT',
    gloss: 'WANT',
    category: 'Hành động cơ bản',
    categoryIndex: 6,
    meaningVi: 'Muốn',
    descriptionVi: 'Hai bàn tay ngửa với các ngón tay co nhẹ kéo về phía thân mình',
    synonyms: ['want', 'muốn', 'mong muốn', 'khao khát'],
    duration: 950,
    nmm: { smile: 0.35, eyebrows: 'raised' },
    config: { handshape: 'cup', location: 'chest', motion: 'pull', twoHanded: true }
  },
  {
    key: 'NEED',
    gloss: 'NEED',
    category: 'Hành động cơ bản',
    categoryIndex: 6,
    meaningVi: 'Cần thiết',
    descriptionVi: 'Bàn tay chữ X gập cổ tay dứt khoát xuống phía trước',
    synonyms: ['need', 'cần thiết', 'cần', 'phải có'],
    duration: 900,
    nmm: { eyebrows: 'raised', headNod: 0.15 },
    config: { handshape: 'point', location: 'front', motion: 'nod', twoHanded: false }
  },
  {
    key: 'HAVE',
    gloss: 'HAVE',
    category: 'Hành động cơ bản',
    categoryIndex: 6,
    meaningVi: 'Có',
    descriptionVi: 'Đầu các ngón tay của hai bàn tay gập góc 90 độ chạm nhẹ vào ngực',
    synonyms: ['have', 'has', 'có', 'sở hữu'],
    duration: 850,
    nmm: { eyebrows: 'neutral', headNod: 0.1 },
    config: { handshape: 'cup', location: 'chest', motion: 'tap', twoHanded: true }
  },
  {
    key: 'GO',
    gloss: 'GO',
    category: 'Hành động cơ bản',
    categoryIndex: 6,
    meaningVi: 'Đi',
    descriptionVi: 'Hai ngón trỏ xoay hướng rồi cùng chỉ về phía trước',
    synonyms: ['go', 'đi', 'đi tới', 'rời khỏi'],
    duration: 900,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'point', location: 'front', motion: 'push', twoHanded: true }
  },
  {
    key: 'COME',
    gloss: 'COME',
    category: 'Hành động cơ bản',
    categoryIndex: 6,
    meaningVi: 'Đến / Lại đây',
    descriptionVi: 'Hai ngón trỏ từ xa vẫy cuộn nhẹ về phía người mình',
    synonyms: ['come', 'đến', 'tới', 'lại đây', 'tới đây'],
    duration: 900,
    nmm: { smile: 0.4 },
    config: { handshape: 'point', location: 'chest', motion: 'pull', twoHanded: true }
  },
  {
    key: 'STOP',
    gloss: 'STOP',
    category: 'Hành động cơ bản',
    categoryIndex: 6,
    meaningVi: 'Dừng lại',
    descriptionVi: 'Cạnh bàn tay phải chặt dứt khoát xuống lòng bàn tay trái',
    synonyms: ['stop', 'dừng lại', 'dừng', 'ngừng', 'thôi'],
    duration: 900,
    nmm: { smile: 0.0, eyebrows: 'furrowed', headShake: 0.15 },
    config: { handshape: 'flat', location: 'front', motion: 'tap', twoHanded: true }
  },
  {
    key: 'WAIT',
    gloss: 'WAIT',
    category: 'Hành động cơ bản',
    categoryIndex: 6,
    meaningVi: 'Chờ đợi',
    descriptionVi: 'Hai bàn tay ngửa phía trước, các ngón tay ngọ nguậy nhấp nhô',
    synonyms: ['wait', 'chờ đợi', 'chờ', 'đợi', 'khoan'],
    duration: 1050,
    nmm: { smile: 0.2, eyebrows: 'neutral' },
    config: { handshape: 'flat', location: 'front', motion: 'wave', twoHanded: true }
  },
  {
    key: 'WORK',
    gloss: 'WORK',
    category: 'Hành động cơ bản',
    categoryIndex: 6,
    meaningVi: 'Làm việc',
    descriptionVi: 'Hai nắm tay gập, cườm tay phải gõ 2 lần lên cườm tay trái',
    synonyms: ['work', 'làm việc', 'công việc', 'lao động'],
    duration: 1000,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'fist', location: 'front', motion: 'tap', twoHanded: true }
  },
  {
    key: 'LEARN',
    gloss: 'LEARN',
    category: 'Hành động cơ bản',
    categoryIndex: 6,
    meaningVi: 'Học tập',
    descriptionVi: 'Tay phải bốc từ lòng bàn tay trái đưa lên đặt vào trán',
    synonyms: ['learn', 'study', 'học', 'học tập', 'nghiên cứu'],
    duration: 1050,
    nmm: { smile: 0.4, eyebrows: 'neutral' },
    config: { handshape: 'pinch', location: 'forehead', motion: 'push', twoHanded: true }
  },
  {
    key: 'TEACH',
    gloss: 'TEACH',
    category: 'Hành động cơ bản',
    categoryIndex: 6,
    meaningVi: 'Dạy học',
    descriptionVi: 'Hai bàn tay chữ O chụm từ gần thái dương đẩy về phía trước',
    synonyms: ['teach', 'dạy', 'dạy học', 'giảng dạy'],
    duration: 1000,
    nmm: { smile: 0.4, eyebrows: 'neutral' },
    config: { handshape: 'pinch', location: 'front', motion: 'push', twoHanded: true }
  },
  {
    key: 'SEE',
    gloss: 'SEE',
    category: 'Hành động cơ bản',
    categoryIndex: 6,
    meaningVi: 'Nhìn thấy',
    descriptionVi: 'Hai ngón tay chữ V từ dưới mắt đẩy thẳng ra phía trước',
    synonyms: ['see', 'look', 'watch', 'nhìn', 'thấy', 'nhìn thấy', 'xem'],
    duration: 900,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'peace', location: 'chin', motion: 'push', twoHanded: false }
  },
  {
    key: 'HEAR',
    gloss: 'HEAR',
    category: 'Hành động cơ bản',
    categoryIndex: 6,
    meaningVi: 'Nghe',
    descriptionVi: 'Ngón trỏ chỉ vào tai hoặc bàn tay khum sau vành tai',
    synonyms: ['hear', 'listen', 'nghe', 'lắng nghe'],
    duration: 900,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'point', location: 'forehead', motion: 'tap', twoHanded: false }
  },
  {
    key: 'SPEAK',
    gloss: 'SPEAK',
    category: 'Hành động cơ bản',
    categoryIndex: 6,
    meaningVi: 'Nói',
    descriptionVi: 'Ngón trỏ xoay vòng nhẹ trước miệng phát ra lời nói',
    synonyms: ['speak', 'say', 'talk', 'nói', 'phát biểu', 'trò chuyện'],
    duration: 950,
    nmm: { smile: 0.3, mouthOpen: 0.2 },
    config: { handshape: 'point', location: 'mouth', motion: 'rotate', twoHanded: false }
  },
  {
    key: 'SIGN',
    gloss: 'SIGN',
    category: 'Hành động cơ bản',
    categoryIndex: 6,
    meaningVi: 'Ra ký hiệu',
    descriptionVi: 'Hai ngón trỏ vẽ vòng tròn luân phiên nhịp nhàng trước ngực',
    synonyms: ['sign', 'ký hiệu', 'ra ký hiệu', 'ngôn ngữ ký hiệu', 'giao tiếp ký hiệu'],
    duration: 1100,
    nmm: { smile: 0.5, eyebrows: 'neutral' },
    config: { handshape: 'point', location: 'front', motion: 'rotate', twoHanded: true }
  },
  {
    key: 'BUY',
    gloss: 'BUY',
    category: 'Hành động cơ bản',
    categoryIndex: 6,
    meaningVi: 'Mua',
    descriptionVi: 'Lưng bàn tay phải chụm từ lòng bàn tay trái đưa thẳng ra ngoài trao đổi',
    synonyms: ['buy', 'purchase', 'mua', 'mua sắm'],
    duration: 950,
    nmm: { smile: 0.4 },
    config: { handshape: 'flat', location: 'front', motion: 'push', twoHanded: true }
  },
  {
    key: 'GIVE',
    gloss: 'GIVE',
    category: 'Hành động cơ bản',
    categoryIndex: 6,
    meaningVi: 'Cho / Tặng',
    descriptionVi: 'Hai bàn tay chữ X hoặc phẳng từ ngực đẩy thẳng về phía đối phương',
    synonyms: ['give', 'cho', 'tặng', 'đưa', 'biếu'],
    duration: 950,
    nmm: { smile: 0.5 },
    config: { handshape: 'flat', location: 'front', motion: 'push', twoHanded: true }
  },
  {
    key: 'TAKE',
    gloss: 'TAKE',
    category: 'Hành động cơ bản',
    categoryIndex: 6,
    meaningVi: 'Lấy / Nhận',
    descriptionVi: 'Bàn tay mở từ xa thu lại thành nắm đấm kéo về phía mình',
    synonyms: ['take', 'lấy', 'nhận', 'cầm', 'thu nạp'],
    duration: 950,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'fist', location: 'chest', motion: 'pull', twoHanded: false }
  },
  {
    key: 'MAKE',
    gloss: 'MAKE',
    category: 'Hành động cơ bản',
    categoryIndex: 6,
    meaningVi: 'Làm / Chế tạo',
    descriptionVi: 'Hai nắm tay đặt chồng lên nhau xoắn ngược chiều 2 lần tạo ra thành phẩm',
    synonyms: ['make', 'create', 'làm', 'chế tạo', 'tạo ra', 'sản xuất'],
    duration: 1050,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'fist', location: 'front', motion: 'rotate', twoHanded: true }
  },
  {
    key: 'FINISH',
    gloss: 'FINISH',
    category: 'Hành động cơ bản',
    categoryIndex: 6,
    meaningVi: 'Đã xong / Hoàn thành',
    descriptionVi: 'Hai bàn tay mở ngửa rồi lật úp vung dứt khoát ra hai bên hoàn tất',
    synonyms: ['finish', 'done', 'đã xong', 'hoàn thành', 'xong', 'rồi'],
    duration: 950,
    nmm: { smile: 0.6, headNod: 0.2 },
    config: { handshape: 'flat', location: 'front', motion: 'brush', twoHanded: true }
  },
  {
    key: 'START',
    gloss: 'START',
    category: 'Hành động cơ bản',
    categoryIndex: 6,
    meaningVi: 'Bắt đầu',
    descriptionVi: 'Ngón trỏ phải cắm vào giữa ngón trỏ và giữa tay trái rồi xoay như chìa khóa khởi động',
    synonyms: ['start', 'begin', 'bắt đầu', 'khởi đầu', 'mở màn'],
    duration: 1000,
    nmm: { smile: 0.4 },
    config: { handshape: 'point', location: 'front', motion: 'rotate', twoHanded: true }
  },
  {
    key: 'REMEMBER',
    gloss: 'REMEMBER',
    category: 'Hành động cơ bản',
    categoryIndex: 6,
    meaningVi: 'Nhớ',
    descriptionVi: 'Ngón cái tay phải từ trán chạm xuống ngón cái tay trái trước ngực ghi nhớ',
    synonyms: ['remember', 'nhớ', 'ghi nhớ', 'tưởng nhớ'],
    duration: 1000,
    nmm: { smile: 0.35, headNod: 0.15 },
    config: { handshape: 'thumbsUp', location: 'front', motion: 'tap', twoHanded: true }
  },

  // ==========================================
  // NHÓM 7: Y tế, Khẩn cấp & An toàn (12 từ)
  // ==========================================
  {
    key: 'HOSPITAL',
    gloss: 'HOSPITAL',
    category: 'Y tế, Khẩn cấp & An toàn',
    categoryIndex: 7,
    meaningVi: 'Bệnh viện',
    descriptionVi: 'Ngón trỏ và giữa vẽ hình chữ thập (+) trên bắp tay trái',
    synonyms: ['hospital', 'bệnh viện', 'nhà thương', 'viện'],
    duration: 1100,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'peace', location: 'front', motion: 'cross', twoHanded: false }
  },
  {
    key: 'DOCTOR',
    gloss: 'DOCTOR',
    category: 'Y tế, Khẩn cấp & An toàn',
    categoryIndex: 7,
    meaningVi: 'Bác sĩ',
    descriptionVi: 'Đầu các ngón tay phải chụm gõ 2 lần lên vị trí bắt mạch ở cổ tay trái',
    synonyms: ['doctor', 'physician', 'bác sĩ', 'thầy thuốc', 'y sĩ'],
    duration: 1000,
    nmm: { smile: 0.2, eyebrows: 'neutral' },
    config: { handshape: 'pinch', location: 'front', motion: 'tap', twoHanded: true }
  },
  {
    key: 'MEDICINE',
    gloss: 'MEDICINE',
    category: 'Y tế, Khẩn cấp & An toàn',
    categoryIndex: 7,
    meaningVi: 'Thuốc',
    descriptionVi: 'Ngón giữa tay phải xoay tròn trên lòng bàn tay trái như nghiền thuốc',
    synonyms: ['medicine', 'drug', 'thuốc', 'uống thuốc', 'dược phẩm'],
    duration: 1000,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'point', location: 'front', motion: 'rotate', twoHanded: true }
  },
  {
    key: 'POLICE',
    gloss: 'POLICE',
    category: 'Y tế, Khẩn cấp & An toàn',
    categoryIndex: 7,
    meaningVi: 'Công an / Cảnh sát',
    descriptionVi: 'Bàn tay chữ C chạm vào ngực trái mô phỏng huy hiệu cảnh sát',
    synonyms: ['police', 'cảnh sát', 'công an', 'cảnh vệ'],
    duration: 950,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'cShape', location: 'chest', motion: 'tap', twoHanded: false }
  },
  {
    key: 'EMERGENCY',
    gloss: 'EMERGENCY',
    category: 'Y tế, Khẩn cấp & An toàn',
    categoryIndex: 7,
    meaningVi: 'Khẩn cấp',
    descriptionVi: 'Bàn tay chữ E lắc mạnh dứt khoát qua lại trước ngực báo động',
    synonyms: ['emergency', 'khẩn cấp', 'cấp cứu', 'nguy cấp'],
    duration: 950,
    nmm: { eyebrows: 'furrowed', headTilt: 0.08 },
    config: { handshape: 'fist', location: 'front', motion: 'shake', twoHanded: false }
  },
  {
    key: 'DANGER',
    gloss: 'DANGER',
    category: 'Y tế, Khẩn cấp & An toàn',
    categoryIndex: 7,
    meaningVi: 'Nguy hiểm',
    descriptionVi: 'Hai bàn tay nắm chữ A, ngón cái phải vuốt mạnh lướt qua ngón cái trái lên trên',
    synonyms: ['danger', 'dangerous', 'nguy hiểm', 'nguy nan'],
    duration: 950,
    nmm: { eyebrows: 'furrowed' },
    config: { handshape: 'thumbsUp', location: 'front', motion: 'brush', twoHanded: true }
  },
  {
    key: 'ACCIDENT',
    gloss: 'ACCIDENT',
    category: 'Y tế, Khẩn cấp & An toàn',
    categoryIndex: 7,
    meaningVi: 'Tai nạn',
    descriptionVi: 'Hai nắm tay từ hai bên lao vào va chạm mạnh vào nhau',
    synonyms: ['accident', 'tai nạn', 'sự cố', 'va chạm'],
    duration: 1000,
    nmm: { eyebrows: 'furrowed' },
    config: { handshape: 'fist', location: 'front', motion: 'tap', twoHanded: true }
  },
  {
    key: 'FEVER',
    gloss: 'FEVER',
    category: 'Y tế, Khẩn cấp & An toàn',
    categoryIndex: 7,
    meaningVi: 'Sốt',
    descriptionVi: 'Mu bàn tay phải đặt lên trán kiểm tra nhiệt độ cơ thể',
    synonyms: ['fever', 'sốt', 'bị sốt', 'nóng sốt'],
    duration: 950,
    nmm: { smile: 0.0, eyebrows: 'furrowed' },
    config: { handshape: 'flat', location: 'forehead', motion: 'tap', twoHanded: false }
  },
  {
    key: 'AMBULANCE',
    gloss: 'AMBULANCE',
    category: 'Y tế, Khẩn cấp & An toàn',
    categoryIndex: 7,
    meaningVi: 'Xe cấp cứu',
    descriptionVi: 'Bàn tay mở đưa lên cao xoay tròn nhấp nháy như còi đèn cứu thương',
    synonyms: ['ambulance', 'xe cấp cứu', 'xe cứu thương'],
    duration: 1050,
    nmm: { eyebrows: 'raised' },
    config: { handshape: 'flat', location: 'forehead', motion: 'rotate', twoHanded: false }
  },
  {
    key: 'FIRE',
    gloss: 'FIRE',
    category: 'Y tế, Khẩn cấp & An toàn',
    categoryIndex: 7,
    meaningVi: 'Cháy / Hỏa hoạn',
    descriptionVi: 'Hai bàn tay mở ngửa, các ngón tay nhấp nhô uốn lượn như ngọn lửa bốc lên',
    synonyms: ['fire', 'cháy', 'hỏa hoạn', 'lửa', 'bốc cháy'],
    duration: 1050,
    nmm: { eyebrows: 'raised' },
    config: { handshape: 'flat', location: 'front', motion: 'wave', twoHanded: true }
  },
  {
    key: 'SAFE',
    gloss: 'SAFE',
    category: 'Y tế, Khẩn cấp & An toàn',
    categoryIndex: 7,
    meaningVi: 'An toàn',
    descriptionVi: 'Hai nắm tay chữ S chéo trước ngực rồi mở bung ra hai bên thoát nạn',
    synonyms: ['safe', 'safety', 'an toàn', 'bảo trọng', 'bình an'],
    duration: 1000,
    nmm: { smile: 0.6, headNod: 0.2 },
    config: { handshape: 'flat', location: 'front', motion: 'openClose', twoHanded: true }
  },
  {
    key: 'CALL',
    gloss: 'CALL',
    category: 'Y tế, Khẩn cấp & An toàn',
    categoryIndex: 7,
    meaningVi: 'Gọi điện / Kêu cứu',
    descriptionVi: 'Bàn tay chữ Y áp tai hoặc bàn tay khum bên miệng gọi lớn',
    synonyms: ['call', 'gọi điện', 'gọi', 'kêu cứu', 'gọi giúp'],
    duration: 950,
    nmm: { smile: 0.3 },
    config: { handshape: 'yShape', location: 'forehead', motion: 'tap', twoHanded: false }
  },

  // ==========================================
  // NHÓM 8: Thời gian & Lịch trình (16 từ)
  // ==========================================
  {
    key: 'TIME',
    gloss: 'TIME',
    category: 'Thời gian & Lịch trình',
    categoryIndex: 8,
    meaningVi: 'Thời gian / Giờ',
    descriptionVi: 'Ngón trỏ phải gõ nhẹ 2 lần vào cổ tay trái vị trí đeo đồng hồ',
    synonyms: ['time', 'thời gian', 'giờ', 'lúc'],
    duration: 900,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'point', location: 'front', motion: 'tap', twoHanded: true }
  },
  {
    key: 'NOW',
    gloss: 'NOW',
    category: 'Thời gian & Lịch trình',
    categoryIndex: 8,
    meaningVi: 'Bây giờ / Hiện tại',
    descriptionVi: 'Hai bàn tay chữ Y nhấn nhẹ xuống 1 lần trước ngực dứt khoát',
    synonyms: ['now', 'bây giờ', 'hiện tại', 'ngay bây giờ', 'ngay'],
    duration: 850,
    nmm: { eyebrows: 'neutral', headNod: 0.15 },
    config: { handshape: 'yShape', location: 'front', motion: 'nod', twoHanded: true }
  },
  {
    key: 'TODAY',
    gloss: 'TODAY',
    category: 'Thời gian & Lịch trình',
    categoryIndex: 8,
    meaningVi: 'Hôm nay',
    descriptionVi: 'Hai bàn tay chữ Y nhấn nhẹ xuống 2 lần nhịp nhàng trước ngực',
    synonyms: ['today', 'hôm nay', 'ngày hôm nay'],
    duration: 1000,
    nmm: { smile: 0.4, headNod: 0.1 },
    config: { handshape: 'yShape', location: 'front', motion: 'nod', twoHanded: true }
  },
  {
    key: 'TOMORROW',
    gloss: 'TOMORROW',
    category: 'Thời gian & Lịch trình',
    categoryIndex: 8,
    meaningVi: 'Ngày mai',
    descriptionVi: 'Ngón cái bàn tay chữ A từ gò má đẩy xoay hướng về phía trước',
    synonyms: ['tomorrow', 'ngày mai', 'mai'],
    duration: 950,
    nmm: { smile: 0.4 },
    config: { handshape: 'thumbsUp', location: 'chin', motion: 'push', twoHanded: false }
  },
  {
    key: 'YESTERDAY',
    gloss: 'YESTERDAY',
    category: 'Thời gian & Lịch trình',
    categoryIndex: 8,
    meaningVi: 'Hôm qua',
    descriptionVi: 'Ngón cái bàn tay chữ A từ cằm/má vuốt ngược về phía sau tai',
    synonyms: ['yesterday', 'hôm qua', 'qua', 'ngày hôm qua'],
    duration: 950,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'thumbsUp', location: 'chin', motion: 'pull', twoHanded: false }
  },
  {
    key: 'DAY',
    gloss: 'DAY',
    category: 'Thời gian & Lịch trình',
    categoryIndex: 8,
    meaningVi: 'Ngày',
    descriptionVi: 'Cẳng tay phải giơ thẳng hạ dần vuông góc xuống cánh tay trái như mặt trời lặn',
    synonyms: ['day', 'ngày', 'ban ngày'],
    duration: 1000,
    nmm: { smile: 0.4 },
    config: { handshape: 'point', location: 'front', motion: 'pull', twoHanded: true }
  },
  {
    key: 'NIGHT',
    gloss: 'NIGHT',
    category: 'Thời gian & Lịch trình',
    categoryIndex: 8,
    meaningVi: 'Đêm',
    descriptionVi: 'Cổ tay phải khum cong gập qua cẳng tay trái như mặt trời lặn hẳn màn đêm bao phủ',
    synonyms: ['night', 'đêm', 'ban đêm', 'buổi tối', 'tối'],
    duration: 1000,
    nmm: { smile: 0.2 },
    config: { handshape: 'cup', location: 'front', motion: 'tap', twoHanded: true }
  },
  {
    key: 'MORNING',
    gloss: 'MORNING',
    category: 'Thời gian & Lịch trình',
    categoryIndex: 8,
    meaningVi: 'Buổi sáng',
    descriptionVi: 'Tay phải từ dưới luồn lên trước khuỷu tay trái như mặt trời mọc rạng ngời',
    synonyms: ['morning', 'buổi sáng', 'sáng', 'bình minh'],
    duration: 1050,
    nmm: { smile: 0.6, headTilt: 0.05 },
    config: { handshape: 'flat', location: 'front', motion: 'brush', twoHanded: true }
  },
  {
    key: 'AFTERNOON',
    gloss: 'AFTERNOON',
    category: 'Thời gian & Lịch trình',
    categoryIndex: 8,
    meaningVi: 'Buổi chiều',
    descriptionVi: 'Cánh tay phải hơi nghiêng hạ nhẹ trên cánh tay trái hoàng hôn',
    synonyms: ['afternoon', 'buổi chiều', 'chiều'],
    duration: 1000,
    nmm: { smile: 0.4 },
    config: { handshape: 'flat', location: 'front', motion: 'tap', twoHanded: true }
  },
  {
    key: 'WEEK',
    gloss: 'WEEK',
    category: 'Thời gian & Lịch trình',
    categoryIndex: 8,
    meaningVi: 'Tuần',
    descriptionVi: 'Ngón trỏ phải trượt ngang trên lòng bàn tay trái từ cổ tay đến ngón tay',
    synonyms: ['week', 'tuần', 'tuần lễ'],
    duration: 950,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'point', location: 'front', motion: 'brush', twoHanded: true }
  },
  {
    key: 'MONTH',
    gloss: 'MONTH',
    category: 'Thời gian & Lịch trình',
    categoryIndex: 8,
    meaningVi: 'Tháng',
    descriptionVi: 'Ngón trỏ phải vuốt dọc từ trên xuống dưới theo ngón trỏ trái',
    synonyms: ['month', 'tháng'],
    duration: 950,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'point', location: 'front', motion: 'brush', twoHanded: true }
  },
  {
    key: 'YEAR',
    gloss: 'YEAR',
    category: 'Thời gian & Lịch trình',
    categoryIndex: 8,
    meaningVi: 'Năm',
    descriptionVi: 'Hai nắm tay xoay tròn quanh nhau 1 vòng rồi tay phải đặt lên tay trái một chu kỳ',
    synonyms: ['year', 'năm'],
    duration: 1100,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'fist', location: 'front', motion: 'rotate', twoHanded: true }
  },
  {
    key: 'MINUTE',
    gloss: 'MINUTE',
    category: 'Thời gian & Lịch trình',
    categoryIndex: 8,
    meaningVi: 'Phút',
    descriptionVi: 'Ngón trỏ phải đặt trên lòng bàn tay trái nhích nhẹ như kim phút',
    synonyms: ['minute', 'phút', 'phút đồng hồ'],
    duration: 900,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'point', location: 'front', motion: 'tap', twoHanded: true }
  },
  {
    key: 'HOUR',
    gloss: 'HOUR',
    category: 'Thời gian & Lịch trình',
    categoryIndex: 8,
    meaningVi: 'Giờ đồng hồ',
    descriptionVi: 'Ngón trỏ phải quay đủ 1 vòng 360 độ trên lòng bàn tay trái',
    synonyms: ['hour', 'tiếng', 'giờ đồng hồ'],
    duration: 1050,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'point', location: 'front', motion: 'rotate', twoHanded: true }
  },
  {
    key: 'LATER',
    gloss: 'LATER',
    category: 'Thời gian & Lịch trình',
    categoryIndex: 8,
    meaningVi: 'Lát nữa / Sau này',
    descriptionVi: 'Bàn tay chữ L gập cổ tay đẩy nhẹ ngón trỏ về phía trước',
    synonyms: ['later', 'lát nữa', 'sau này', 'muộn hơn', 'chút nữa'],
    duration: 900,
    nmm: { smile: 0.3 },
    config: { handshape: 'point', location: 'front', motion: 'push', twoHanded: false }
  },
  {
    key: 'BEFORE',
    gloss: 'BEFORE',
    category: 'Thời gian & Lịch trình',
    categoryIndex: 8,
    meaningVi: 'Trước đây',
    descriptionVi: 'Bàn tay phẳng phải từ trước kéo ngược về phía vai quá khứ',
    synonyms: ['before', 'trước đây', 'trước', 'ngày trước'],
    duration: 950,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'flat', location: 'chest', motion: 'pull', twoHanded: false }
  },

  // ==========================================
  // NHÓM 9: Phương hướng, Địa điểm & Không gian (12 từ)
  // ==========================================
  {
    key: 'HERE',
    gloss: 'HERE',
    category: 'Phương hướng & Địa điểm',
    categoryIndex: 9,
    meaningVi: 'Ở đây',
    descriptionVi: 'Hai bàn tay ngửa xoay hai vòng tròn nhỏ trước hông xác định vị trí',
    synonyms: ['here', 'ở đây', 'đây', 'chỗ này'],
    duration: 950,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'flat', location: 'waist', motion: 'rotate', twoHanded: true }
  },
  {
    key: 'THERE',
    gloss: 'THERE',
    category: 'Phương hướng & Địa điểm',
    categoryIndex: 9,
    meaningVi: 'Ở đằng kia',
    descriptionVi: 'Ngón trỏ chỉ dứt khoát về hướng xa',
    synonyms: ['there', 'ở đằng kia', 'đằng kia', 'đó', 'kia'],
    duration: 850,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'point', location: 'front', motion: 'push', twoHanded: false }
  },
  {
    key: 'LEFT',
    gloss: 'LEFT',
    category: 'Phương hướng & Địa điểm',
    categoryIndex: 9,
    meaningVi: 'Bên trái',
    descriptionVi: 'Bàn tay chữ L di chuyển trượt sang phía bên trái',
    synonyms: ['left', 'bên trái', 'trái', 'phía trái'],
    duration: 900,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'point', location: 'front', motion: 'brush', twoHanded: false }
  },
  {
    key: 'RIGHT',
    gloss: 'RIGHT',
    category: 'Phương hướng & Địa điểm',
    categoryIndex: 9,
    meaningVi: 'Bên phải',
    descriptionVi: 'Bàn tay chữ R di chuyển trượt sang phía bên phải',
    synonyms: ['right', 'bên phải', 'phải', 'phía phải'],
    duration: 900,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'peace', location: 'front', motion: 'brush', twoHanded: false }
  },
  {
    key: 'STRAIGHT',
    gloss: 'STRAIGHT',
    category: 'Phương hướng & Địa điểm',
    categoryIndex: 9,
    meaningVi: 'Đi thẳng',
    descriptionVi: 'Bàn tay chữ B dựng đứng chém thẳng về phía trước theo hướng đi',
    synonyms: ['straight', 'đi thẳng', 'thẳng', 'thẳng tiến'],
    duration: 950,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'flat', location: 'front', motion: 'push', twoHanded: false }
  },
  {
    key: 'NEAR',
    gloss: 'NEAR',
    category: 'Phương hướng & Địa điểm',
    categoryIndex: 9,
    meaningVi: 'Gần',
    descriptionVi: 'Mu bàn tay phải vỗ nhẹ hướng về phía lòng bàn tay trái cự ly gần',
    synonyms: ['near', 'close', 'gần', 'gần đây', 'sát bên'],
    duration: 900,
    nmm: { smile: 0.3 },
    config: { handshape: 'flat', location: 'front', motion: 'tap', twoHanded: true }
  },
  {
    key: 'FAR',
    gloss: 'FAR',
    category: 'Phương hướng & Địa điểm',
    categoryIndex: 9,
    meaningVi: 'Xa',
    descriptionVi: 'Ngón trỏ phải từ ngón trỏ trái vươn xa về phía trước khoang không',
    synonyms: ['far', 'xa', 'ở xa', 'xa xôi'],
    duration: 1000,
    nmm: { eyebrows: 'raised' },
    config: { handshape: 'point', location: 'front', motion: 'push', twoHanded: true }
  },
  {
    key: 'SCHOOL',
    gloss: 'SCHOOL',
    category: 'Phương hướng & Địa điểm',
    categoryIndex: 9,
    meaningVi: 'Trường học',
    descriptionVi: 'Hai lòng bàn tay phẳng vỗ vào nhau theo chiều ngang 2 lần',
    synonyms: ['school', 'trường học', 'trường', 'lớp học'],
    duration: 1000,
    nmm: { smile: 0.4 },
    config: { handshape: 'flat', location: 'front', motion: 'tap', twoHanded: true }
  },
  {
    key: 'MARKET',
    gloss: 'MARKET',
    category: 'Phương hướng & Địa điểm',
    categoryIndex: 9,
    meaningVi: 'Chợ / Cửa hàng',
    descriptionVi: 'Hai bàn tay chụm ngón hướng xuống lắc nhẹ như xách túi hàng',
    synonyms: ['market', 'store', 'chợ', 'cửa hàng', 'tiệm'],
    duration: 1000,
    nmm: { smile: 0.4 },
    config: { handshape: 'pinch', location: 'front', motion: 'shake', twoHanded: true }
  },
  {
    key: 'STREET',
    gloss: 'STREET',
    category: 'Phương hướng & Địa điểm',
    categoryIndex: 9,
    meaningVi: 'Đường phố',
    descriptionVi: 'Hai bàn tay phẳng song song đẩy thẳng về phía trước tạo con đường',
    synonyms: ['street', 'road', 'đường phố', 'đường', 'phố', 'tuyến đường'],
    duration: 1000,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'flat', location: 'front', motion: 'push', twoHanded: true }
  },
  {
    key: 'CITY',
    gloss: 'CITY',
    category: 'Phương hướng & Địa điểm',
    categoryIndex: 9,
    meaningVi: 'Thành phố',
    descriptionVi: 'Đầu các ngón tay của hai bàn tay chạm nhau rồi xoay tạo nhiều mái nhà',
    synonyms: ['city', 'thành phố', 'đô thị'],
    duration: 1100,
    nmm: { smile: 0.35 },
    config: { handshape: 'flat', location: 'front', motion: 'openClose', twoHanded: true }
  },
  {
    key: 'VIETNAM',
    gloss: 'VIETNAM',
    category: 'Phương hướng & Địa điểm',
    categoryIndex: 9,
    meaningVi: 'Việt Nam',
    descriptionVi: 'Ngón trỏ vẽ đường cong chữ S mềm mại trong không gian hình đất nước',
    synonyms: ['vietnam', 'việt nam', 'nước việt nam', 'dải đất hình chữ s'],
    duration: 1150,
    nmm: { smile: 0.8, headTilt: 0.05, headNod: 0.1 },
    config: { handshape: 'point', location: 'front', motion: 'sCurve', twoHanded: false }
  },

  // ==========================================
  // NHÓM 10: Tính chất, Màu sắc & Bổ trợ (12 từ)
  // ==========================================
  {
    key: 'BIG',
    gloss: 'BIG',
    category: 'Tính chất & Màu sắc',
    categoryIndex: 10,
    meaningVi: 'To lớn',
    descriptionVi: 'Hai bàn tay chữ L cong mở rộng sang hai bên kích thước lớn',
    synonyms: ['big', 'large', 'to lớn', 'lớn', 'to', 'khổng lồ'],
    duration: 1000,
    nmm: { eyebrows: 'raised', smile: 0.4 },
    config: { handshape: 'cup', location: 'front', motion: 'openClose', twoHanded: true }
  },
  {
    key: 'SMALL',
    gloss: 'SMALL',
    category: 'Tính chất & Màu sắc',
    categoryIndex: 10,
    meaningVi: 'Nhỏ bé',
    descriptionVi: 'Hai bàn tay phẳng ép lại gần nhau thu hẹp khoảng cách bé xíu',
    synonyms: ['small', 'little', 'nhỏ bé', 'nhỏ', 'bé', 'tí hon'],
    duration: 950,
    nmm: { smile: 0.3 },
    config: { handshape: 'flat', location: 'front', motion: 'pull', twoHanded: true }
  },
  {
    key: 'NEW',
    gloss: 'NEW',
    category: 'Tính chất & Màu sắc',
    categoryIndex: 10,
    meaningVi: 'Mới',
    descriptionVi: 'Lưng bàn tay phải cào nhẹ trên lòng bàn tay trái từ ngoài vào trong',
    synonyms: ['new', 'mới', 'mới mẻ', 'tươi mới'],
    duration: 950,
    nmm: { smile: 0.6 },
    config: { handshape: 'cup', location: 'front', motion: 'brush', twoHanded: true }
  },
  {
    key: 'OLD',
    gloss: 'OLD',
    category: 'Tính chất & Màu sắc',
    categoryIndex: 10,
    meaningVi: 'Cũ / Già',
    descriptionVi: 'Nắm tay chữ C kéo từ cằm xuống như vuốt chòm râu dài',
    synonyms: ['old', 'cũ', 'già', 'cao tuổi', 'cổ'],
    duration: 950,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'cShape', location: 'chin', motion: 'pull', twoHanded: false }
  },
  {
    key: 'FAST',
    gloss: 'FAST',
    category: 'Tính chất & Màu sắc',
    categoryIndex: 10,
    meaningVi: 'Nhanh chóng',
    descriptionVi: 'Hai ngón trỏ co giật nhanh về phía sau như bóp cò súng tốc độ',
    synonyms: ['fast', 'quick', 'nhanh chóng', 'nhanh', 'mau'],
    duration: 800,
    nmm: { smile: 0.4 },
    config: { handshape: 'point', location: 'front', motion: 'pull', twoHanded: true }
  },
  {
    key: 'SLOW',
    gloss: 'SLOW',
    category: 'Tính chất & Màu sắc',
    categoryIndex: 10,
    meaningVi: 'Chậm chạp',
    descriptionVi: 'Bàn tay phải vuốt rất chậm từ cổ tay lên cẳng tay trái từ từ',
    synonyms: ['slow', 'chậm chạp', 'chậm', 'từ từ'],
    duration: 1150,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'flat', location: 'front', motion: 'brush', twoHanded: true }
  },
  {
    key: 'EASY',
    gloss: 'EASY',
    category: 'Tính chất & Màu sắc',
    categoryIndex: 10,
    meaningVi: 'Dễ dàng',
    descriptionVi: 'Đầu ngón tay phải hất nhẹ vào mu ngón tay trái 2 lần đơn giản',
    synonyms: ['easy', 'dễ dàng', 'dễ', 'đơn giản'],
    duration: 900,
    nmm: { smile: 0.7, headNod: 0.15 },
    config: { handshape: 'flat', location: 'front', motion: 'brush', twoHanded: true }
  },
  {
    key: 'DIFFICULT',
    gloss: 'DIFFICULT',
    category: 'Tính chất & Màu sắc',
    categoryIndex: 10,
    meaningVi: 'Khó khăn',
    descriptionVi: 'Hai ngón tay chữ V gập gõ chéo vào nhau 2 lần nan giải',
    synonyms: ['difficult', 'hard', 'khó khăn', 'khó', 'gian nan'],
    duration: 1000,
    nmm: { smile: 0.0, eyebrows: 'furrowed' },
    config: { handshape: 'peace', location: 'front', motion: 'tap', twoHanded: true }
  },
  {
    key: 'RED',
    gloss: 'RED',
    category: 'Tính chất & Màu sắc',
    categoryIndex: 10,
    meaningVi: 'Màu đỏ',
    descriptionVi: 'Ngón trỏ vuốt từ môi dưới xuống cằm như son môi đỏ',
    synonyms: ['red', 'màu đỏ', 'đỏ'],
    duration: 900,
    nmm: { smile: 0.4 },
    config: { handshape: 'point', location: 'chin', motion: 'pull', twoHanded: false }
  },
  {
    key: 'BLUE',
    gloss: 'BLUE',
    category: 'Tính chất & Màu sắc',
    categoryIndex: 10,
    meaningVi: 'Màu xanh dương',
    descriptionVi: 'Bàn tay chữ B lắc nhẹ cổ tay sang hai bên sắc xanh',
    synonyms: ['blue', 'màu xanh dương', 'xanh dương', 'xanh biển', 'xanh da trời'],
    duration: 950,
    nmm: { smile: 0.4 },
    config: { handshape: 'flat', location: 'front', motion: 'shake', twoHanded: false }
  },
  {
    key: 'WHITE',
    gloss: 'WHITE',
    category: 'Tính chất & Màu sắc',
    categoryIndex: 10,
    meaningVi: 'Màu trắng',
    descriptionVi: 'Các đầu ngón tay chạm ngực rồi kéo ra chụm lại như kéo sợi vải trắng tinh khiết',
    synonyms: ['white', 'màu trắng', 'trắng'],
    duration: 950,
    nmm: { smile: 0.5 },
    config: { handshape: 'flat', location: 'chest', motion: 'pull', twoHanded: false }
  },
  {
    key: 'BLACK',
    gloss: 'BLACK',
    category: 'Tính chất & Màu sắc',
    categoryIndex: 10,
    meaningVi: 'Màu đen',
    descriptionVi: 'Ngón trỏ vuốt ngang qua đường chân mày từ trái sang phải màu đen huyền',
    synonyms: ['black', 'màu đen', 'đen'],
    duration: 900,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'point', location: 'forehead', motion: 'brush', twoHanded: false }
  }
];

// Additional helper signs supporting the 35 conversational sentences
export const WLASL_HELPER_SIGNS: WLASLSignDefinition[] = [
  {
    key: 'LOST',
    gloss: 'LOST',
    category: 'Phương hướng & Địa điểm',
    categoryIndex: 9,
    meaningVi: 'Lạc đường',
    descriptionVi: 'Hai bàn tay mở hạ xuống như đánh mất phương hướng, nét mặt bối rối',
    synonyms: ['lost', 'lạc đường', 'bị lạc', 'lạc'],
    duration: 1000,
    nmm: { smile: 0.0, eyebrows: 'furrowed', headTilt: 0.1 },
    config: { handshape: 'flat', location: 'front', motion: 'pull', twoHanded: true }
  },
  {
    key: 'LATE',
    gloss: 'LATE',
    category: 'Thời gian & Lịch trình',
    categoryIndex: 8,
    meaningVi: 'Đến trễ / Muộn',
    descriptionVi: 'Bàn tay phải vẫy gập cổ tay ở ngang hông hướng về sau biểu thị trễ muộn',
    synonyms: ['late', 'trễ', 'muộn', 'đến trễ', 'đến muộn'],
    duration: 950,
    nmm: { smile: 0.0, eyebrows: 'furrowed', headTilt: 0.08 },
    config: { handshape: 'flat', location: 'waist', motion: 'wave', twoHanded: false }
  },
  {
    key: 'THIS',
    gloss: 'THIS',
    category: 'Phương hướng & Địa điểm',
    categoryIndex: 9,
    meaningVi: 'Cái này / Đây',
    descriptionVi: 'Ngón trỏ chỉ thẳng xuống vị trí vật thể ngay trước mặt',
    synonyms: ['this', 'cái này', 'này', 'đây'],
    duration: 800,
    nmm: { eyebrows: 'neutral' },
    config: { handshape: 'point', location: 'front', motion: 'push', twoHanded: false }
  }
];

// Verify total exactly 150
if (WLASL_150_SIGNS.length !== 150) {
  console.warn(`[WLASL] Expected 150 signs, found ${WLASL_150_SIGNS.length}`);
}

/**
 * Combined core and helper signs
 */
export const ALL_WLASL_SIGNS = [...WLASL_150_SIGNS, ...WLASL_HELPER_SIGNS];

/**
 * Keyed dictionary of all 150 signs and helpers
 */
export const WLASL_SIGN_MAP: Record<string, WLASLSignDefinition> = {};
for (const sign of ALL_WLASL_SIGNS) {
  WLASL_SIGN_MAP[sign.key] = sign;
}

/**
 * Procedural frames cache for all signs
 */
export const WLASL_FRAMES: Record<string, any[]> = {};
for (const sign of ALL_WLASL_SIGNS) {
  WLASL_FRAMES[sign.key] = generateProceduralKeyframes({
    handshape: sign.config.handshape,
    location: sign.config.location,
    motion: sign.config.motion,
    twoHanded: sign.config.twoHanded,
    nmm: sign.nmm
  });
}

/**
 * Check if a word or key is in the WLASL set
 */
export function isWlaslWord(term: string): boolean {
  const clean = term.toLowerCase().trim();
  const upper = term.toUpperCase().trim().replace(/[-\s]/g, '_');
  if (WLASL_SIGN_MAP[upper]) return true;

  for (const sign of ALL_WLASL_SIGNS) {
    if (sign.synonyms.includes(clean)) return true;
  }
  return false;
}
