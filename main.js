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
const material = new THREE.MeshBasicMaterial({ color: 0xFF6347, wireframe: true });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

animate();

// Adjust camera and renderer on window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
