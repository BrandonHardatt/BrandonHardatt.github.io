import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './styles.css';
import { handleMobileView } from './mobileDetection.js';
import { spaceTexture, brandonTexture, moonTexture, normalTexture } from './assetLoader.js';

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

const torus = initStandardObject(new THREE.TorusGeometry(10, 3, 16, 100), { color: 0xABCD90}) // Add a torus

 

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
    const star = initStandardObject(new THREE.SphereGeometry(0.25, 24, 24), { color: colorHex });
    
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

// Avatar
const brandon = initStandardObject(new THREE.BoxGeometry(3, 3, 3), { map: brandonTexture }); 
brandon.position.z = -5;
brandon.position.x = 2;

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