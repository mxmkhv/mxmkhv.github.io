import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x505050);
scene.add(new THREE.HemisphereLight(0x606060, 0x404040));

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.6, 3);

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(1, 1, 1).normalize();
scene.add(light);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;

const room = new THREE.LineSegments(
  new BoxLineGeometry(6, 6, 6, 10, 10, 10),
  new THREE.LineBasicMaterial({ color: 0x808080 })
);
room.geometry.translate(0, 3, 0);
scene.add(room);

const geometry = new THREE.IcosahedronBufferGeometry(0.08, 2);

for (let i = 0; i < 200; i++) {
  const object = new THREE.Mesh(
    geometry,
    new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
  );

  object.position.x = random(-2, 2);
  object.position.y = random(-2, 2);
  object.position.z = random(-2, 2);

  room.add(object);
}

document.body.appendChild(renderer.domElement);

//setup VR
document.body.appendChild(VRButton.createButton(renderer));
renderer.xr.enabled = true;

//resize scene on window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

renderer.setAnimationLoop(function() {
  renderer.render(scene, camera);
});

/////////////////////////////////////

function random(min, max) {
  return Math.random() * (max - min) + min;
}
