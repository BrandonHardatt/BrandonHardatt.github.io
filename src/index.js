import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './styles.css';


// Detect if the device is mobile
const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i; // Regular expression to detect mobile devices

const isMobile = () => mobileRegex.test(navigator.userAgent);

if (isMobile()) {
    document.getElementById('mobile-message').style.display = 'block'; // Show the mobile message and 
    document.querySelector('#bg').style.display = 'none';              // hide the canvas
    throw new Error('Mobile viewing error');                           // throw error to stop code execution
}


const scene = new THREE.Scene(); // Scene will This is where you place objects, lights and cameras.

// Camera setup
const fov = 75;                                         // Camera frustum vertical field of view. 
const aspect = window.innerWidth / window.innerHeight;  // Camera frustum aspect ratio. 
const near = 0.1;                                       // Camera frustum near plane.
const far = 1000;                                       // Camera frustum far plane.

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg') });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Camera position
camera.position.setZ(30);

// Add a torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Lighting
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const gridHelper = new THREE.GridHelper(200, 50);
const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);





// Animation loop
const animate = () => {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01; // Add rotation to the torus for some animation
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    controls.update();

    renderer.render(scene, camera);
};

animate();

// Adjust camera and renderer on window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});