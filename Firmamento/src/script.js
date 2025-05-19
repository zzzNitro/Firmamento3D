import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Phase 1: mise en place
// initialize the scene
// add camera, model, and light
// add placeholder texture
// add rotation for the model
// add rezize listener
// add render loop
// ---DONE---

// Phase 2: finte tune animation
// add cloud ring texture (probably needs to be a second model)
// add rotation speed for the cloud ring
// add actual day texture (WIP - 90% done)

// Phase 2.1: add night cycle
// add night texture
// fade in and out the night texture
// fine tune the light to match the day/night cycle

// Phase 2.2: add stars
// add cude map for the stars
// add stars to the background

// Phase 2.3: more fine tuning
// add a bump map to the cloud ring

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  400
);
camera.position.z = 20;
camera.position.y = 4;
// camera.position.

// add a texture loader
const textureLoader = new THREE.TextureLoader();
// const planetTexturte = textureLoader.load('/textures/test-ink.png')
// planetTexturte.colorSpace = THREE.SRGBColorSpace

const dayTexture = textureLoader.load('/textures/Geosfera-day.png');
dayTexture.colorSpace = THREE.SRGBColorSpace;
dayTexture.anisotropy = 8;

const nightTexture = textureLoader.load('/textures/Geosfera-night.png');
nightTexture.colorSpace = THREE.SRGBColorSpace;
nightTexture.anisotropy = 8;

const bumpRoughnessCloudsTexture = textureLoader.load('/textures/earth_bump_roughness_clouds_4096.jpg');
bumpRoughnessCloudsTexture.anisotropy = 8;

// // fresnel
// const viewDirection = positionWorld.sub(cameraPosition).normalize();
// const fresnel = viewDirection.dot(normalWorld).abs().oneMinus().toVar();

// // sun orientation
// const sunOrientation = normalWorld.dot( normalize( sun.position ) ).toVar();

// // atmosphere color
// const atmosphereColor = mix( atmosphereTwilightColor, atmosphereDayColor, sunOrientation.smoothstep( - 0.25, 0.75 ) );


// cloud ring texture
const cloudRingTexture = textureLoader.load('/textures/cloud_ring.png')

// create a sphere geometry
const geometry = new THREE.SphereGeometry(1, 32, 32);
const planetMaterial = new THREE.MeshStandardMaterial({
  // map: planetTexturte
  map: dayTexture,
})

const cloudRingMaterial = new THREE.MeshStandardMaterial({
  map: cloudRingTexture,
  // opacity: 0.3,
  transparent: true,
  // color: 'red',
})

// planet 
const planet = new THREE.Mesh(geometry, planetMaterial);
planet.scale.setScalar(8)



// cloud ring
const cloudRing = new THREE.Mesh(geometry, cloudRingMaterial);
cloudRing.scale.setScalar(8.08)

// atmosphere



// add lights
const sun = new THREE.DirectionalLight('#fffdfa', 2);
sun.position.set(0, 0, 3);

// uniforms
// const atmosphereDayColor = uniform(color('#4db2ff'));
// const atmosphereTwilightColor = uniform(color('#bc490b'));
// const roughnessLow = uniform(0.25);
// const roughnessHigh = uniform(0.35);

// add elements to the scene
scene.add(planet);
scene.add(cloudRing);
scene.add(sun);


// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// add controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;
// controls.maxDistance = 200;
// controls.minDistance = 20;

// add resize listener
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Clock();

// render loop
const renderloop = () => {
  planet.rotation.y += 0.001;

  cloudRing.rotation.y += 0.0005;


  // controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};


renderloop();