import * as THREE from 'three';

import spaceImage from './assets/images/space.jpg';
import brandonImage from './assets/images/brandon.jpg';
import moonImage from './assets/images/moon.jpg';
import normalImage from './assets/images/normal.jpg';


// Load Textures
const textureLoader = new THREE.TextureLoader();
const spaceTexture = textureLoader.load(spaceImage);
const brandonTexture = textureLoader.load(brandonImage);
const moonTexture = textureLoader.load(moonImage);
const normalTexture = textureLoader.load(normalImage);

export { spaceTexture, brandonTexture, moonTexture, normalTexture };