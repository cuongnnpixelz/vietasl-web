// @ts-nocheck
// Sign Dictionary & Lexicon Database for ASL and VSL
// Provides gloss mappings, grammar metadata, and animation keyframe descriptors
import { BUILTIN_EXTENDED_SIGNS } from './signLearner';
import { ALL_WLASL_SIGNS, WLASL_SIGN_MAP, WLASL_FRAMES } from './wlaslSigns';
import { SignDefinition } from './proceduralSignGenerator';
import { lookupCustomSign, CUSTOM_SIGNS } from './customSigns';

export const SUPPORTED_LANGUAGES = [
  { code: 'en-US', lang: 'en', name: 'English', flag: '🇺🇸', defaultSign: 'asl' },
  { code: 'vi-VN', lang: 'vi', name: 'Tiếng Việt', flag: '🇻🇳', defaultSign: 'vsl' },
];

export const SUPPORTED_SIGN_LANGUAGES = [
  { code: 'asl', name: 'ASL - American Sign Language', flag: '🇺🇸', region: 'Hoa Kỳ / Quốc tế' },
  { code: 'vsl', name: 'VSL - Ngôn ngữ ký hiệu Việt Nam', flag: '🇻🇳', region: 'Việt Nam' },
];

// Predefined Lexicon of Signs with keyframes metadata
export const SIGN_LEXICON = {
  // GREETINGS & COURTESY
  HELLO: {
    asl: { gloss: 'HELLO', duration: 1100, nmm: { eyebrows: 'neutral', smile: 0.6, headTilt: 0.05 }, desc: 'Vẫy tay chào từ thái dương ra ngoài' },
    vsl: { gloss: 'XIN CHÀO', duration: 1100, nmm: { eyebrows: 'neutral', smile: 0.8, headTilt: 0.05 }, desc: 'Bàn tay mở hướng trước trán gật nhẹ chào' },
  },
  GOODBYE: {
    asl: { gloss: 'GOODBYE', duration: 1000, nmm: { eyebrows: 'neutral', smile: 0.5 }, desc: 'Vẫy cả 4 ngón tay chào tạm biệt' },
    vsl: { gloss: 'TẠM BIỆT', duration: 1000, nmm: { eyebrows: 'neutral', smile: 0.5 }, desc: 'Vẫy cả bàn tay' },
  },
  THANK_YOU: {
    asl: { gloss: 'THANK-YOU', duration: 1000, nmm: { eyebrows: 'neutral', smile: 0.7, headTilt: 0.1 }, desc: 'Đặt tay từ cằm đưa ra phía trước' },
    vsl: { gloss: 'CẢM ƠN', duration: 1000, nmm: { eyebrows: 'neutral', smile: 0.8, headNod: 0.2 }, desc: 'Đặt tay từ ngực hoặc cằm đưa ra với nụ cười' },
  },
  PLEASE: {
    asl: { gloss: 'PLEASE', duration: 1100, nmm: { eyebrows: 'neutral', smile: 0.4 }, desc: 'Xoa tròn lòng bàn tay phẳng trước ngực' },
    vsl: { gloss: 'LÀM ƠN / XIN', duration: 1100, nmm: { eyebrows: 'raised', smile: 0.3 }, desc: 'Hai tay chắp nhẹ hoặc tay phẳng xoa ngực' },
  },
  WELCOME: {
    asl: { gloss: 'WELCOME', duration: 1000, nmm: { smile: 0.7 }, desc: 'Đưa tay từ ngoài vào đón chào' },
    vsl: { gloss: 'CHÀO MỪNG', duration: 1000, nmm: { smile: 0.8 }, desc: 'Hai tay mở rộng đón chào' },
  },

  // PRONOUNS
  YOU: {
    asl: { gloss: 'YOU', duration: 750, nmm: { eyebrows: 'neutral' }, desc: 'Chỉ ngón trỏ về phía người đối diện' },
    vsl: { gloss: 'BẠN', duration: 750, nmm: { eyebrows: 'neutral' }, desc: 'Chỉ ngón trỏ về phía người đối diện' },
  },
  ME: {
    asl: { gloss: 'ME / I', duration: 750, nmm: { eyebrows: 'neutral' }, desc: 'Chỉ ngón trỏ vào giữa ngực mình' },
    vsl: { gloss: 'TÔI / MÌNH', duration: 750, nmm: { eyebrows: 'neutral' }, desc: 'Chỉ ngón trỏ vào ngực' },
  },
  YOUR: {
    asl: { gloss: 'YOUR', duration: 800, nmm: { eyebrows: 'neutral' }, desc: 'Mở phẳng bàn tay hướng về phía người đối diện' },
    vsl: { gloss: 'CỦA BẠN', duration: 800, nmm: { eyebrows: 'neutral' }, desc: 'Lòng bàn tay mở đẩy nhẹ về phía đối phương' },
  },
  MY: {
    asl: { gloss: 'MY', duration: 800, nmm: { eyebrows: 'neutral' }, desc: 'Đặt lòng bàn tay phẳng áp lên ngực' },
    vsl: { gloss: 'CỦA TÔI', duration: 800, nmm: { eyebrows: 'neutral' }, desc: 'Bàn tay mở áp nhẹ lên ngực' },
  },

  // NOUNS & KEYWORDS
  NAME: {
    asl: { gloss: 'NAME', duration: 1000, nmm: { eyebrows: 'neutral' }, desc: 'Hai ngón tay chữ H/U chạm nhau 2 lần' },
    vsl: { gloss: 'TÊN', duration: 1000, nmm: { eyebrows: 'neutral' }, desc: 'Ngón cái và ngón trỏ chạm nhau gần ngực/vai' },
  },
  NICE: {
    asl: { gloss: 'NICE', duration: 850, nmm: { smile: 0.5 }, desc: 'Một tay trượt phẳng trên lòng bàn tay kia' },
    vsl: { gloss: 'TỐT / ĐẸP', duration: 850, nmm: { smile: 0.6 }, desc: 'Vuốt nhẹ cằm hoặc giơ ngón cái ngợi khen' },
  },
  MEET: {
    asl: { gloss: 'MEET', duration: 950, nmm: { smile: 0.4 }, desc: 'Hai ngón trỏ hướng lên di chuyển lại gần nhau' },
    vsl: { gloss: 'GẶP', duration: 950, nmm: { smile: 0.4 }, desc: 'Hai bàn tay chụm lại gặp nhau trước ngực' },
  },
  HELP: {
    asl: { gloss: 'HELP', duration: 900, nmm: { eyebrows: 'raised' }, desc: 'Bàn tay nắm đặt trên lòng bàn tay phẳng nâng lên' },
    vsl: { gloss: 'GIÚP ĐỠ', duration: 900, nmm: { eyebrows: 'raised' }, desc: 'Một tay đỡ dưới cùi chỏ hoặc đẩy tay kia giúp đỡ' },
  },
  LOVE: {
    asl: { gloss: 'LOVE', duration: 1200, nmm: { smile: 0.8 }, desc: 'Hai cánh tay bắt chéo ôm chặt trước ngực' },
    vsl: { gloss: 'YÊU', duration: 1200, nmm: { smile: 0.8 }, desc: 'Hai tay chéo ôm trước ngực hoặc vuốt má' },
  },
  LEARN: {
    asl: { gloss: 'LEARN', duration: 1100, nmm: { eyebrows: 'neutral' }, desc: 'Lấy kiến thức từ lòng bàn tay đưa lên trán' },
    vsl: { gloss: 'HỌC', duration: 1100, nmm: { eyebrows: 'neutral' }, desc: 'Bốc kiến thức từ bàn tay đưa lên thái dương' },
  },
  SIGN_LANGUAGE: {
    asl: { gloss: 'SIGN-LANGUAGE', duration: 1300, nmm: { smile: 0.3 }, desc: 'Hai tay xoay tròn xen kẽ mô phỏng ký hiệu' },
    vsl: { gloss: 'NGÔN NGỮ KÝ HIỆU', duration: 1300, nmm: { smile: 0.4 }, desc: 'Hai bàn tay vẫy và xoay tròn biểu diễn ký hiệu' },
  },
  FRIEND: {
    asl: { gloss: 'FRIEND', duration: 1000, nmm: { smile: 0.6 }, desc: 'Hai ngón trỏ móc vào nhau đan xen' },
    vsl: { gloss: 'BẠN BÈ', duration: 1000, nmm: { smile: 0.6 }, desc: 'Hai tay nắm bắt chặt tình bạn' },
  },
  YES: {
    asl: { gloss: 'YES', duration: 800, nmm: { headNod: 0.4, smile: 0.3 }, desc: 'Nắm tay gật lên xuống như đầu gật' },
    vsl: { gloss: 'CÓ / ĐÚNG', duration: 800, nmm: { headNod: 0.5, smile: 0.3 }, desc: 'Ngón trỏ gật hoặc bàn tay gật xác nhận' },
  },
  NO: {
    asl: { gloss: 'NO', duration: 800, nmm: { headShake: 0.4, eyebrows: 'furrowed' }, desc: 'Ngón trỏ và giữa chạm ngón cái nhanh dứt khoát' },
    vsl: { gloss: 'KHÔNG', duration: 800, nmm: { headShake: 0.5, eyebrows: 'furrowed' }, desc: 'Ngón trỏ lắc qua lại trước ngực' },
  },

  // QUESTIONS (WH-WORDS)
  WHAT: {
    asl: { gloss: 'WHAT', duration: 900, nmm: { eyebrows: 'furrowed', headTilt: 0.1 }, desc: 'Hai bàn tay mở hướng lên lắc nhẹ qua lại' },
    vsl: { gloss: 'GÌ / CÁI GÌ', duration: 900, nmm: { eyebrows: 'furrowed', headTilt: 0.1 }, desc: 'Ngón trỏ lắc hoặc hai tay ngửa lắc nhẹ' },
  },
  WHERE: {
    asl: { gloss: 'WHERE', duration: 900, nmm: { eyebrows: 'furrowed', headTilt: 0.1 }, desc: 'Ngón trỏ hướng lên lắc qua lại' },
    vsl: { gloss: 'Ở ĐÂU', duration: 900, nmm: { eyebrows: 'furrowed', headTilt: 0.1 }, desc: 'Hai tay ngửa đẩy tới trước hoặc chỉ hướng thắc mắc' },
  },
  HOW: {
    asl: { gloss: 'HOW', duration: 900, nmm: { eyebrows: 'furrowed', headTilt: 0.15 }, desc: 'Hai nắm tay úp vào nhau xoay ngửa lên' },
    vsl: { gloss: 'NHƯ THẾ NÀO', duration: 900, nmm: { eyebrows: 'furrowed', headTilt: 0.15 }, desc: 'Hai tay xoay ngửa mở ra' },
  },
  WHY: {
    asl: { gloss: 'WHY', duration: 950, nmm: { eyebrows: 'furrowed', headTilt: 0.15 }, desc: 'Ngón tay từ trán kéo ra biến thành chữ Y' },
    vsl: { gloss: 'TẠI SAO', duration: 950, nmm: { eyebrows: 'furrowed', headTilt: 0.15 }, desc: 'Chỉ tay thái dương kéo ra thắc mắc' },
  },
  WHO: {
    asl: { gloss: 'WHO', duration: 900, nmm: { eyebrows: 'furrowed', headTilt: 0.1 }, desc: 'Ngón cái đặt ở cằm, ngón trỏ uốn cong gật nhẹ' },
    vsl: { gloss: 'AI', duration: 900, nmm: { eyebrows: 'furrowed', headTilt: 0.1 }, desc: 'Ngón trỏ vẽ vòng tròn trước mặt hỏi người' },
  },

  // TIME & DAYS (FROM REFERENCE VIDEO)
  TODAY: {
    asl: { gloss: 'TODAY', duration: 1000, nmm: { eyebrows: 'neutral', headNod: 0.1 }, desc: 'Hai bàn tay chữ Y nhấn xuống 2 lần' },
    vsl: { gloss: 'HÔM NAY', duration: 1000, nmm: { eyebrows: 'neutral', headNod: 0.1 }, desc: 'Hai tay chỉ xuống phía trước biểu thị hiện tại' },
  },
  FRIDAY: {
    asl: { gloss: 'FRIDAY', duration: 1100, nmm: { smile: 0.8, headTilt: 0.08 }, desc: 'Bàn tay chữ F xoay tròn nhẹ vui vẻ' },
    vsl: { gloss: 'THỨ SÁU', duration: 1100, nmm: { smile: 0.8, headTilt: 0.08 }, desc: 'Ngón tay biểu thị thứ sáu' },
  },
  FINE: {
    asl: { gloss: 'FINE / WELL', duration: 950, nmm: { smile: 0.8, headNod: 0.2 }, desc: 'Ngón cái bàn tay số 5 chạm nhẹ vào ngực' },
    vsl: { gloss: 'KHỎE / TỐT', duration: 950, nmm: { smile: 0.8, headNod: 0.2 }, desc: 'Bàn tay thể hiện khỏe khoắn tốt lành' },
  },
  WISH: {
    asl: { gloss: 'WISH', duration: 1000, nmm: { smile: 0.7 }, desc: 'Bàn tay chữ C trượt nhẹ xuống ngực thể hiện mong ước' },
    vsl: { gloss: 'CHÚC / MONG', duration: 1000, nmm: { smile: 0.7 }, desc: 'Hai tay đưa tới trước chúc điều lành' },
  },
  HAPPY: {
    asl: { gloss: 'HAPPY', duration: 1000, nmm: { smile: 0.95, eyebrows: 'raised' }, desc: 'Bàn tay vỗ nhẹ hướng lên trước ngực thể hiện vui tươi' },
    vsl: { gloss: 'VUI VẺ / HẠNH PHÚC', duration: 1000, nmm: { smile: 0.95, eyebrows: 'raised' }, desc: 'Hai tay xoa ngực mỉm cười rạng rỡ' },
  },
  UNDERSTAND: {
    asl: { gloss: 'UNDERSTAND', duration: 900, nmm: { headNod: 0.3, eyebrows: 'raised' }, desc: 'Ngón trỏ bật lên cạnh trán như bóng đèn sáng' },
    vsl: { gloss: 'HIỂU', duration: 900, nmm: { headNod: 0.4, smile: 0.3 }, desc: 'Tay gõ nhẹ trán rồi gật đầu' },
  },
};

// Word normalization dictionary mapping common synonyms / inflections to Lexicon keys
export const SYNONYM_MAP = {
  // English
  'hi': 'HELLO',
  'hey': 'HELLO',
  'hello': 'HELLO',
  'greetings': 'HELLO',
  'bye': 'GOODBYE',
  'goodbye': 'GOODBYE',
  'farewell': 'GOODBYE',
  'thanks': 'THANK_YOU',
  'thank': 'THANK_YOU',
  'thankyou': 'THANK_YOU',
  'thank you': 'THANK_YOU',
  'you': 'YOU',
  'your': 'YOUR',
  'yours': 'YOUR',
  'me': 'ME',
  'i': 'ME',
  'my': 'MY',
  'mine': 'MY',
  'name': 'NAME',
  'called': 'NAME',
  'nice': 'NICE',
  'good': 'NICE',
  'great': 'NICE',
  'meet': 'MEET',
  'meeting': 'MEET',
  'please': 'PLEASE',
  'welcome': 'WELCOME',
  'help': 'HELP',
  'assist': 'HELP',
  'love': 'LOVE',
  'like': 'LOVE',
  'learn': 'LEARN',
  'study': 'LEARN',
  'sign': 'SIGN_LANGUAGE',
  'signing': 'SIGN_LANGUAGE',
  'friend': 'FRIEND',
  'yes': 'YES',
  'yeah': 'YES',
  'no': 'NO',
  'nope': 'NO',
  'what': 'WHAT',
  'where': 'WHERE',
  'how': 'HOW',
  'why': 'WHY',
  'who': 'WHO',
  'understand': 'UNDERSTAND',
  'know': 'UNDERSTAND',
  'go': 'GO',
  'going': 'GO',
  'happy': 'HAPPY',
  'glad': 'HAPPY',
  'today': 'TODAY',
  'now': 'TODAY',
  'friday': 'FRIDAY',
  'fine': 'FINE',
  'well': 'FINE',
  'wish': 'WISH',
  'hope': 'WISH',

  // Vietnamese
  'hôm nay': 'TODAY',
  'bữa nay': 'TODAY',
  'thứ sáu': 'FRIDAY',
  'thứ 6': 'FRIDAY',
  'khỏe': 'FINE',
  'khoẻ': 'FINE',
  'ổn': 'FINE',
  'chúc': 'WISH',
  'ước': 'WISH',
  'chào': 'HELLO',
  'xin chào': 'HELLO',
  'chào bạn': 'HELLO',
  'alo': 'HELLO',
  'tạm biệt': 'GOODBYE',
  'hẹn gặp lại': 'GOODBYE',
  'cảm ơn': 'THANK_YOU',
  'cám ơn': 'THANK_YOU',
  'cảm ơn bạn': 'THANK_YOU',
  'bạn': 'YOU',
  'anh': 'YOU',
  'chị': 'YOU',
  'em': 'YOU',
  'tôi': 'ME',
  'mình': 'ME',
  'tớ': 'ME',
  'tên': 'NAME',
  'đẹp': 'NICE',
  'tốt': 'NICE',
  'vui': 'HAPPY',
  'vui vẻ': 'HAPPY',
  'hạnh phúc': 'HAPPY',
  'gặp': 'MEET',
  'quen': 'MEET',
  'làm ơn': 'PLEASE',
  'xin': 'PLEASE',
  'giúp': 'HELP',
  'giúp đỡ': 'HELP',
  'giúp tôi': 'HELP',
  'cứu': 'HELP',
  'yêu': 'LOVE',
  'thương': 'LOVE',
  'yêu thương': 'LOVE',
  'thích': 'LOVE',
  'học': 'LEARN',
  'ký hiệu': 'SIGN_LANG',
  'ngôn ngữ ký hiệu': 'SIGN_LANG',
  'thủ ngữ': 'SIGN_LANG',
  'bạn bè': 'FRIEND',
  'có': 'YES',
  'vâng': 'YES',
  'dạ': 'YES',
  'đúng': 'YES',
  'không': 'NO',
  'hông': 'NO',
  'chưa': 'NO',
  'gì': 'WHAT',
  'cái gì': 'WHAT',
  'đâu': 'WHERE',
  'ở đâu': 'WHERE',
  'sao': 'WHY',
  'tại sao': 'WHY',
  'vì sao': 'WHY',
  'khi nào': 'WHEN',
  'bao giờ': 'WHEN',
  'ai': 'WHO',
  'thế nào': 'HOW',
  'ra sao': 'HOW',
  'bao nhiêu': 'HOW_MUCH',
  'mấy': 'HOW_MUCH',
  'hiểu': 'UNDERSTAND',
  'đi': 'GO',
  'đi chơi': 'GO',
  'về': 'GO',
  'đến': 'COME',
  'tới': 'COME',
  'ăn': 'EAT',
  'ăn cơm': 'EAT',
  'thức ăn': 'FOOD',
  'cơm': 'FOOD',
  'uống': 'DRINK',
  'uống nước': 'DRINK',
  'nước': 'WATER',
  'muốn': 'WANT',
  'mong muốn': 'WANT',
  'làm việc': 'WORK',
  'ngủ': 'SLEEP',
  'đi ngủ': 'SLEEP',
  'xem': 'SEE',
  'nhìn': 'SEE',
  'thấy': 'SEE',
  'biết': 'KNOW',
  'không biết': 'DONT_KNOW',
  'nghĩ': 'THINK',
  'suy nghĩ': 'THINK',
  'xin lỗi': 'SORRY',
  'thứ lỗi': 'SORRY',
  'gia đình': 'FAMILY',
  'bố': 'FATHER',
  'ba': 'FATHER',
  'cha': 'FATHER',
  'mẹ': 'MOTHER',
  'má': 'MOTHER',
  'bác sĩ': 'DOCTOR',
  'bác sỹ': 'DOCTOR',
  'thầy giáo': 'TEACHER',
  'cô giáo': 'TEACHER',
  'giáo viên': 'TEACHER',
  'học sinh': 'STUDENT',
  'sinh viên': 'STUDENT',
  'bệnh viện': 'HOSPITAL',
  'nhà thương': 'HOSPITAL',
  'tiệm thuốc': 'PHARMACY',
  'nhà thuốc': 'PHARMACY',
  'thuốc': 'PHARMACY',
  'công an': 'POLICE',
  'cảnh sát': 'POLICE',
  'nhà': 'HOUSE',
  'ngôi nhà': 'HOUSE',
  'trường': 'SCHOOL',
  'trường học': 'SCHOOL',
  'sách': 'BOOK',
  'tiền': 'MONEY',
  'thời gian': 'TIME',
  'giờ': 'TIME',
  'việt nam': 'VIETNAM',
  'ngày mai': 'TOMORROW',
  'mai': 'TOMORROW',
  'hôm qua': 'YESTERDAY',
  'bây giờ': 'NOW',
  'hiện tại': 'NOW',
  'nóng': 'HOT',
  'lạnh': 'COLD',
  'dừng': 'STOP',
  'dừng lại': 'STOP',
  'đau': 'PAIN',
  'bệnh': 'PAIN',
  'buồn': 'SAD',
  'chúc mừng': 'CONGRATS',
  'mệt': 'TIRED',
  'mệt mỏi': 'TIRED'
};

// Merge extended signs into SIGN_LEXICON & SYNONYM_MAP dynamically
for (const [key, data] of Object.entries(BUILTIN_EXTENDED_SIGNS)) {
  if (!SIGN_LEXICON[key]) {
    SIGN_LEXICON[key] = {
      asl: data.asl,
      vsl: data.vsl,
    };
  }
  if (data.words) {
    for (const w of data.words) {
      const cleanW = w.toLowerCase().trim();
      SYNONYM_MAP[cleanW] = key;
    }
  }
}

// Merge WLASL Core 150 Elite Lexicon into SIGN_LEXICON & SYNONYM_MAP
for (const sign of ALL_WLASL_SIGNS) {
  if (!SIGN_LEXICON[sign.key]) {
    SIGN_LEXICON[sign.key] = {
      asl: {
        gloss: sign.gloss,
        duration: sign.duration,
        nmm: sign.nmm,
        desc: sign.descriptionVi
      },
      vsl: {
        gloss: sign.meaningVi.toUpperCase(),
        duration: sign.duration,
        nmm: sign.nmm,
        desc: `VSL: ${sign.descriptionVi}`
      }
    };
  }
  for (const syn of sign.synonyms) {
    const cleanW = syn.toLowerCase().trim();
    if (!SYNONYM_MAP[cleanW]) {
      SYNONYM_MAP[cleanW] = sign.key;
    }
  }
}

/**
 * Unified Sign Lookup Bridge:
 * Returns standard 4-phase SignDefinition for any ASL/VSL word or gloss query.
 */
export function lookupSign(keyOrWord: string): SignDefinition | null {
  if (!keyOrWord) return null;
  const clean = keyOrWord.toLowerCase().trim();
  const upper = keyOrWord.toUpperCase().trim().replace(/[-\s]/g, '_');

  // 1. Check customSigns
  const custom = lookupCustomSign(keyOrWord);
  if (custom) return custom;

  // 2. Check WLASL_SIGN_MAP
  const wKey = SYNONYM_MAP[clean] || upper;
  const wlasl = WLASL_SIGN_MAP[wKey] || WLASL_SIGN_MAP[upper];
  if (wlasl) {
    const frames = WLASL_FRAMES[wlasl.key] || [];
    return {
      gloss: wlasl.gloss,
      duration: wlasl.duration,
      nmm: wlasl.nmm,
      descriptionVi: wlasl.descriptionVi,
      aslDesc: wlasl.descriptionVi,
      vslDesc: `VSL: ${wlasl.meaningVi}`,
      phases: frames.map((f: any) => ({
        t: f.time,
        right: {
          ...f.rHand,
          position: f.ik?.right,
          rotation: f.rWrist ? [f.rWrist.x ?? 0, f.rWrist.y ?? 0, f.rWrist.z ?? 0] : undefined
        },
        left: {
          ...f.lHand,
          position: f.ik?.left,
          rotation: f.lWrist ? [f.lWrist.x ?? 0, f.lWrist.y ?? 0, f.lWrist.z ?? 0] : undefined
        },
        nmm: f.nmm
      }))
    };
  }

  // 3. Check SIGN_LEXICON
  const lexKey = SYNONYM_MAP[clean] || upper;
  const lex = SIGN_LEXICON[lexKey];
  if (lex) {
    const data = lex.asl || lex;
    return {
      gloss: data.gloss || lexKey,
      duration: data.duration || 1000,
      nmm: data.nmm || {},
      descriptionVi: data.desc || `Ký hiệu: ${lexKey}`,
      phases: []
    };
  }

  return null;
}


