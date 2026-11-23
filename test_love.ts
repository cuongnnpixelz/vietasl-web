import { compileASLUtterance } from './src/asl/compiler';

const res = compileASLUtterance('love');
console.log('Signed words:', res.signedWords);
console.log('Spelled words:', res.spelledWords);
console.log('Segments:', res.segments);
console.log('Clip duration:', res.clip?.duration);
console.log('Tracks count:', res.clip?.tracks?.length);
