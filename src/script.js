let width = 500;
let height = 400;

// Create the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

// Create a WebGLRenderer and enable shadows
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(width, height);
renderer.antialias = true; // Smooth out the edges
document.body.appendChild(renderer.domElement);

// Position the camera
camera.position.set(0, 5, 20);

let rmixer = new THREE.AnimationMixer();
let wmixer = new THREE.AnimationMixer();
let bmixer = new THREE.AnimationMixer();

//Load textures
renderer.shadowMapType = THREE.BasicShadowMap;
const loader = new THREE.TextureLoader();
const roadtexture = loader.load('https://raw.githubusercontent.com/SeimW/three-js-construction-site/main/road.jpg');
const sitetexture = loader.load('https://raw.githubusercontent.com/SeimW/three-js-construction-site/main/dirt.png');
const grasstexture = loader.load('https://raw.githubusercontent.com/SeimW/three-js-construction-site/main/grass.png');
const sidetexture = loader.load('https://raw.githubusercontent.com/SeimW/three-js-construction-site/main/concrete.jpg');
const contexture = loader.load('https://raw.githubusercontent.com/SeimW/three-js-construction-site/main/concrete2.jpg');
const smoketexture = loader.load('https://raw.githubusercontent.com/SeimW/three-js-construction-site/main/fog01.png');


//road floor
const roadGeo = new THREE.BoxGeometry(30, 90);
const roadMaterial = new THREE.MeshStandardMaterial({map: roadtexture});
roadtexture.wrapS = THREE.RepeatWrapping;
roadtexture.wrapT = THREE.RepeatWrapping;
roadtexture.repeat.set(1, 3);
const road = new THREE.Mesh(roadGeo, roadMaterial);
road.rotation.x = -Math.PI / 2;
road.rotation.z = -Math.PI / 2;
road.position.z = 10;
road.receiveShadow = true;

scene.add(road);

//floor for construction site
const siteGeo = new THREE.BoxGeometry(30, 30);
const siteMaterial = new THREE.MeshStandardMaterial({map: sitetexture});
sitetexture.wrapS = THREE.RepeatWrapping;
sitetexture.wrapT = THREE.RepeatWrapping;
sitetexture.repeat.set(3,3);
const site = new THREE.Mesh(siteGeo, siteMaterial);
site.rotation.x = -Math.PI / 2;
site.receiveShadow = true;
site.position.z = -30;

scene.add(site);

//floor for factory
const factoryGeo = new THREE.BoxGeometry(30, 30);
const factoryMaterial = new THREE.MeshStandardMaterial({map: contexture});
contexture.wrapS = THREE.RepeatWrapping;
contexture.wrapT = THREE.RepeatWrapping;
contexture.repeat.set(1,1);
const factoryfl = new THREE.Mesh(factoryGeo, factoryMaterial);
factoryfl.rotation.x = -Math.PI / 2;
factoryfl.receiveShadow = true;
factoryfl.position.z = -30;
factoryfl.position.x = 30;

scene.add(factoryfl);

//floor for building
const buildingGeo = new THREE.BoxGeometry(30, 30);
const buildingMaterial = new THREE.MeshStandardMaterial({map: grasstexture});
grasstexture.wrapS = THREE.RepeatWrapping;
grasstexture.wrapT = THREE.RepeatWrapping;
grasstexture.repeat.set(3,3);
const buildingfl = new THREE.Mesh(buildingGeo, buildingMaterial);
buildingfl.rotation.x = -Math.PI / 2;
buildingfl.receiveShadow = true;
buildingfl.position.z = -30;
buildingfl.position.x = -30;

scene.add(buildingfl);

//sidewalk
const sideWGeo = new THREE.BoxGeometry(10, 90);
const sideWMaterial = new THREE.MeshStandardMaterial({map: sidetexture});
sidetexture.wrapS = THREE.RepeatWrapping;
sidetexture.wrapT = THREE.RepeatWrapping;
sidetexture.repeat.set(1, 9);
const sideW = new THREE.Mesh(sideWGeo, sideWMaterial);
sideW.rotation.x = -Math.PI / 2;
sideW.rotation.z = -Math.PI / 2;
sideW.receiveShadow = true;
sideW.position.z = -10;
scene.add(sideW);

//loader for custom models
const modelloader = new THREE.GLTFLoader();

//factory model
modelloader.load('https://raw.githubusercontent.com/SeimW/three-js-construction-site/main/Factory.glb', function (gltf) {
  const factory = gltf.scene;
  scene.add(factory);
  factory.traverse(function(node) {
    if(node.isMesh){
      node.castShadow = true;
    }
  });
  factory.position.set(30, 10, -30);
  factory.scale.setScalar(15);
  factory.receiveShadow = true;
});

//building model
modelloader.load('https://raw.githubusercontent.com/SeimW/three-js-construction-site/main/Large%20Building.glb', function (gltf) {
  const building = gltf.scene;
  scene.add(building);
  building.traverse(function(node) {
    if(node.isMesh){
      node.castShadow = true;
    }
  });
  building.position.set(-30, 0.5, -30);
  building.scale.setScalar(20);
  building.receiveShadow = true;
});

//Bulldozer model
modelloader.load('https://raw.githubusercontent.com/SeimW/three-js-construction-site/main/Bulldozer.glb', function (gltf) {
  const bullD = gltf.scene;
  scene.add(bullD);
  bullD.traverse(function(node) {
    if(node.isMesh){
      node.castShadow = true;
    }
  });
  bullD.position.set(-8, 1, -35);
  bullD.scale.setScalar(.5);
  bullD.rotation.y = Math.PI / 4;
  bullD.receiveShadow = true;
});

//Barrier model, using it 3 times to surround construction site
modelloader.load('https://raw.githubusercontent.com/SeimW/three-js-construction-site/main/Wooden%20Wall.glb', function (gltf) {
  const woodwall = gltf.scene;
  scene.add(woodwall);
  woodwall.traverse(function(node) {
    if(node.isMesh){
      node.castShadow = true;
    }
  });
  woodwall.position.set(0, 0, -45);
  woodwall.scale.set(22, 10, 10);
  woodwall.receiveShadow = true;
});

modelloader.load('https://raw.githubusercontent.com/SeimW/three-js-construction-site/main/Wooden%20Wall.glb', function (gltf) {
  const woodwallL = gltf.scene;
  scene.add(woodwallL);
  woodwallL.traverse(function(node) {
    if(node.isMesh){
      node.castShadow = true;
    }
  });
  woodwallL.position.set(-15, 0, -30);
  woodwallL.scale.set(22, 10, 10);
  woodwallL.rotation.y = -Math.PI / 2;
  woodwallL.receiveShadow = true;
});

modelloader.load('https://raw.githubusercontent.com/SeimW/three-js-construction-site/main/Wooden%20Wall.glb', function (gltf) {
  const woodwallR = gltf.scene;
  scene.add(woodwallR);
  woodwallR.traverse(function(node) {
    if(node.isMesh){
      node.castShadow = true;
    }
  });
  woodwallR.position.set(15, 0, -30);
  woodwallR.scale.set(22, 10, 10);
  woodwallR.rotation.y = -Math.PI / 2;
  woodwallR.receiveShadow = true;
});

//Structure in the construction site
modelloader.load('https://raw.githubusercontent.com/SeimW/three-js-construction-site/main/Structure.glb', function (gltf) {
  const struct = gltf.scene;
  scene.add(struct);
  struct.traverse(function(node) {
    if(node.isMesh){
      node.castShadow = true;
    }
  });
  struct.position.set(8, 0, -40);
  struct.scale.setScalar(1);
  struct.rotation.y = Math.PI / 2;
  struct.receiveShadow = true;
  struct.castShadow = true;
});

//Generator in the construction site
modelloader.load('https://raw.githubusercontent.com/SeimW/three-js-construction-site/main/Generator.glb', function (gltf) {
  const gen = gltf.scene;
  scene.add(gen);
  gen.traverse(function(node) {
    if(node.isMesh){
      node.castShadow = true;
    }
  });
  gen.position.set(-8, 1, 15);
  gen.scale.setScalar(3);
  gen.rotation.y = Math.PI / 2;
});

//Sun model
modelloader.load('https://raw.githubusercontent.com/SeimW/three-js-construction-site/main/Sun.glb', function (gltf) {
  const sun = gltf.scene;
  scene.add(sun);
  sun.position.set(0, 40, -50);
  sun.scale.setScalar(3); 
});

//animated models!
const models = {
  worker: null,
  robot: null,
  businessman: null
}

//Businessman, he is trying to access his place of work
modelloader.load('https://raw.githubusercontent.com/SeimW/three-js-construction-site/main/Business%20Man.glb', function (gltf) {
  const businessman = gltf.scene;
  scene.add(businessman);
  bmixer = new THREE.AnimationMixer(businessman);
  let animations = gltf.animations;
  let action = bmixer.clipAction(animations[10]);
  action.play();
  businessman.traverse(function(node) {
    if(node.isMesh){
      node.castShadow = true;
    }
  });
  businessman.position.set(-30, .5, -16.5);
  businessman.scale.setScalar(3);
  businessman.rotation.y = -Math.PI;
  businessman.receiveShadow = true;
});

//A helpful construction bot warming up for the day
modelloader.load('https://raw.githubusercontent.com/SeimW/three-js-construction-site/main/Animated%20Robot.glb', function (gltf) {
  const robot = gltf.scene;
  scene.add(robot);
  rmixer = new THREE.AnimationMixer(robot);
  let animations = gltf.animations;
  let action = rmixer.clipAction(animations[0]);
  action.play();
  robot.traverse(function(node) {
    if(node.isMesh){
      node.castShadow = true;
    }
  });
  robot.position.set(-12, .5, -20);
  robot.scale.setScalar(1);
  robot.receiveShadow = true;
});

//A friendly construction worker waving
modelloader.load('https://raw.githubusercontent.com/SeimW/three-js-construction-site/main/Worker.glb', function (gltf) {
  const worker = gltf.scene;
  scene.add(worker);
  wmixer = new THREE.AnimationMixer(worker);
  let animations = gltf.animations;
  let action = wmixer.clipAction(animations[23]);
  action.play();
  worker.position.set(8, .5, -20);
  worker.scale.setScalar(3);
  worker.receiveShadow = true;
  worker.castShadow = true;
});

//Particles for the smoke emitting from the factory
const particleCount = 100;
const particles = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3); // 3 coordinates for each particle
const colors = new Float32Array(particleCount * 3); // 3 color values for each particle

const sizes = new Float32Array(particleCount); // Size for each particle

for (let i = 0; i < particleCount; i++) {
  //Determines which exhaust (left or right) the smoke comes out off
  if(Math.random() > .5){
    positions[i * 3] = (Math.random()) + 26; // x position around 26
  }
  else{
    positions[i * 3] = (Math.random()) + 20; // x position around 20
  }
  positions[i * 3 + 1] = (Math.random()) * 30; // y position anywhere between 0 and 30
  positions[i * 3 + 2] = (Math.random() - 0.5) - 40; // z position around -40

  //All gray
  colors[i * 3] = .5 // r
  colors[i * 3 + 1] = .5 // g
  colors[i * 3 + 2] = .5 // b

  // Random size
  sizes[i] = Math.random() * .25; // Size between 0 and .25

}

function animateParticles() {
    const positionArray = particles.attributes.position.array;

    for (let i = 0; i < particleCount; i++) {
        //rises until it hits a certain height then gets sent to 20
        positionArray[i * 3 + 1] += 0.1;
        if (positionArray[i * 3 + 1] > 50) {
            positionArray[i * 3 + 1] = 20;
        }
    }

    particles.attributes.position.needsUpdate = true; // Mark the position attribute as needing an update
}

particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
particles.setAttribute("color", new THREE.BufferAttribute(colors, 3)); // Set color attribute

particles.setAttribute("size", new THREE.BufferAttribute(sizes, 1)); // Set size attribute

const particleMaterial = new THREE.PointsMaterial({
    size: 1,
    map: smoketexture,
    vertexColors: true, // Use vertex colors
    sizeAttenuation: true, // Size decreases with distance
    transparent: true,
    opacity: 0.5,
});


const particleSystem = new THREE.Points(particles, particleMaterial);

scene.add(particleSystem);

//Ambient Lighting
const ambientLight = new THREE.AmbientLight("white", .5);
scene.add(ambientLight);

//Sunlight
const sunlight = new THREE.DirectionalLight("white", 1);
scene.add(sunlight);
sunlight.position.set(0, 40, -50);
sunlight.castShadow = true;
sunlight.shadow.mapSize.width = 5120 // default
sunlight.shadow.mapSize.height = 5120 // default
sunlight.shadow.camera.near = 0.1 // default
sunlight.shadow.camera.far = 500 // default
sunlight.shadow.camera.top = -100 // default
sunlight.shadow.camera.right = 100 // default
sunlight.shadow.camera.left = -100 // default
sunlight.shadow.camera.bottom = 100 // default

// Load cubemap textures
const cubeTextureLoader = new THREE.CubeTextureLoader();
const cubemap = cubeTextureLoader.load([
  'https://raw.githubusercontent.com/amaraauguste/amaraauguste.github.io/refs/heads/master/courses/CISC3620/textures/Daylight%20Box_Pieces/Daylight%20Box_PosX.bmp',  
  'https://raw.githubusercontent.com/amaraauguste/amaraauguste.github.io/refs/heads/master/courses/CISC3620/textures/Daylight%20Box_Pieces/Daylight%20Box_NegX.bmp',
  'https://raw.githubusercontent.com/amaraauguste/amaraauguste.github.io/refs/heads/master/courses/CISC3620/textures/Daylight%20Box_Pieces/Daylight%20Box_PosY.bmp',
  'https://raw.githubusercontent.com/amaraauguste/amaraauguste.github.io/refs/heads/master/courses/CISC3620/textures/Daylight%20Box_Pieces/Daylight%20Box_NegY.bmp',
  'https://raw.githubusercontent.com/amaraauguste/amaraauguste.github.io/refs/heads/master/courses/CISC3620/textures/Daylight%20Box_Pieces/Daylight%20Box_PosZ.bmp',
  'https://raw.githubusercontent.com/amaraauguste/amaraauguste.github.io/refs/heads/master/courses/CISC3620/textures/Daylight%20Box_Pieces/Daylight%20Box_NegZ.bmp'
]);

// Set cubemap as background and environment
scene.background = cubemap;
scene.environment = cubemap;

//WRITE CODE TO ADD ORBIT CONTROLS HERE
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.update();

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  wmixer.update(0.005);
  bmixer.update(0.005);
  rmixer.update(0.005);
  
  renderer.render(scene, camera);
  animateParticles();
}

animate();
