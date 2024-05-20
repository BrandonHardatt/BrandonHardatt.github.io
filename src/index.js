import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './styles.css';
import spaceImage from './assets/images/space.jpg';
import brandonImage from './assets/images/brandon.jpg';
import moonImage from './assets/images/moon.jpg';
import normalImage from './assets/images/normal.jpg';

// Detect if the device is mobile
const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i; // Regular expression to detect mobile devices

const isMobile = () => mobileRegex.test(navigator.userAgent);

if (isMobile()) {
    document.getElementById('mobile-message').style.display = 'block'; // Show the mobile message and 
    document.querySelector('#bg').style.display = 'none';              // hide the canvas
    throw new Error('Mobile viewing error');                           // throw error to stop code execution
}

const getAspectRatio = () => window.innerWidth / window.innerHeight;

// Load Textures
const textureLoader = new THREE.TextureLoader();
const spaceTexture = textureLoader.load(spaceImage, () =>  adjustBackgroundScale());
const brandonTexture = textureLoader.load(brandonImage);
const moonTexture = textureLoader.load(moonImage);
const normalTexture = textureLoader.load(normalImage);


const scene = new THREE.Scene(); // Scene will This is where you place objects, lights and cameras.

// Camera setup
const fov = 75;                                         // Camera frustum vertical field of view. 
const aspect = getAspectRatio();  // Camera frustum aspect ratio. 
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

// Add a torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

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


const addStars = () => {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
};

Array(300).fill().forEach(addStars);


// Background

// Scale adjustment
const adjustBackgroundScale = () =>  backgroundMesh.scale.set(getAspectRatio(), 1, 1);

// Load the background texture

const backgroundMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.MeshBasicMaterial({ map: spaceTexture })
);
backgroundMesh.material.depthTest = false;
backgroundMesh.material.depthWrite = false;

// Create a scene for the background
const backgroundScene = new THREE.Scene();
const backgroundCamera = new THREE.Camera();
backgroundScene.add(backgroundMesh);

// Avatar
const brandon = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: brandonTexture }));
scene.add(brandon);

// Moon

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: normalTexture }));

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

brandon.position.z = -5;
brandon.position.x = 2;

// Scroll Animation

const moveCamera = () => {
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;
  
    brandon.rotation.y += 0.01;
    brandon.rotation.z += 0.01;
  
    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
  }
  
  document.body.onscroll = moveCamera;
  moveCamera();


// Animation loop
const animate = () => {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    // controls.update();

    // Render the background scene
    renderer.autoClear = false;
    renderer.clear();
    renderer.render(backgroundScene, backgroundCamera);

    // Render the main scene
    renderer.render(scene, camera);
};

// Adjust camera and renderer on window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    adjustBackgroundScale();
});

animate();