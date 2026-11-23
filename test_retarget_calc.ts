import * as THREE from 'three';
import { restLocal } from '@three-ws/sign-language';

const bindL = new THREE.Quaternion(-0.5733209252357483, -0.47017553448677063, -0.48225489258766174, 0.46654948592185974);
const bindR = new THREE.Quaternion(-0.5733211040496826, 0.4701753258705139, 0.4822547137737274, 0.46654948592185974);

const qMixL = new THREE.Quaternion(...restLocal('LeftShoulder'));
const qMixR = new THREE.Quaternion(...restLocal('RightShoulder'));

console.log('qMixL:', qMixL);
console.log('qMixR:', qMixR);

const retargetL = bindL.clone().invert().multiply(qMixL);
const retargetR = bindR.clone().invert().multiply(qMixR);

console.log('retargetL:', retargetL);
console.log('retargetR:', retargetR);
