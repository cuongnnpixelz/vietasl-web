// @ts-nocheck
// Fingerspelling Alphabet Reference & Helpers

export interface AlphabetLetter {
  char: string;
  descriptionVi: string;
  handshapeVi: string;
}

export const ASL_ALPHABET: AlphabetLetter[] = [
  { char: 'A', handshapeVi: 'Nắm tay, ngón cái áp sát cạnh ngón trỏ', descriptionVi: 'Chữ A trong bảng chữ cái ngón tay ASL' },
  { char: 'B', handshapeVi: 'Bốn ngón duỗi thẳng khép vào nhau, ngón cái gập vắt ngang lòng bàn tay', descriptionVi: 'Chữ B trong bảng chữ cái ngón tay ASL' },
  { char: 'C', handshapeVi: 'Cả bàn tay khum lại tạo thành hình chữ C', descriptionVi: 'Chữ C trong bảng chữ cái ngón tay ASL' },
  { char: 'D', handshapeVi: 'Ngón trỏ chỉ thẳng đứng lên trời, các ngón còn lại chụm vào ngón cái tạo thành vòng tròn', descriptionVi: 'Chữ D trong bảng chữ cái ngón tay ASL' },
  { char: 'E', handshapeVi: 'Các đầu ngón tay gập quặp lại tựa trên đầu ngón cái', descriptionVi: 'Chữ E trong bảng chữ cái ngón tay ASL' },
  { char: 'F', handshapeVi: 'Đầu ngón trỏ và ngón cái chạm nhau thành vòng tròn, ba ngón còn lại xòe thẳng đứng', descriptionVi: 'Chữ F trong bảng chữ cái ngón tay ASL' },
  { char: 'G', handshapeVi: 'Ngón trỏ và ngón cái duỗi song song hướng sang ngang, các ngón khác nắm lại', descriptionVi: 'Chữ G trong bảng chữ cái ngón tay ASL' },
  { char: 'H', handshapeVi: 'Ngón trỏ và ngón giữa duỗi song song hướng sang ngang, ngón cái gập giữ hai ngón còn lại', descriptionVi: 'Chữ H trong bảng chữ cái ngón tay ASL' },
  { char: 'I', handshapeVi: 'Ngón út dựng thẳng đứng lên, các ngón khác nắm chặt với ngón cái vắt ngang', descriptionVi: 'Chữ I trong bảng chữ cái ngón tay ASL' },
  { char: 'J', handshapeVi: 'Ngón út dựng đứng rồi vẽ đường cong hình lưỡi câu chữ J trong không gian', descriptionVi: 'Chữ J trong bảng chữ cái ngón tay ASL' },
  { char: 'K', handshapeVi: 'Ngón trỏ và ngón giữa mở hình chữ V, đầu ngón cái đặt chêm vào giữa hai ngón', descriptionVi: 'Chữ K trong bảng chữ cái ngón tay ASL' },
  { char: 'L', handshapeVi: 'Ngón cái và ngón trỏ mở vuông góc tạo thành hình chữ L', descriptionVi: 'Chữ L trong bảng chữ cái ngón tay ASL' },
  { char: 'M', handshapeVi: 'Ngón cái luồn xuống dưới 3 ngón tay (trỏ, giữa, áp út) đang gập xuống', descriptionVi: 'Chữ M trong bảng chữ cái ngón tay ASL' },
  { char: 'N', handshapeVi: 'Ngón cái luồn xuống dưới 2 ngón tay (trỏ và giữa) đang gập xuống', descriptionVi: 'Chữ N trong bảng chữ cái ngón tay ASL' },
  { char: 'O', handshapeVi: 'Tất cả các đầu ngón tay chạm đầu ngón cái tạo thành vòng tròn chữ O', descriptionVi: 'Chữ O trong bảng chữ cái ngón tay ASL' },
  { char: 'P', handshapeVi: 'Hình bàn tay giống chữ K nhưng hướng chúc đầu ngón tay xuống đất', descriptionVi: 'Chữ P trong bảng chữ cái ngón tay ASL' },
  { char: 'Q', handshapeVi: 'Hình bàn tay giống chữ G nhưng chúc hai ngón trỏ và cái hướng xuống đất', descriptionVi: 'Chữ Q trong bảng chữ cái ngón tay ASL' },
  { char: 'R', handshapeVi: 'Ngón trỏ và ngón giữa duỗi thẳng bắt chéo vào nhau', descriptionVi: 'Chữ R trong bảng chữ cái ngón tay ASL' },
  { char: 'S', handshapeVi: 'Bàn tay nắm đấm chặt, ngón cái vắt ngang trước mu các ngón tay', descriptionVi: 'Chữ S trong bảng chữ cái ngón tay ASL' },
  { char: 'T', handshapeVi: 'Ngón cái luồn vào giữa ngón trỏ và ngón giữa đang nắm lại', descriptionVi: 'Chữ T trong bảng chữ cái ngón tay ASL' },
  { char: 'U', handshapeVi: 'Ngón trỏ và ngón giữa duỗi thẳng đứng khép sát vào nhau', descriptionVi: 'Chữ U trong bảng chữ cái ngón tay ASL' },
  { char: 'V', handshapeVi: 'Ngón trỏ và ngón giữa mở tách ra tạo thành hình chữ V biểu tượng chiến thắng', descriptionVi: 'Chữ V trong bảng chữ cái ngón tay ASL' },
  { char: 'W', handshapeVi: 'Ba ngón (trỏ, giữa, áp út) mở xòe thẳng đứng tạo hình chữ W', descriptionVi: 'Chữ W trong bảng chữ cái ngón tay ASL' },
  { char: 'X', handshapeVi: 'Ngón trỏ cong lại như chiếc móc câu', descriptionVi: 'Chữ X trong bảng chữ cái ngón tay ASL' },
  { char: 'Y', handshapeVi: 'Ngón cái và ngón út duỗi sang hai bên, ba ngón giữa gập lại', descriptionVi: 'Chữ Y trong bảng chữ cái ngón tay ASL' },
  { char: 'Z', handshapeVi: 'Ngón trỏ vẽ hình chữ Z trong không khí', descriptionVi: 'Chữ Z trong bảng chữ cái ngón tay ASL' }
];


// Illustrative fingerspelling poses. Language accuracy needs signer validation.
// Wrist angles are offsets from the common spelling orientation.

/**
 * Finger angles represent normalized curl:
 * 0.0 = fully straight / extended
 * 1.0 = fully curled / closed into palm
 * spread: lateral abduction/adduction
 */

export const FINGERSPELL_POSES = {
  // A: Fist with thumb straight up alongside index
  A: {
    wrist: { x: 0, y: 0, z: 0 },
    thumb: { curl: 0.1, spread: 0.1 },
    index: { curl: 0.95 },
    middle: { curl: 0.95 },
    ring: { curl: 0.95 },
    pinky: { curl: 0.95 }
  },
  // B: Flat hand, 4 fingers straight up, thumb tucked across palm
  B: {
    wrist: { x: 0, y: 0, z: 0 },
    thumb: { curl: 0.85, spread: -0.4 },
    index: { curl: 0.05 },
    middle: { curl: 0.05 },
    ring: { curl: 0.05 },
    pinky: { curl: 0.05 }
  },
  // C: All fingers and thumb curved like a C
  C: {
    wrist: { x: 0.1, y: 0.3, z: 0 },
    thumb: { curl: 0.4, spread: 0.5 },
    index: { curl: 0.45 },
    middle: { curl: 0.45 },
    ring: { curl: 0.45 },
    pinky: { curl: 0.45 }
  },
  // D: Index straight up, thumb touching middle/ring/pinky tips
  D: {
    wrist: { x: 0, y: 0, z: 0 },
    thumb: { curl: 0.6, spread: 0.2 },
    index: { curl: 0.0 },
    middle: { curl: 0.75 },
    ring: { curl: 0.8 },
    pinky: { curl: 0.85 }
  },
  // E: All fingers curled, fingertips touching thumb
  E: {
    wrist: { x: 0.1, y: 0, z: 0 },
    thumb: { curl: 0.8, spread: -0.2 },
    index: { curl: 0.85 },
    middle: { curl: 0.85 },
    ring: { curl: 0.85 },
    pinky: { curl: 0.85 }
  },
  // F: Index touches thumb (circle), other 3 fingers straight
  F: {
    wrist: { x: 0, y: 0, z: 0 },
    thumb: { curl: 0.5, spread: 0.1 },
    index: { curl: 0.6 },
    middle: { curl: 0.05 },
    ring: { curl: 0.05 },
    pinky: { curl: 0.05 }
  },
  // G: Index and thumb pointing horizontally forward, others closed
  G: {
    wrist: { x: 0, y: 0.3, z: 1.5 },
    thumb: { curl: 0.1, spread: 0.3 },
    index: { curl: 0.1 },
    middle: { curl: 0.95 },
    ring: { curl: 0.95 },
    pinky: { curl: 0.95 }
  },
  // H: Index and middle extended horizontally forward, thumb tucked
  H: {
    wrist: { x: 0, y: 0.3, z: 1.5 },
    thumb: { curl: 0.6, spread: 0.0 },
    index: { curl: 0.05 },
    middle: { curl: 0.05 },
    ring: { curl: 0.95 },
    pinky: { curl: 0.95 }
  },
  // I: Pinky straight up, other fingers in a fist
  I: {
    wrist: { x: 0, y: 0, z: 0 },
    thumb: { curl: 0.85, spread: -0.2 },
    index: { curl: 0.95 },
    middle: { curl: 0.95 },
    ring: { curl: 0.95 },
    pinky: { curl: 0.0 }
  },
  // J: Pinky up tracing a J curve (wrist rotates)
  J: {
    wrist: { x: 0.2, y: -0.4, z: 0.3 },
    thumb: { curl: 0.85, spread: -0.2 },
    index: { curl: 0.95 },
    middle: { curl: 0.95 },
    ring: { curl: 0.95 },
    pinky: { curl: 0.0 }
  },
  // K: Index straight up, middle forward at angle, thumb between them
  K: {
    wrist: { x: 0, y: 0, z: 0 },
    thumb: { curl: 0.2, spread: 0.3 },
    index: { curl: 0.0 },
    middle: { curl: 0.4 },
    ring: { curl: 0.95 },
    pinky: { curl: 0.95 }
  },
  // L: Index up, thumb out at 90 degrees (L shape)
  L: {
    wrist: { x: 0, y: 0, z: 0 },
    thumb: { curl: 0.0, spread: 0.8 },
    index: { curl: 0.0 },
    middle: { curl: 0.95 },
    ring: { curl: 0.95 },
    pinky: { curl: 0.95 }
  },
  // M: Thumb tucked under index, middle, ring fingers
  M: {
    wrist: { x: 0.2, y: 0, z: 0 },
    thumb: { curl: 0.9, spread: -0.4 },
    index: { curl: 0.8 },
    middle: { curl: 0.8 },
    ring: { curl: 0.8 },
    pinky: { curl: 0.95 }
  },
  // N: Thumb tucked under index and middle fingers
  N: {
    wrist: { x: 0.2, y: 0, z: 0 },
    thumb: { curl: 0.9, spread: -0.2 },
    index: { curl: 0.8 },
    middle: { curl: 0.8 },
    ring: { curl: 0.95 },
    pinky: { curl: 0.95 }
  },
  // O: All fingertips touching thumb forming an O
  O: {
    wrist: { x: 0.1, y: 0.2, z: 0 },
    thumb: { curl: 0.5, spread: 0.3 },
    index: { curl: 0.65 },
    middle: { curl: 0.65 },
    ring: { curl: 0.65 },
    pinky: { curl: 0.65 }
  },
  // P: Downward pointing K handshape
  P: {
    wrist: { x: 0.2, y: 0.1, z: 2.7 },
    thumb: { curl: 0.2, spread: 0.3 },
    index: { curl: 0.1 },
    middle: { curl: 0.5 },
    ring: { curl: 0.95 },
    pinky: { curl: 0.95 }
  },
  // Q: Downward pointing G handshape
  Q: {
    wrist: { x: 0.2, y: 0.2, z: 2.7 },
    thumb: { curl: 0.1, spread: 0.3 },
    index: { curl: 0.1 },
    middle: { curl: 0.95 },
    ring: { curl: 0.95 },
    pinky: { curl: 0.95 }
  },
  // R: Index and middle fingers crossed, others curled
  R: {
    wrist: { x: 0, y: 0, z: 0 },
    thumb: { curl: 0.85, spread: -0.2 },
    index: { baseCurl: 0.16, midCurl: 0.03, tipCurl: 0.02, splay: -0.22 },
    middle: { baseCurl: -0.06, midCurl: 0.05, tipCurl: 0.02, splay: 0.20 },
    ring: { curl: 0.95 },
    pinky: { curl: 0.95 }
  },
  // S: Fist with thumb folded across front of fingers
  S: {
    wrist: { x: 0, y: 0, z: 0 },
    thumb: { curl: 0.85, spread: 0.0 },
    index: { curl: 0.95 },
    middle: { curl: 0.95 },
    ring: { curl: 0.95 },
    pinky: { curl: 0.95 }
  },
  // T: Thumb tucked between index and middle
  T: {
    wrist: { x: 0.1, y: 0, z: 0 },
    thumb: { curl: 0.85, spread: 0.1 },
    index: { curl: 0.75 },
    middle: { curl: 0.95 },
    ring: { curl: 0.95 },
    pinky: { curl: 0.95 }
  },
  // U: Index and middle straight together, thumb folded
  U: {
    wrist: { x: 0, y: 0, z: 0 },
    thumb: { curl: 0.85, spread: -0.3 },
    index: { curl: 0.05, splay: 0 },
    middle: { curl: 0.05, splay: 0 },
    ring: { curl: 0.95 },
    pinky: { curl: 0.95 }
  },
  // V: Peace / Victory sign (Index and middle spread apart)
  V: {
    wrist: { x: 0, y: 0, z: 0 },
    thumb: { curl: 0.85, spread: -0.3 },
    index: { curl: 0.05, splay: 0.24 },
    middle: { curl: 0.05, splay: -0.16 },
    ring: { curl: 0.95 },
    pinky: { curl: 0.95 }
  },
  // W: Three fingers up (Index, Middle, Ring)
  W: {
    wrist: { x: 0, y: 0, z: 0 },
    thumb: { curl: 0.85, spread: -0.3 },
    index: { curl: 0.05 },
    middle: { curl: 0.05 },
    ring: { curl: 0.05 },
    pinky: { curl: 0.95 }
  },
  // X: Index finger hooked / bent like a hook
  X: {
    wrist: { x: 0, y: 0.1, z: 0 },
    thumb: { curl: 0.85, spread: 0.0 },
    index: { baseCurl: 0.12, midCurl: 1.25, tipCurl: 0.65 },
    middle: { curl: 0.95 },
    ring: { curl: 0.95 },
    pinky: { curl: 0.95 }
  },
  // Y: 'Hang loose' (Thumb and pinky extended, middle 3 curled)
  Y: {
    wrist: { x: 0, y: 0, z: 0 },
    thumb: { curl: 0.0, spread: 0.9 },
    index: { curl: 0.95 },
    middle: { curl: 0.95 },
    ring: { curl: 0.95 },
    pinky: { curl: 0.0 }
  },
  // Z: Index finger tracing a Z in the air
  Z: {
    wrist: { x: -0.2, y: 0.2, z: 0 },
    thumb: { curl: 0.85, spread: -0.2 },
    index: { curl: 0.05 },
    middle: { curl: 0.95 },
    ring: { curl: 0.95 },
    pinky: { curl: 0.95 }
  },
  // --- VIETNAMESE MANUAL ALPHABET (VSL) SPECIAL LETTERS ---
  'Ă': {
    wrist: { x: 0.15, y: 0, z: 0.05 },
    thumb: { curl: 0.1, spread: 0.2 },
    index: { curl: 0.95 },
    middle: { curl: 0.95 },
    ring: { curl: 0.95 },
    pinky: { curl: 0.95 }
  },
  'Â': {
    wrist: { x: -0.15, y: 0, z: 0.08 },
    thumb: { curl: 0.1, spread: 0.15 },
    index: { curl: 0.95 },
    middle: { curl: 0.95 },
    ring: { curl: 0.95 },
    pinky: { curl: 0.95 }
  },
  'Đ': {
    wrist: { x: 0, y: 0.2, z: -0.15 },
    thumb: { curl: 0.6, spread: 0.2 },
    index: { curl: 0.0 },
    middle: { curl: 0.75 },
    ring: { curl: 0.8 },
    pinky: { curl: 0.85 }
  },
  'Ê': {
    wrist: { x: -0.12, y: 0, z: 0.08 },
    thumb: { curl: 0.8, spread: -0.2 },
    index: { curl: 0.85 },
    middle: { curl: 0.85 },
    ring: { curl: 0.85 },
    pinky: { curl: 0.85 }
  },
  'Ô': {
    wrist: { x: -0.15, y: 0, z: 0.08 },
    thumb: { curl: 0.45, spread: 0.3 },
    index: { curl: 0.5 },
    middle: { curl: 0.5 },
    ring: { curl: 0.5 },
    pinky: { curl: 0.5 }
  },
  'Ơ': {
    wrist: { x: 0.12, y: 0.15, z: 0.1 },
    thumb: { curl: 0.45, spread: 0.4 },
    index: { curl: 0.5 },
    middle: { curl: 0.5 },
    ring: { curl: 0.5 },
    pinky: { curl: 0.3 }
  },
  'Ư': {
    wrist: { x: 0.12, y: 0.15, z: 0.1 },
    thumb: { curl: 0.85, spread: -0.3 },
    index: { curl: 0.05 },
    middle: { curl: 0.05 },
    ring: { curl: 0.95 },
    pinky: { curl: 0.3 }
  },
  // --- ASL NUMBERS (0 - 10, 100, 1000) ---
  '0': {
    wrist: { x: 0, y: 0, z: 0 },
    thumb: { curl: 0.5, spread: 0.2 },
    index: { curl: 0.65 },
    middle: { curl: 0.7 },
    ring: { curl: 0.75 },
    pinky: { curl: 0.8 }
  },
  '1': {
    wrist: { x: 0, y: 0, z: 0 },
    thumb: { curl: 0.85, spread: -0.3 },
    index: { curl: 0.05 },
    middle: { curl: 0.95 },
    ring: { curl: 0.95 },
    pinky: { curl: 0.95 }
  },
  '2': {
    wrist: { x: 0, y: 0, z: 0 },
    thumb: { curl: 0.85, spread: -0.3 },
    index: { curl: 0.05, spread: 0.1 },
    middle: { curl: 0.05, spread: -0.1 },
    ring: { curl: 0.95 },
    pinky: { curl: 0.95 }
  },
  '3': {
    // Canonical ASL 3: Thumb, Index, and Middle extended! (Ring and Pinky curled)
    wrist: { x: 0, y: 0, z: 0 },
    thumb: { curl: 0.0, spread: 0.7 },
    index: { curl: 0.05, spread: 0.1 },
    middle: { curl: 0.05, spread: -0.1 },
    ring: { curl: 0.95 },
    pinky: { curl: 0.95 }
  },
  '4': {
    wrist: { x: 0, y: 0, z: 0 },
    thumb: { curl: 0.85, spread: -0.4 },
    index: { curl: 0.05 },
    middle: { curl: 0.05 },
    ring: { curl: 0.05 },
    pinky: { curl: 0.05 }
  },
  '5': {
    wrist: { x: 0, y: 0, z: 0 },
    thumb: { curl: 0.0, spread: 0.6 },
    index: { curl: 0.05, spread: 0.2 },
    middle: { curl: 0.05 },
    ring: { curl: 0.05, spread: -0.1 },
    pinky: { curl: 0.05, spread: -0.2 }
  },
  '6': {
    // Canonical ASL 6: Thumb touches Pinky tip, Index/Middle/Ring extended
    wrist: { x: 0, y: 0, z: 0 },
    thumb: { curl: 0.65, spread: -0.2 },
    index: { curl: 0.05 },
    middle: { curl: 0.05 },
    ring: { curl: 0.05 },
    pinky: { curl: 0.75 }
  },
  '7': {
    // Canonical ASL 7: Thumb touches Ring tip, Index/Middle/Pinky extended
    wrist: { x: 0, y: 0, z: 0 },
    thumb: { curl: 0.6, spread: -0.1 },
    index: { curl: 0.05 },
    middle: { curl: 0.05 },
    ring: { curl: 0.75 },
    pinky: { curl: 0.05 }
  },
  '8': {
    // Canonical ASL 8: Thumb touches Middle tip, Index/Ring/Pinky extended
    wrist: { x: 0, y: 0, z: 0 },
    thumb: { curl: 0.6, spread: 0.0 },
    index: { curl: 0.05 },
    middle: { curl: 0.75 },
    ring: { curl: 0.05 },
    pinky: { curl: 0.05 }
  },
  '9': {
    // Canonical ASL 9: Thumb touches Index tip (F-like), Middle/Ring/Pinky extended
    wrist: { x: 0, y: 0, z: 0 },
    thumb: { curl: 0.5, spread: 0.1 },
    index: { curl: 0.65 },
    middle: { curl: 0.05 },
    ring: { curl: 0.05 },
    pinky: { curl: 0.05 }
  },
  '10': {
    // Canonical ASL 10: A-fist with thumb extended up, waggling
    wrist: { x: 0, y: 0.1, z: 0 },
    thumb: { curl: 0.0, spread: 0.6 },
    index: { curl: 0.95 },
    middle: { curl: 0.95 },
    ring: { curl: 0.95 },
    pinky: { curl: 0.95 }
  }
};

export const ASL_NUMBERS: AlphabetLetter[] = [
  { char: '0', handshapeVi: 'Các ngón tay khum lại chạm ngón cái tạo hình chữ O', descriptionVi: 'Số 0 trong hệ thống số ASL' },
  { char: '1', handshapeVi: 'Ngón trỏ giơ thẳng đứng, ngón cái gập giữ các ngón còn lại', descriptionVi: 'Số 1 trong hệ thống số ASL' },
  { char: '2', handshapeVi: 'Ngón trỏ và ngón giữa giơ thẳng tạo hình chữ V', descriptionVi: 'Số 2 trong hệ thống số ASL' },
  { char: '3', handshapeVi: 'Ngón cái, ngón trỏ và ngón giữa duỗi thẳng (ngón áp út và út gập)', descriptionVi: 'Số 3 chuẩn ASL' },
  { char: '4', handshapeVi: 'Bốn ngón duỗi thẳng khép, ngón cái gập ngang lòng bàn tay', descriptionVi: 'Số 4 trong hệ thống số ASL' },
  { char: '5', handshapeVi: 'Cả 5 ngón tay xòe rộng tự nhiên', descriptionVi: 'Số 5 trong hệ thống số ASL' },
  { char: '6', handshapeVi: 'Đầu ngón cái chạm nhẹ đầu ngón út, 3 ngón còn lại giơ thẳng', descriptionVi: 'Số 6 chuẩn ASL' },
  { char: '7', handshapeVi: 'Đầu ngón cái chạm nhẹ đầu ngón áp út, 3 ngón còn lại giơ thẳng', descriptionVi: 'Số 7 chuẩn ASL' },
  { char: '8', handshapeVi: 'Đầu ngón cái chạm nhẹ đầu ngón giữa, 3 ngón còn lại giơ thẳng', descriptionVi: 'Số 8 chuẩn ASL' },
  { char: '9', handshapeVi: 'Đầu ngón cái chạm nhẹ đầu ngón trỏ, 3 ngón còn lại giơ thẳng', descriptionVi: 'Số 9 chuẩn ASL' },
  { char: '10', handshapeVi: 'Nắm tay chữ A, ngón cái giơ lên lắc nhẹ sang hai bên', descriptionVi: 'Số 10 chuẩn ASL' }
];

// Preserve Vietnamese letters while removing only tone marks. ASL uses A-Z and digits 0-9.
export function spellingLetters(text, signLang = 'asl') {
  let value = text.normalize('NFD');
  if (signLang === 'vsl') {
    value = value.replace(/[\u0300\u0301\u0303\u0309\u0323]/g, '').normalize('NFC').toUpperCase();
    return [...value].filter(letter => /^[A-Z0-9ĂÂĐÊÔƠƯ]$/.test(letter));
  }
  return [...value.replace(/\p{M}/gu, '').replace(/[đĐ]/g, 'D').toUpperCase()].filter(letter => /^[A-Z0-9]$/.test(letter));
}

export const spellingLetterDuration = letter => ['J', 'Z', '10'].includes(letter) ? 650 : 350;
export const spellingDuration = letters => Math.max(800, letters.reduce((sum, letter) => sum + spellingLetterDuration(letter), 0));

// Offsets in the avatar's signing plane, from the signer's perspective.
// Each stroke has its own segment; eased joins keep the tracing continuous.
const LETTER_PATHS = {
  J: [[0, 0, 0], [0, -.07, 0], [.015, -.105, 0], [.05, -.11, 0], [.075, -.085, 0]],
  Z: [[0, 0, 0], [-.09, 0, 0], [0, -.085, 0], [-.09, -.085, 0]],
  '10': [[0, 0, 0], [-.025, 0, 0], [.025, 0, 0], [-.02, 0, 0], [0, 0, 0]]
};

export function spellingMotion(letter, progress) {
  const points = LETTER_PATHS[letter];
  if (!points) return [0, 0, 0];
  // Reserve the first 30% for forming the hand, then trace and hold the endpoint.
  const t = Math.max(0, Math.min(1, (progress - .3) / .6)) * (points.length - 1);
  const index = Math.min(points.length - 2, Math.floor(t));
  const fraction = t - index;
  const blend = fraction * fraction * (3 - 2 * fraction);
  return points[index].map((value, axis) => value + (points[index + 1][axis] - value) * blend);
}
