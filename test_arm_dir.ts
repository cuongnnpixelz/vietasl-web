import * as THREE from 'three';

const retargetL = new THREE.Quaternion(0.0447, 0.994, 0.059, -0.0796);
const qOrig = new THREE.Quaternion(-0.669, -0.387, -0.369, -0.516);

const qRetargeted = retargetL.clone().multiply(qOrig);
console.log('qRetargeted:', qRetargeted);

// What is the direction of the arm bone vector [0, -1, 0] transformed by qRetargeted?
const vDown = new THREE.Vector3(0, -1, 0);
const vAfter = vDown.clone().applyQuaternion(qRetargeted);
console.log('Arm pointing vector in local space:', vAfter);
