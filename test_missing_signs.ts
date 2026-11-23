import { ASL_DICTIONARY } from './src/asl/dictionary';
import { CUSTOM_SIGN_WORDS } from './src/asl/customSigns';
import { VIETNAMESE_ASL_PHRASES } from './src/asl/vietnameseMapping';

const customSet = new Set(CUSTOM_SIGN_WORDS.map(w => w.toUpperCase()));

console.log('Total custom signs in CUSTOM_SIGNS:', customSet.size);

const missingFromDict = [];
for (const item of ASL_DICTIONARY) {
  const gloss = item.gloss.toUpperCase();
  if (!customSet.has(gloss)) {
    missingFromDict.push(gloss);
  }
}
console.log('Words in ASL_DICTIONARY missing from CUSTOM_SIGNS:', missingFromDict);

const missingFromMap = [];
for (const item of VIETNAMESE_ASL_PHRASES) {
  const glosses = item.aslGloss.toUpperCase().split(/\s+/);
  for (const g of glosses) {
    if (!customSet.has(g) && !missingFromMap.includes(g)) {
      missingFromMap.push(g);
    }
  }
}
console.log('Glosses in VIETNAMESE_ASL_PHRASES missing from CUSTOM_SIGNS:', missingFromMap);
