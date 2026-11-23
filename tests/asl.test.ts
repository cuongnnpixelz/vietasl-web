import { describe, it, expect } from 'vitest';
import { normalizeInputText, compileASLUtterance, isWordVerified } from '../src/asl/compiler';
import { ASL_DICTIONARY } from '../src/asl/dictionary';
import { ASL_ALPHABET } from '../src/asl/fingerspelling';
import { isCustomSign } from '../src/asl/customSigns';
import { translateVietnameseToASLGloss } from '../src/asl/vietnameseMapping';

describe('ASL Compiler & Lexicon Test Suite', () => {
  it('should normalize input text properly', () => {
    const raw = '  Hello,   world! How are you???  ';
    const normalized = normalizeInputText(raw);
    expect(normalized).toBe('Hello world How are you');
  });

  it('should correctly identify verified ASL words including custom signs and sign-studio signs', () => {
    expect(isWordVerified('hello')).toBe(true);
    expect(isWordVerified('thankyou')).toBe(true);
    expect(isWordVerified('please')).toBe(true);
    expect(isWordVerified('yes')).toBe(true);
    expect(isWordVerified('no')).toBe(true);
    expect(isWordVerified('water')).toBe(true);
    expect(isWordVerified('eat')).toBe(true);
    expect(isWordVerified('drink')).toBe(true);
    expect(isWordVerified('family')).toBe(true);
    expect(isWordVerified('mom')).toBe(true);
    expect(isWordVerified('dad')).toBe(true);
    expect(isWordVerified('hot')).toBe(true);
    expect(isWordVerified('cold')).toBe(true);
    expect(isWordVerified('school')).toBe(true);
    expect(isWordVerified('house')).toBe(true);
    expect(isWordVerified('now')).toBe(true);
    expect(isWordVerified('today')).toBe(true);
    expect(isWordVerified('friday')).toBe(true);
    expect(isWordVerified('xyz123abc')).toBe(false);
  });

  it('should compile single verified sign "hello" into valid AnimationClip', () => {
    const result = compileASLUtterance('hello');
    expect(result.duration).toBeGreaterThan(0);
    expect(result.totalTracks).toBeGreaterThan(0);
    expect(result.signedWords).toContain('HELLO');
    expect(result.segments.length).toBe(1);
    expect(result.segments[0].status).toBe('verified');
  });

  it('should compile custom verified ASL sign "water"', () => {
    expect(isCustomSign('WATER')).toBe(true);
    const result = compileASLUtterance('water');
    expect(result.duration).toBeGreaterThan(0);
    expect(result.signedWords).toContain('WATER');
    expect(result.segments[0].status).toBe('verified');
    expect(result.segments[0].gloss).toBe('WATER');
  });

  it('should automatically translate Vietnamese phrases to standard ASL signs', () => {
    const gloss1 = translateVietnameseToASLGloss('Xin chào tôi yêu bạn');
    expect(gloss1).toBe('HELLO I LOVE YOU');

    const result = compileASLUtterance('Xin chào tôi yêu bạn');
    expect(result.duration).toBeGreaterThan(0);
    expect(result.signedWords).toContain('HELLO');
    expect(result.signedWords).toContain('I');
    expect(result.signedWords).toContain('LOVE');
    expect(result.signedWords).toContain('YOU');

    const gloss2 = translateVietnameseToASLGloss('Chúc bạn ngày thứ sáu vui vẻ');
    expect(gloss2).toBe('WISH YOU HAPPY FRIDAY');
    const result2 = compileASLUtterance('Chúc bạn ngày thứ sáu vui vẻ');
    expect(result2.signedWords).toContain('WISH');
    expect(result2.signedWords).toContain('YOU');
    expect(result2.signedWords).toContain('HAPPY');
    expect(result2.signedWords).toContain('FRIDAY');
  });

  it('should fallback to fingerspelling for unknown words', () => {
    const result = compileASLUtterance('xyzunknown');
    expect(result.duration).toBeGreaterThan(0);
    expect(result.spelledWords).toContain('XYZUNKNOWN');
    expect(result.segments.length).toBe(1);
    expect(result.segments[0].status).toBe('fingerspelled');
    expect(result.segments[0].gloss).toBe('fs-XYZUNKNOWN');
  });

  it('should compile mixed sentence "hello world thank you"', () => {
    const result = compileASLUtterance('hello world thank you');
    expect(result.duration).toBeGreaterThan(0);
    expect(result.signedWords).toContain('HELLO');
    expect(result.spelledWords).toContain('WORLD');
    expect(result.signedWords).toContain('THANK');
    expect(result.segments.length).toBeGreaterThanOrEqual(3);
  });

  it('should verify dictionary completeness and Vietnamese translations', () => {
    expect(ASL_DICTIONARY.length).toBeGreaterThan(30);
    ASL_DICTIONARY.forEach((item) => {
      expect(item.word).toBeTruthy();
      expect(item.gloss).toBeTruthy();
      expect(item.meaningVi).toBeTruthy();
      expect(item.descriptionVi).toBeTruthy();
      expect(item.verified).toBe(true);
    });
  });

  it('should verify ASL alphabet contains 26 letters A-Z', () => {
    expect(ASL_ALPHABET.length).toBe(26);
    expect(ASL_ALPHABET[0].char).toBe('A');
    expect(ASL_ALPHABET[25].char).toBe('Z');
  });
});
