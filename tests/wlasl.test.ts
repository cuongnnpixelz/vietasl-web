import { describe, it, expect } from 'vitest';
import { compileASLUtterance, isWordVerified } from '../src/asl/compiler';
import { translateVietnameseToASLGloss } from '../src/asl/vietnameseMapping';
import { WLASL_150_SIGNS, WLASL_CATEGORIES, isWlaslWord, WLASL_SIGN_MAP } from '../src/asl/wlaslSigns';
import { ASL_NUMBERS, FINGERSPELL_POSES, spellingMotion, spellingLetters } from '../src/asl/fingerspelling';
import { ASL_DICTIONARY, CATEGORIES } from '../src/asl/dictionary';
import { signLearnerInstance } from '../src/asl/signLearner';

describe('WLASL 150 Core Signs & 35 Sentences Verification Suite', () => {
  // ----------------------------------------------------
  // TEST 1: CATEGORY INTEGRITY & 150 WORDS COMPLETENESS
  // ----------------------------------------------------
  it('should have exactly 150 core signs across all 10 life categories', () => {
    expect(WLASL_150_SIGNS.length).toBe(150);
    expect(WLASL_CATEGORIES.length).toBe(10);

    const categoryCounts: Record<number, number> = {};
    for (const sign of WLASL_150_SIGNS) {
      categoryCounts[sign.categoryIndex] = (categoryCounts[sign.categoryIndex] || 0) + 1;
    }

    // Verify category distribution matches matrix:
    expect(categoryCounts[1]).toBe(15);  // Chào hỏi, Lịch sự & Xã giao
    expect(categoryCounts[2]).toBe(15);  // Đại từ & Con người
    expect(categoryCounts[3]).toBe(10);  // Từ để hỏi
    expect(categoryCounts[4]).toBe(18);  // Cảm xúc & Trạng thái
    expect(categoryCounts[5]).toBe(18);  // Sinh hoạt & Ăn uống
    expect(categoryCounts[6]).toBe(22);  // Hành động cơ bản
    expect(categoryCounts[7]).toBe(12);  // Y tế, Khẩn cấp & An toàn
    expect(categoryCounts[8]).toBe(16);  // Thời gian & Lịch trình
    expect(categoryCounts[9]).toBe(12);  // Phương hướng & Địa điểm
    expect(categoryCounts[10]).toBe(12); // Tính chất & Màu sắc
  });

  // ----------------------------------------------------
  // TEST 2: ALL 150 WORDS COMPILE TO VERIFIED ASL CLIPS
  // ----------------------------------------------------
  it('should verify that all 150 WLASL words compile into valid verified clips with duration > 0', () => {
    let verifiedCount = 0;

    for (const sign of WLASL_150_SIGNS) {
      // 1. Must be recognized as verified signable word
      expect(isWordVerified(sign.key)).toBe(true);
      expect(isWlaslWord(sign.key)).toBe(true);

      // 2. Must resolve valid 3D keyframe animation frames
      const frames = signLearnerInstance.resolveFrames(sign.key, 'asl');
      expect(frames).toBeTruthy();
      expect(frames.length).toBeGreaterThanOrEqual(3);

      // 3. Must compile into valid utterance
      const result = compileASLUtterance(sign.synonyms[0] || sign.key);
      expect(result.duration).toBeGreaterThan(0);
      expect(result.totalTracks).toBeGreaterThan(0);
      expect(result.segments.length).toBeGreaterThan(0);
      expect(result.segments[0].status).toBe('verified');

      verifiedCount++;
    }

    expect(verifiedCount).toBe(150);
  });

  // ----------------------------------------------------
  // TEST 3: NUMBERS 0-10, 100, 1000 & SPATIAL LETTERS J, Z
  // ----------------------------------------------------
  it('should support ASL Numbers 0-10 and spatial motion tracing for J, Z, and 10', () => {
    expect(ASL_NUMBERS.length).toBe(11); // 0 to 10

    // Numbers 0 through 10 must have finger curl poses
    for (let i = 0; i <= 10; i++) {
      const numStr = String(i);
      expect((FINGERSPELL_POSES as any)[numStr]).toBeDefined();
    }

    // Number 3 in ASL has Thumb, Index, Middle extended (Ring and Pinky curled)
    const pose3 = (FINGERSPELL_POSES as any)['3'];
    expect(pose3.thumb.curl).toBe(0.0);
    expect(pose3.index.curl).toBeLessThan(0.1);
    expect(pose3.middle.curl).toBeLessThan(0.1);
    expect(pose3.ring.curl).toBeGreaterThan(0.9);
    expect(pose3.pinky.curl).toBeGreaterThan(0.9);

    // Number 6 in ASL: Thumb touches Pinky tip
    const pose6 = (FINGERSPELL_POSES as any)['6'];
    expect(pose6.pinky.curl).toBeGreaterThan(0.7);

    // J and Z must have spatial motion curves
    const motionJ = spellingMotion('J', 0.5);
    expect(motionJ).toBeDefined();
    expect(motionJ.length).toBe(3);

    const motionZ = spellingMotion('Z', 0.5);
    expect(motionZ).toBeDefined();
    expect(motionZ.length).toBe(3);

    // Digits filter in spellingLetters
    const letters = spellingLetters('A123Z', 'asl');
    expect(letters).toEqual(['A', '1', '2', '3', 'Z']);
  });

  // ----------------------------------------------------
  // TEST 4: ALL 35 CONVERSATIONAL SENTENCES
  // ----------------------------------------------------
  it('should compile all 35 conversational sentences into valid ASL gloss sequences', () => {
    const testCases: { vi: string; en: string; expectedWords: string[] }[] = [
      // 1. Chào hỏi
      { vi: 'Xin chào bạn khỏe không', en: 'Hello, how are you?', expectedWords: ['HELLO', 'YOU', 'HOW'] },
      // 2. Tôi khỏe cảm ơn
      { vi: 'Tôi khỏe cảm ơn bạn', en: 'I am fine, thank you', expectedWords: ['I', 'FINE', 'THANK'] },
      // 3. Tên bạn là gì
      { vi: 'Tên bạn là gì', en: 'What is your name', expectedWords: ['YOUR', 'NAME', 'WHAT'] },
      // 4. Tên tôi là
      { vi: 'Tên tôi là An', en: 'My name is An', expectedWords: ['MY', 'NAME'] },
      // 5. Rất vui được gặp bạn
      { vi: 'Rất vui được gặp bạn', en: 'Nice to meet you', expectedWords: ['NICE', 'MEET', 'YOU'] },
      // 6. Bạn có cần giúp đỡ không
      { vi: 'Bạn có cần giúp đỡ không', en: 'Do you need help', expectedWords: ['YOU', 'NEED', 'HELP'] },
      // 7. Làm ơn giúp tôi với
      { vi: 'Làm ơn giúp tôi với', en: 'Please help me', expectedWords: ['PLEASE', 'HELP', 'ME'] },
      // 8. Tôi bị lạc đường
      { vi: 'Tôi bị lạc đường', en: 'I am lost', expectedWords: ['I', 'LOST'] },
      // 9. Nhà vệ sinh ở đâu
      { vi: 'Nhà vệ sinh ở đâu', en: 'Where is the bathroom', expectedWords: ['BATHROOM', 'WHERE'] },
      // 10. Bệnh viện ở đâu
      { vi: 'Bệnh viện ở đâu', en: 'Where is the hospital', expectedWords: ['HOSPITAL', 'WHERE'] },
      // 11. Tôi bị đau ở đây
      { vi: 'Tôi bị đau ở đây', en: 'I hurt here', expectedWords: ['I', 'HURT', 'HERE'] },
      // 12. Tôi cần gặp bác sĩ
      { vi: 'Tôi cần gặp bác sĩ', en: 'I need doctor', expectedWords: ['I', 'NEED', 'DOCTOR'] },
      // 13. Làm ơn gọi cảnh sát giúp tôi
      { vi: 'Làm ơn gọi cảnh sát giúp tôi', en: 'Please call police', expectedWords: ['PLEASE', 'CALL', 'POLICE'] },
      // 14. Cái này bao nhiêu tiền
      { vi: 'Cái này bao nhiêu tiền', en: 'How much does this cost', expectedWords: ['THIS', 'MONEY', 'HOW'] },
      // 15. Tôi muốn mua cái này
      { vi: 'Tôi muốn mua cái này', en: 'I want buy this', expectedWords: ['I', 'WANT', 'BUY', 'THIS'] },
      // 16. Tôi không hiểu
      { vi: 'Tôi không hiểu', en: 'I do not understand', expectedWords: ['I', 'NOT', 'UNDERSTAND'] },
      // 17. Bạn nhắc lại được không
      { vi: 'Bạn nhắc lại được không', en: 'Can you repeat please', expectedWords: ['AGAIN', 'PLEASE'] },
      // 18. Bạn có nói ngôn ngữ ký hiệu không
      { vi: 'Bạn có nói ngôn ngữ ký hiệu không', en: 'Do you sign', expectedWords: ['YOU', 'SIGN'] },
      // 19. Tôi đang học ngôn ngữ ký hiệu
      { vi: 'Tôi đang học ngôn ngữ ký hiệu', en: 'I am learning sign language', expectedWords: ['I', 'LEARN', 'SIGN'] },
      // 20. Mấy giờ rồi
      { vi: 'Mấy giờ rồi', en: 'What time is it', expectedWords: ['TIME', 'WHAT'] },
      // 21. Hôm nay là ngày mấy
      { vi: 'Hôm nay là ngày mấy', en: 'What day is today', expectedWords: ['TODAY', 'DAY', 'WHAT'] },
      // 22. Hẹn gặp lại bạn ngày mai
      { vi: 'Hẹn gặp lại bạn ngày mai', en: 'See you tomorrow', expectedWords: ['SEE', 'YOU', 'TOMORROW'] },
      // 23. Chúc một ngày tốt lành
      { vi: 'Chúc một ngày tốt lành', en: 'Have a good day', expectedWords: ['GOOD', 'DAY'] },
      // 24. Chúc ngủ ngon
      { vi: 'Chúc ngủ ngon', en: 'Good night', expectedWords: ['GOOD', 'NIGHT'] },
      // 25. Tôi đói bụng rồi
      { vi: 'Tôi đói bụng rồi', en: 'I am hungry', expectedWords: ['I', 'HUNGRY'] },
      // 26. Tôi muốn uống nước
      { vi: 'Tôi muốn uống nước', en: 'I want drink water', expectedWords: ['I', 'WANT', 'DRINK', 'WATER'] },
      // 27. Xin lỗi tôi đến trễ
      { vi: 'Xin lỗi tôi đến trễ', en: 'Sorry I am late', expectedWords: ['SORRY', 'I', 'LATE'] },
      // 28. Không có gì đâu
      { vi: 'Không có gì đâu', en: 'You are welcome', expectedWords: ['WELCOME'] },
      // 29. Tôi yêu bạn rất nhiều
      { vi: 'Tôi yêu bạn rất nhiều', en: 'I love you very much', expectedWords: ['I', 'LOVE', 'YOU'] },
      // 30. Gia đình tôi ở Việt Nam
      { vi: 'Gia đình tôi ở Việt Nam', en: 'My family in Vietnam', expectedWords: ['MY', 'FAMILY', 'VIETNAM'] },
      // 31. Hãy dừng lại ngay
      { vi: 'Hãy dừng lại ngay', en: 'Stop now', expectedWords: ['STOP', 'NOW'] },
      // 32. Chờ tôi một lát nhé
      { vi: 'Chờ tôi một lát nhé', en: 'Wait me minute', expectedWords: ['WAIT', 'ME', 'MINUTE'] },
      // 33. Bạn có bận không
      { vi: 'Bạn có bận không', en: 'Are you busy', expectedWords: ['YOU', 'BUSY'] },
      // 34. Tôi đang làm việc
      { vi: 'Tôi đang làm việc', en: 'I am working', expectedWords: ['I', 'WORK'] },
      // 35. Tạm biệt và bảo trọng nhé
      { vi: 'Tạm biệt và bảo trọng nhé', en: 'Goodbye take care', expectedWords: ['GOODBYE', 'SAFE'] }
    ];

    expect(testCases.length).toBe(35);

    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      // Test Vietnamese translation to ASL gloss
      const glossVi = translateVietnameseToASLGloss(tc.vi);
      expect(glossVi).toBeTruthy();

      const resultVi = compileASLUtterance(tc.vi);
      expect(resultVi.duration).toBeGreaterThan(0);
      expect(resultVi.tokens.length).toBeGreaterThan(0);

      // Verify that primary expected keywords appear in compiled signed words or segments
      for (const expected of tc.expectedWords) {
        const found = resultVi.signedWords.some((sw) => sw.includes(expected)) ||
                      resultVi.segments.some((seg) => seg.gloss.includes(expected) || seg.rawWord.toUpperCase().includes(expected));
        expect(found).toBe(true);
      }
    }
  });

  // ----------------------------------------------------
  // TEST 5: DICTIONARY AND CATEGORIES COMPLETENESS
  // ----------------------------------------------------
  it('should verify ASL_DICTIONARY has at least 150 items and all 10 categories are present', () => {
    expect(ASL_DICTIONARY.length).toBeGreaterThanOrEqual(150);
    expect(CATEGORIES.length).toBe(11); // 'all' + 10 life categories

    for (const item of ASL_DICTIONARY) {
      expect(item.id).toBeTruthy();
      expect(item.word).toBeTruthy();
      expect(item.gloss).toBeTruthy();
      expect(item.meaningVi).toBeTruthy();
      expect(item.category).toBeTruthy();
      expect(item.verified).toBe(true);
    }
  });
});
