import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './styles.css';
import { handleMobileView } from './mobileDetection.js';
import { spaceTexture, moonTexture, normalTexture, cloudTexture, lavaTexture , rockTexture, rockFont } from './assetLoader.js';
import { vertexShader } from './vertexShader.js';
import { fragmentShader } from './fragmentShader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import backgroundAudio from './assets/audio/background.wav'; // Import the audio file

const clock = new THREE.Clock(); // Ensure clock is created

// Scale adjustment
const adjustBackgroundScale = () =>  backgroundMesh.scale.set(getAspectRatio(), 1, 1);


handleMobileView(); // Call the function to handle mobile view

const getAspectRatio = () => window.innerWidth / window.innerHeight;

const scene = new THREE.Scene(); // Scene will This is where you place objects, lights and cameras.

// Camera setup
const fov = 75;                                         // Camera frustum vertical field of view. 
const aspect = getAspectRatio();                        // Camera frustum aspect ratio. 
const near = 0.1;                                       // Camera frustum near plane.
const far = 1000;                                       // Camera frustum far plane.

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg') });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Camera position
camera.position.setX(-3);
camera.position.setZ(30);

// Initialize a mesh with MeshStandardMaterial and a specifiey geometry and add it to the scene   
const initStandardObject = (geometry, meshParam) => {
    const material = new THREE.MeshStandardMaterial(meshParam);
    const object = new THREE.Mesh(geometry, material);
    scene.add(object);
    return object;
};

// torus
lavaTexture.colorSpace = THREE.SRGBColorSpace;
cloudTexture.wrapS = cloudTexture.wrapT = THREE.RepeatWrapping;
lavaTexture.wrapS = lavaTexture.wrapT = THREE.RepeatWrapping;

const uniforms = {
  fogDensity: { value: 0.55 },
  fogColor: { value: new THREE.Vector3(0, 0, 0) },
  time: { value: 1.0 },
  uvScale: { value: new THREE.Vector2(3.0, 1.0) },
  texture1: { value: cloudTexture },
  texture2: { value: lavaTexture }
};

const lavaMaterial = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: vertexShader,
  fragmentShader: fragmentShader
});

const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
const torus = new THREE.Mesh(torusGeometry, lavaMaterial);
scene.add(torus);

// Rock
const createRockSlab = (width, height, depth, texture) => {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  const material = new THREE.MeshStandardMaterial({ map: texture });
  const slab = new THREE.Mesh(geometry, material);
  return slab;
};

const createText = (text, font, size, height) => {
  const textGeometry = new TextGeometry(text, {
    font: rockFont,
    size: size,
    depth: height,
  });
  const textMaterial = new THREE.MeshStandardMaterial({ color: 0xc9c9c9 });
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  return textMesh;
};
// Size of the slab: [width, height, depth]
// Position of the slab: [x, y, z]
// Text content to display on the slab
// Position of the text: [x, y, z]
const slabData = [
  {
    slabSize: [6, 3, 1],
    slabPosition: [-3, 0, -3],
    text: 'Brandon Hardatt \nFull Stack Developer \nAI \nData Science \nGame Developer',
    textPosition: [-5.3, 0.9, -2],
  },
  {
    slabSize: [6, 1, 1],
    slabPosition: [-3, 0, 2],
    text: 'Solving tough problems \nwith innovative tech',
    textPosition: [-5.3, 0.1, 3],
  },
  {
    slabSize: [12, 5, 1],
    slabPosition: [-3, 0, 14],
    text: "Hi Im Brandon Hardatt \nA recent graduate from MUN with a BSc in Computer \nScience my academic and professional journey has been \ndeeply intertwined with developing innovative solutions \nthrough technology I have gained proficiency in various \nAI fields \n\nMy academic pursuits also led me to gain a good \nfoundation in game programming and full stack \ndevelopment",
    textPosition: [-8, 1.7, 15],
  },
  // Add more slabs and texts as needed
];

slabData.forEach(({ slabSize, slabPosition, text, textPosition }) => {
  const [slabWidth, slabHeight, slabDepth] = slabSize;
  const [slabX, slabY, slabZ] = slabPosition;
  const [textX, textY, textZ] = textPosition;

  // Create and position the slab
  const slab = createRockSlab(slabWidth, slabHeight, slabDepth, rockTexture);
  slab.position.set(slabX, slabY, slabZ);
  scene.add(slab);

  // Create and position the text
  const textMesh = createText(text, rockFont, 0.2, 0.01);
  textMesh.position.set(textX, textY, textZ);
  scene.add(textMesh);
});

// Audio
const audio = document.getElementById('background-audio');
audio.src = backgroundAudio;
audio.loop = true;

// Start audio on page load
window.addEventListener('load', () => {
  audio.play().catch(error => {
    console.log('Autoplay was prevented:', error);
    // Optionally, you can show a play button to let the user start the audio
  });
});



// Lighting
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//Helpers
// const gridHelper = new THREE.GridHelper(200, 50);
// const lightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(lightHelper, gridHelper);
// const controls = new OrbitControls(camera, renderer.domElement);

const addPlanets = () => {
    // Generate a random hex color and ensure it is always 6 characters
    const colorHex = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    
    // Create a planet with the generated color
    const starGeometry = new THREE.SphereGeometry(0.25, 24, 24);
    const star = new THREE.Mesh(starGeometry, lavaMaterial);
    scene.add(star);
    // Generate random positions for the planet
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
};

Array(300).fill().forEach(addPlanets); // Create 300 stars with random colors


// Background
const backgroundMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.MeshBasicMaterial({ map: spaceTexture })
);

backgroundMesh.material.depthTest = false;
backgroundMesh.material.depthWrite = false;

const backgroundScene = new THREE.Scene();
const backgroundCamera = new THREE.Camera();
backgroundScene.add(backgroundMesh);

// Moon
const moon = initStandardObject(new THREE.SphereGeometry(3, 32, 32), { map: moonTexture, normalMap: normalTexture }); 
moon.position.z = 30;
moon.position.setX(-10);
  

// Scroll Animation
const moveCamera = () => {
    const t = document.body.getBoundingClientRect().top;
    
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;
    
    camera.position.z = t * -0.01;
    // camera.position.x = t * -0.0002;
    // camera.rotation.y = t * -0.0002;
  }
  
document.body.onscroll = moveCamera;
moveCamera();

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    const delta = clock.getDelta();
    uniforms.time.value += delta;

    // controls.update();

    renderer.autoClear = false;
    renderer.clear();
    renderer.render(backgroundScene, backgroundCamera); // Render the background scene
    renderer.render(scene, camera, backgroundScene);    // Render the main scene
};

// Adjust camera and renderer on window resize
window.addEventListener('resize', () => {
    camera.aspect = getAspectRatio();
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    adjustBackgroundScale();
});

animate();