import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import wall2 from "../public/images/wall2.jpg";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ! start lobby

let keyboard = {};
document.addEventListener("keydown", (event) => {
  keyboard[event.key] = true;
  keyboard[event.keyCode] = true;
});

document.addEventListener("keyup", (event) => {
  keyboard[event.key] = false;
  keyboard[event.keyCode] = false;
});
import * as THREE from "https://cdn.skypack.dev/three@0.134.0/build/three.module.js";
import { PointerLockControls } from "https://cdn.skypack.dev/three@0.134.0/examples/jsm/controls/PointerLockControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.134.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.001,
  100
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.set(10, -5, 2);
camera.lookAt(0, 0, 0);
// Add ambient light to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Add directional light to the scene
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(0, 3, 0);
scene.add(directionalLight);

// renderer.setClearColor(new THREE.Color("grey"));
const textureLoader = new THREE.TextureLoader();
scene.background = textureLoader.load(wall2);
const loader = new GLTFLoader();
let model;
 let everythinghidden;
loader.load("./lobby/scene.gltf", function (gltf) {
  model = gltf.scene;
  model.position.x = 10;
  model.position.y = -10;
  scene.add(model);
  let mapLoc = document.querySelector("#mapLoc");
  let pokedex22 = document.querySelector("#pokedexMenu");
  let pokedexBTN = document.querySelector(".pokedexBtn");
  let Map = document.querySelector(".mapBtn");
  everythinghidden = true;
  

  function updateCameraPosition() {
    //wasd movement
    const speed = 0.1;
    const direction = camera.getWorldDirection(new THREE.Vector3());

    const perpendicularDirection = new THREE.Vector3(
      -direction.z,
      0,
      direction.x
    );

    if (keyboard["w"] && everythinghidden) {
      MapCoord();
      camera.position.add(direction.multiplyScalar(speed));
    } else if (keyboard["s"] && everythinghidden) {
      MapCoord();
      camera.position.add(direction.multiplyScalar(-speed));
    }
    if (keyboard["a"] && everythinghidden) {
      MapCoord();
      camera.position.add(perpendicularDirection.multiplyScalar(-speed));
    } else if (keyboard["d"] && everythinghidden) {
      MapCoord();
      camera.position.add(perpendicularDirection.multiplyScalar(speed));
    }
    // Move the camera up or down
    if (keyboard[32] && everythinghidden) {
      MapCoord();
      // Spacebar
      camera.position.y += speed;
    } else if (keyboard[16] && everythinghidden) {
      // Shift
      camera.position.y -= speed;
      MapCoord();
    }
    console.log(everythinghidden)
    if (keyboard["c"]) {
      console.log(camera.position.x, camera.position.y, camera.position.z);
    }
  }
  Map.addEventListener("click", () => { 
    mapLoc.style.visibility = "visible";
    MapCoord();
    everythinghidden = false;
  });
  pokedexBTN.addEventListener("click", () => {
    pokedex22.style.visibility = "visible";
    MapCoord();
    everythinghidden = false;
  });
  let hideMap = document.querySelector(".hideMap");
  let hidePokedex = document.querySelector("#hideBtn");
  hideMap.addEventListener("click", () => {
    everythinghidden = true;
  });
  hidePokedex.addEventListener("click", () => {
    everythinghidden = true;
  });

  
  let MapCoord = () => {
    if (
      camera.position.x < 4.3 &&
      camera.position.x > -3.8 &&
      camera.position.y > -4.7 &&
      camera.position.y < -3.9 &&
      camera.position.z < 5.19 &&
      camera.position.z > 4.4 &&
      Map.style.visibility == "hidden"
      
    ) {
      Map.style.visibility = "visible";
    } else {
      Map.style.visibility = "hidden";
    }

    if (
      camera.position.x < 11 &&
      camera.position.x > 7.2 &&
      camera.position.y > -5.70 &&
      camera.position.y < -2.9 &&
      camera.position.z < -0.8&&
      camera.position.z > -4 &&
      pokedexBTN.style.visibility == "hidden"
    ) {
      pokedexBTN.style.visibility = "visible";
    } else {
      pokedexBTN.style.visibility = "hidden";
    }
    
    
  };
  // Render the scene once the model has finished loading
  function animate() {
    requestAnimationFrame(animate);
    updateCameraPosition();
    renderer.render(scene, camera);
  }

  animate();
});
const controls = new PointerLockControls(camera, renderer.domElement);
document.addEventListener("keypress", () => {
  if (everythinghidden) {
    controls.lock();
  } 
    
});
