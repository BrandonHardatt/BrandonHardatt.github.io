import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

import spaceImage from './assets/images/space.jpg';
import moonImage from './assets/images/moon.jpg';
import normalImage from './assets/images/normal.jpg';
import cloudImage from './assets/images/cloud.png';
import lavaImage from './assets/images/lavatile.jpg';
import rockImage from './assets/images/rock.jpg';
import fontJson from './assets/font/Crackvetica_Regular.json';


// Load font
const fontLoader = new FontLoader();
const rockFont = fontLoader.parse(fontJson); // Parse the imported JSON font


// Load Textures
const textureLoader = new THREE.TextureLoader();
const spaceTexture = textureLoader.load(spaceImage); 
const moonTexture = textureLoader.load(moonImage);
const normalTexture = textureLoader.load(normalImage);
const cloudTexture = textureLoader.load(cloudImage);
const lavaTexture = textureLoader.load(lavaImage);
const rockTexture = textureLoader.load(rockImage);

export { spaceTexture, moonTexture, normalTexture, cloudTexture, lavaTexture, rockTexture, rockFont };