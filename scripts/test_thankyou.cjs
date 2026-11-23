global.self = global;
const fs = require('fs');
const THREE = require('three');
const { GLTFLoader } = require('three/examples/jsm/loaders/GLTFLoader.js');
const { compileUtterance, signLookup } = require('@three-ws/sign-language');

const data = fs.readFileSync('public/avatars/avatar.glb');
const loader = new GLTFLoader();
loader.parse(data.buffer, '', (gltf) => {
  const model = gltf.scene;
  const signs = signLookup({ dominant: 'Right' });

  const compilation = compileUtterance('thank you', { signs });
  const clip = THREE.AnimationClip.parse(compilation.clip);

  clip.tracks = clip.tracks.filter(t =>
    !t.name.startsWith('Spine') &&
    !t.name.startsWith('Neck') &&
    !t.name.startsWith('Head') &&
    !t.name.startsWith('Hips')
  );

  const mixer = new THREE.AnimationMixer(model);
  const action = mixer.clipAction(clip);
  action.play();

  mixer.setTime(clip.duration * 0.5);
  model.updateMatrixWorld(true);

  const rHand = model.getObjectByName('RightHand');
  const lHand = model.getObjectByName('LeftHand');
  const rPos = new THREE.Vector3();
  const lPos = new THREE.Vector3();
  rHand.getWorldPosition(rPos);
  lHand.getWorldPosition(lPos);

  console.log('THANK YOU | Dur:', clip.duration.toFixed(2) + 's', '| RHand:', rPos.toArray().map(v=>+v.toFixed(2)).join(','), '| LHand:', lPos.toArray().map(v=>+v.toFixed(2)).join(','));
  process.exit(0);
});
