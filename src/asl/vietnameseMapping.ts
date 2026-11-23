/**
 * Vietnamese to ASL Gloss Translation Mapping
 * Enhanced with phrases & vocabulary from cuongnnpixelz/sign-studio
 */

export interface TranslationMapping {
  phraseVi: string;
  aslGloss: string;
}

export const VIETNAMESE_ASL_PHRASES: TranslationMapping[] = [
  // --- 35 CÂU GIAO TIẾP THƯỜNG NHẬT WLASL (Ưu tiên cụm từ dài nhất trước) ---
  // 1. Xin chào, bạn khỏe không?
  { phraseVi: 'xin chào bạn có khỏe không', aslGloss: 'HELLO YOU HOW' },
  { phraseVi: 'xin chào bạn khỏe không', aslGloss: 'HELLO YOU HOW' },
  { phraseVi: 'chào bạn bạn khỏe không', aslGloss: 'HELLO YOU HOW' },
  { phraseVi: 'bạn có khỏe không', aslGloss: 'HELLO YOU HOW' },
  { phraseVi: 'bạn khỏe không', aslGloss: 'HELLO YOU HOW' },
  { phraseVi: 'hôm nay bạn thế nào', aslGloss: 'TODAY HOW YOU' },

  // 2. Tôi khỏe, cảm ơn bạn.
  { phraseVi: 'tôi khỏe cảm ơn bạn còn bạn', aslGloss: 'I FINE THANK-YOU AND YOU' },
  { phraseVi: 'tôi khỏe cảm ơn bạn', aslGloss: 'I FINE THANK-YOU' },
  { phraseVi: 'tôi khỏe cảm ơn', aslGloss: 'I FINE THANK-YOU' },
  { phraseVi: 'tôi rất khỏe cảm ơn', aslGloss: 'I FINE THANK-YOU' },

  // 3. Tên bạn là gì?
  { phraseVi: 'tên của bạn là gì', aslGloss: 'YOUR NAME WHAT' },
  { phraseVi: 'tên bạn là gì', aslGloss: 'YOUR NAME WHAT' },
  { phraseVi: 'bạn tên là gì', aslGloss: 'YOUR NAME WHAT' },

  // 4. Tên tôi là [Tên].
  { phraseVi: 'tên tôi là', aslGloss: 'MY NAME' },
  { phraseVi: 'tên mình là', aslGloss: 'MY NAME' },
  { phraseVi: 'tôi tên là', aslGloss: 'MY NAME' },

  // 5. Rất vui được gặp bạn.
  { phraseVi: 'rất vui được gặp bạn', aslGloss: 'NICE MEET YOU' },
  { phraseVi: 'hân hạnh được gặp bạn', aslGloss: 'NICE MEET YOU' },
  { phraseVi: 'vui được gặp bạn', aslGloss: 'NICE MEET YOU' },

  // 6. Bạn có cần giúp đỡ không?
  { phraseVi: 'bạn có cần giúp đỡ không', aslGloss: 'YOU NEED HELP' },
  { phraseVi: 'bạn có cần giúp không', aslGloss: 'YOU NEED HELP' },
  { phraseVi: 'bạn cần giúp đỡ không', aslGloss: 'YOU NEED HELP' },
  { phraseVi: 'bạn cần giúp không', aslGloss: 'YOU NEED HELP' },

  // 7. Làm ơn giúp tôi với!
  { phraseVi: 'làm ơn giúp tôi với', aslGloss: 'PLEASE HELP ME' },
  { phraseVi: 'làm ơn giúp tôi', aslGloss: 'PLEASE HELP ME' },
  { phraseVi: 'xin hãy giúp tôi', aslGloss: 'PLEASE HELP ME' },

  // 8. Tôi bị lạc đường.
  { phraseVi: 'tôi bị lạc đường', aslGloss: 'I LOST' },
  { phraseVi: 'tôi lạc đường', aslGloss: 'I LOST' },
  { phraseVi: 'tôi bị lạc', aslGloss: 'I LOST' },

  // 9. Nhà vệ sinh ở đâu?
  { phraseVi: 'nhà vệ sinh ở đâu vậy', aslGloss: 'BATHROOM WHERE' },
  { phraseVi: 'nhà vệ sinh ở đâu', aslGloss: 'BATHROOM WHERE' },
  { phraseVi: 'toilet ở đâu', aslGloss: 'BATHROOM WHERE' },

  // 10. Bệnh viện ở đâu?
  { phraseVi: 'bệnh viện ở đâu vậy', aslGloss: 'HOSPITAL WHERE' },
  { phraseVi: 'bệnh viện ở đâu', aslGloss: 'HOSPITAL WHERE' },

  // 11. Tôi bị đau ở đây.
  { phraseVi: 'tôi bị đau ở đây', aslGloss: 'I HURT HERE' },
  { phraseVi: 'tôi đau ở đây', aslGloss: 'I HURT HERE' },

  // 12. Tôi cần gặp bác sĩ.
  { phraseVi: 'tôi cần gặp bác sĩ', aslGloss: 'I NEED DOCTOR' },
  { phraseVi: 'tôi cần bác sĩ', aslGloss: 'I NEED DOCTOR' },

  // 13. Làm ơn gọi cảnh sát giúp tôi!
  { phraseVi: 'làm ơn gọi cảnh sát giúp tôi', aslGloss: 'PLEASE CALL POLICE' },
  { phraseVi: 'làm ơn gọi cảnh sát', aslGloss: 'PLEASE CALL POLICE' },
  { phraseVi: 'làm ơn gọi công an', aslGloss: 'PLEASE CALL POLICE' },

  // 14. Cái này bao nhiêu tiền?
  { phraseVi: 'cái này bao nhiêu tiền', aslGloss: 'THIS MONEY HOW-MUCH' },
  { phraseVi: 'cái này giá bao nhiêu', aslGloss: 'THIS MONEY HOW-MUCH' },
  { phraseVi: 'bao nhiêu tiền', aslGloss: 'MONEY HOW-MUCH' },

  // 15. Tôi muốn mua cái này.
  { phraseVi: 'tôi muốn mua cái này', aslGloss: 'I WANT BUY THIS' },
  { phraseVi: 'tôi muốn mua', aslGloss: 'I WANT BUY' },

  // 16. Tôi không hiểu.
  { phraseVi: 'tôi không hiểu', aslGloss: 'I NOT UNDERSTAND' },
  { phraseVi: 'tôi không hiểu rõ', aslGloss: 'I NOT UNDERSTAND' },
  { phraseVi: 'không hiểu', aslGloss: 'NOT UNDERSTAND' },

  // 17. Bạn nhắc lại được không?
  { phraseVi: 'bạn nhắc lại được không', aslGloss: 'AGAIN PLEASE' },
  { phraseVi: 'bạn nói lại được không', aslGloss: 'AGAIN PLEASE' },
  { phraseVi: 'bạn lặp lại được không', aslGloss: 'AGAIN PLEASE' },
  { phraseVi: 'làm ơn nhắc lại', aslGloss: 'AGAIN PLEASE' },

  // 18. Bạn có nói ngôn ngữ ký hiệu không?
  { phraseVi: 'bạn có nói ngôn ngữ ký hiệu không', aslGloss: 'YOU SIGN' },
  { phraseVi: 'bạn có biết ngôn ngữ ký hiệu không', aslGloss: 'YOU SIGN' },
  { phraseVi: 'bạn biết ngôn ngữ ký hiệu không', aslGloss: 'YOU SIGN' },
  { phraseVi: 'bạn có ra ký hiệu không', aslGloss: 'YOU SIGN' },

  // 19. Tôi đang học ngôn ngữ ký hiệu.
  { phraseVi: 'tôi đang học ngôn ngữ ký hiệu', aslGloss: 'I LEARN SIGN' },
  { phraseVi: 'tôi học ngôn ngữ ký hiệu', aslGloss: 'I LEARN SIGN' },

  // 20. Mấy giờ rồi?
  { phraseVi: 'bây giờ là mấy giờ', aslGloss: 'TIME WHAT' },
  { phraseVi: 'mấy giờ rồi', aslGloss: 'TIME WHAT' },

  // 21. Hôm nay là ngày mấy?
  { phraseVi: 'hôm nay là ngày mấy', aslGloss: 'TODAY DAY WHAT' },
  { phraseVi: 'hôm nay ngày mấy', aslGloss: 'TODAY DAY WHAT' },

  // 22. Hẹn gặp lại bạn ngày mai.
  { phraseVi: 'hẹn gặp lại bạn ngày mai', aslGloss: 'SEE YOU TOMORROW' },
  { phraseVi: 'hẹn gặp lại ngày mai', aslGloss: 'SEE YOU TOMORROW' },
  { phraseVi: 'gặp lại bạn ngày mai', aslGloss: 'SEE YOU TOMORROW' },

  // 23. Chúc một ngày tốt lành!
  { phraseVi: 'chúc một ngày tốt lành', aslGloss: 'GOOD DAY' },
  { phraseVi: 'chúc ngày tốt lành', aslGloss: 'GOOD DAY' },

  // 24. Chúc ngủ ngon.
  { phraseVi: 'chúc bạn ngủ ngon', aslGloss: 'GOOD NIGHT' },
  { phraseVi: 'chúc ngủ ngon', aslGloss: 'GOOD NIGHT' },

  // 25. Tôi đói bụng rồi.
  { phraseVi: 'tôi đói bụng rồi', aslGloss: 'I HUNGRY' },
  { phraseVi: 'tôi đói bụng', aslGloss: 'I HUNGRY' },
  { phraseVi: 'tôi đói rồi', aslGloss: 'I HUNGRY' },

  // 26. Tôi muốn uống nước.
  { phraseVi: 'tôi muốn uống nước', aslGloss: 'I WANT DRINK WATER' },
  { phraseVi: 'muốn uống nước', aslGloss: 'WANT DRINK WATER' },

  // 27. Xin lỗi, tôi đến trễ.
  { phraseVi: 'xin lỗi tôi đến trễ', aslGloss: 'SORRY I LATE' },
  { phraseVi: 'xin lỗi tôi đến muộn', aslGloss: 'SORRY I LATE' },

  // 28. Không có gì đâu.
  { phraseVi: 'không có chi đâu', aslGloss: 'WELCOME' },
  { phraseVi: 'không có gì đâu', aslGloss: 'WELCOME' },
  { phraseVi: 'không có chi', aslGloss: 'WELCOME' },
  { phraseVi: 'không có gì', aslGloss: 'WELCOME' },

  // 29. Tôi yêu bạn rất nhiều.
  { phraseVi: 'tôi yêu bạn rất nhiều', aslGloss: 'I LOVE YOU' },
  { phraseVi: 'tôi yêu bạn nhiều lắm', aslGloss: 'I LOVE YOU' },
  { phraseVi: 'tôi yêu bạn', aslGloss: 'I LOVE YOU' },
  { phraseVi: 'anh yêu em', aslGloss: 'I LOVE YOU' },
  { phraseVi: 'em yêu anh', aslGloss: 'I LOVE YOU' },

  // 30. Gia đình tôi ở Việt Nam.
  { phraseVi: 'gia đình tôi ở việt nam', aslGloss: 'MY FAMILY VIETNAM' },
  { phraseVi: 'gia đình ở việt nam', aslGloss: 'FAMILY VIETNAM' },

  // 31. Hãy dừng lại ngay!
  { phraseVi: 'hãy dừng lại ngay', aslGloss: 'STOP NOW' },
  { phraseVi: 'dừng lại ngay', aslGloss: 'STOP NOW' },
  { phraseVi: 'dừng ngay', aslGloss: 'STOP NOW' },

  // 32. Chờ tôi một lát nhé.
  { phraseVi: 'chờ tôi một lát nhé', aslGloss: 'WAIT ME MINUTE' },
  { phraseVi: 'chờ tôi một lát', aslGloss: 'WAIT ME MINUTE' },
  { phraseVi: 'chờ tôi một chút', aslGloss: 'WAIT ME MINUTE' },
  { phraseVi: 'đợi tôi một lát', aslGloss: 'WAIT ME MINUTE' },

  // 33. Bạn có bận không?
  { phraseVi: 'bạn có bận không', aslGloss: 'YOU BUSY' },
  { phraseVi: 'bạn bận không', aslGloss: 'YOU BUSY' },

  // 34. Tôi đang làm việc.
  { phraseVi: 'tôi đang làm việc', aslGloss: 'I WORK' },
  { phraseVi: 'tôi làm việc', aslGloss: 'I WORK' },

  // 35. Tạm biệt và bảo trọng nhé!
  { phraseVi: 'tạm biệt và bảo trọng nhé', aslGloss: 'GOODBYE SAFE' },
  { phraseVi: 'tạm biệt và bảo trọng', aslGloss: 'GOODBYE SAFE' },
  { phraseVi: 'tạm biệt bảo trọng', aslGloss: 'GOODBYE SAFE' },

  // --- CÁC CÂU MỞ RỘNG VÀ TỪ RIÊNG LẺ KHÁC ---
  { phraseVi: 'chúc bạn một ngày thứ sáu vui vẻ', aslGloss: 'WISH YOU HAPPY FRIDAY' },
  { phraseVi: 'chúc bạn ngày thứ sáu vui vẻ', aslGloss: 'WISH YOU HAPPY FRIDAY' },
  { phraseVi: 'chúc bạn một ngày vui vẻ', aslGloss: 'WISH YOU HAPPY DAY' },
  { phraseVi: 'chúc bạn ngày vui vẻ', aslGloss: 'WISH YOU HAPPY DAY' },
  { phraseVi: 'rất tốt vì hôm nay là thứ sáu', aslGloss: 'GOOD TODAY FRIDAY' },
  { phraseVi: 'như thế nào', aslGloss: 'HOW' },
  { phraseVi: 'thế nào', aslGloss: 'HOW' },
  { phraseVi: 'tại sao', aslGloss: 'WHY' },
  { phraseVi: 'vì sao', aslGloss: 'WHY' },
  { phraseVi: 'ở đâu', aslGloss: 'WHERE' },
  { phraseVi: 'cái gì', aslGloss: 'WHAT' },
  { phraseVi: 'bao nhiêu', aslGloss: 'HOW MORE' },
  { phraseVi: 'mấy giờ', aslGloss: 'TIME WHAT' },
  { phraseVi: 'thời gian', aslGloss: 'TIME' },
  { phraseVi: 'tạm biệt', aslGloss: 'GOODBYE' },
  { phraseVi: 'xin chào', aslGloss: 'HELLO' },
  { phraseVi: 'chào bạn', aslGloss: 'HELLO' },
  { phraseVi: 'xin lỗi', aslGloss: 'SORRY' },
  { phraseVi: 'xin tha lỗi', aslGloss: 'SORRY' },
  { phraseVi: 'bạn bè', aslGloss: 'FRIEND' },
  { phraseVi: 'người bạn', aslGloss: 'FRIEND' },
  { phraseVi: 'gia đình', aslGloss: 'FAMILY' },
  { phraseVi: 'học tập', aslGloss: 'LEARN' },
  { phraseVi: 'làm việc', aslGloss: 'WORK' },
  { phraseVi: 'công việc', aslGloss: 'WORK' },
  { phraseVi: 'dừng lại', aslGloss: 'STOP' },
  { phraseVi: 'nhiều hơn', aslGloss: 'MORE' },
  { phraseVi: 'lặp lại', aslGloss: 'AGAIN' },
  { phraseVi: 'hoàn thành', aslGloss: 'FINISH' },
  { phraseVi: 'thức ăn', aslGloss: 'FOOD' },
  { phraseVi: 'ban ngày', aslGloss: 'DAY' },
  { phraseVi: 'ban đêm', aslGloss: 'NIGHT' },
  { phraseVi: 'mọi người', aslGloss: 'EVERYONE' },
  { phraseVi: 'tất cả', aslGloss: 'EVERYBODY' },
  { phraseVi: 'hiểu rồi', aslGloss: 'UNDERSTAND' },
  { phraseVi: 'bạn có hiểu không', aslGloss: 'YOU UNDERSTAND' },
  { phraseVi: 'tôi hiểu', aslGloss: 'I UNDERSTAND' },
  { phraseVi: 'tôi không hiểu', aslGloss: 'I NOT UNDERSTAND' },
  { phraseVi: 'hôm nay', aslGloss: 'TODAY' },
  { phraseVi: 'thứ sáu', aslGloss: 'FRIDAY' },
  { phraseVi: 'thứ 6', aslGloss: 'FRIDAY' },
  { phraseVi: 'ngôi nhà', aslGloss: 'HOUSE' },
  { phraseVi: 'trường học', aslGloss: 'SCHOOL' },
  { phraseVi: 'mệt mỏi', aslGloss: 'TIRED' },
  { phraseVi: 'bây giờ', aslGloss: 'NOW' },

  // Single word mappings
  { phraseVi: 'chào', aslGloss: 'HELLO' },
  { phraseVi: 'cảm ơn', aslGloss: 'THANK' },
  { phraseVi: 'cám ơn', aslGloss: 'THANK' },
  { phraseVi: 'vâng', aslGloss: 'YES' },
  { phraseVi: 'dạ', aslGloss: 'YES' },
  { phraseVi: 'đúng', aslGloss: 'YES' },
  { phraseVi: 'có', aslGloss: 'YES' },
  { phraseVi: 'không', aslGloss: 'NO' },
  { phraseVi: 'sai', aslGloss: 'NO' },
  { phraseVi: 'yêu', aslGloss: 'LOVE' },
  { phraseVi: 'thương', aslGloss: 'LOVE' },
  { phraseVi: 'bạn', aslGloss: 'YOU' },
  { phraseVi: 'tôi', aslGloss: 'I' },
  { phraseVi: 'mình', aslGloss: 'I' },
  { phraseVi: 'em', aslGloss: 'I' },
  { phraseVi: 'anh', aslGloss: 'YOU' },
  { phraseVi: 'chị', aslGloss: 'YOU' },
  { phraseVi: 'mẹ', aslGloss: 'MOM' },
  { phraseVi: 'má', aslGloss: 'MOM' },
  { phraseVi: 'bố', aslGloss: 'DAD' },
  { phraseVi: 'ba', aslGloss: 'DAD' },
  { phraseVi: 'cha', aslGloss: 'DAD' },
  { phraseVi: 'nước', aslGloss: 'WATER' },
  { phraseVi: 'ăn', aslGloss: 'EAT' },
  { phraseVi: 'uống', aslGloss: 'DRINK' },
  { phraseVi: 'ngủ', aslGloss: 'SLEEP' },
  { phraseVi: 'sách', aslGloss: 'BOOK' },
  { phraseVi: 'tốt', aslGloss: 'GOOD' },
  { phraseVi: 'giỏi', aslGloss: 'GOOD' },
  { phraseVi: 'khỏe', aslGloss: 'FINE' },
  { phraseVi: 'xấu', aslGloss: 'BAD' },
  { phraseVi: 'tệ', aslGloss: 'BAD' },
  { phraseVi: 'vui', aslGloss: 'HAPPY' },
  { phraseVi: 'hạnh phúc', aslGloss: 'HAPPY' },
  { phraseVi: 'thích', aslGloss: 'LIKE' },
  { phraseVi: 'học', aslGloss: 'LEARN' },
  { phraseVi: 'biết', aslGloss: 'KNOW' },
  { phraseVi: 'nghĩ', aslGloss: 'THINK' },
  { phraseVi: 'thấy', aslGloss: 'SEE' },
  { phraseVi: 'nhìn', aslGloss: 'SEE' },
  { phraseVi: 'xem', aslGloss: 'SEE' },
  { phraseVi: 'muốn', aslGloss: 'WANT' },
  { phraseVi: 'cần', aslGloss: 'NEED' },
  { phraseVi: 'ngừng', aslGloss: 'STOP' },
  { phraseVi: 'thôi', aslGloss: 'STOP' },
  { phraseVi: 'thêm', aslGloss: 'MORE' },
  { phraseVi: 'lại', aslGloss: 'AGAIN' },
  { phraseVi: 'xong', aslGloss: 'FINISH' },
  { phraseVi: 'gặp', aslGloss: 'MEET' },
  { phraseVi: 'đẹp', aslGloss: 'NICE' },
  { phraseVi: 'tên', aslGloss: 'NAME' },
  { phraseVi: 'ai', aslGloss: 'WHO' },
  { phraseVi: 'gì', aslGloss: 'WHAT' },
  { phraseVi: 'ngày', aslGloss: 'DAY' },
  { phraseVi: 'đêm', aslGloss: 'NIGHT' },
  { phraseVi: 'nóng', aslGloss: 'HOT' },
  { phraseVi: 'lạnh', aslGloss: 'COLD' },
  { phraseVi: 'nhà', aslGloss: 'HOUSE' },
  { phraseVi: 'trường', aslGloss: 'SCHOOL' },
  { phraseVi: 'tiền', aslGloss: 'MONEY' },
  { phraseVi: 'mệt', aslGloss: 'TIRED' },
  { phraseVi: 'chúc', aslGloss: 'WISH' }
];

/**
 * Translates Vietnamese input text into a sequence of ASL gloss words.
 * If text is already in English, it preserves the English words.
 */
export function translateVietnameseToASLGloss(inputText: string): string {
  let result = ' ' + inputText.trim().toLowerCase() + ' ';

  for (const item of VIETNAMESE_ASL_PHRASES) {
    const escaped = item.phraseVi.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('(?<![\\p{L}\\p{N}])' + escaped + '(?![\\p{L}\\p{N}])', 'giu');
    result = result.replace(regex, ' ' + item.aslGloss + ' ');
  }

  return result.trim().replace(/\s+/g, ' ');
}
