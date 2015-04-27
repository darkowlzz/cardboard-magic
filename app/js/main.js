(function () {

// cardboardmagic
var cbm = {};

// For cardboard app
cbm.isCardboard = true;

function initialSetup () {
  var that = this;
  // Create a container 
  that.container = document.createElement('div');
  document.body.appendChild(cbm.container);

  // Create a renderer
  that.renderer = new THREE.WebGLRenderer();
  that.renderer.setClearColor(0xf0f0f0);
  that.renderer.setSize( window.innerWidth, window.innerHeight );
  that.element = that.renderer.domElement;

  // Add the renderer to the container
  that.container.appendChild( that.renderer.domElement );

  // Add Stereo effect -- CARDBOARD ONLY
  if (that.isCardboard) {
    that.effect = new THREE.StereoEffect(that.renderer);
    that.effect.setSize( window.innerWidth, window.innerHeight );
  }

  // Create a scene
  that.scene = new THREE.Scene();

  // Create a camera
  that.camera = new THREE.PerspectiveCamera(
                      90, window.innerWidth / window.innerHeight, 1, 5000 );
  that.camera.position.y = 250;
  that.camera.position.z = 800;
  // Add the camera to the scene
  that.scene.add(that.camera);

  // Create Orbit Controls -- CARDBOARD ONLY
  if (that.isCardboard) {
    that.controls = new THREE.OrbitControls(that.camera, that.element);
    // Raise the controller
    that.controls.rotateUp(Math.PI / 4);
    that.controls.noZoom = true;
    that.controls.noPan = true;

    window.addEventListener('deviceorientation', setOrientationControls, true);
  }
}


function init () {
  console.log('inside init');
  initialSetup.bind(cbm)();
  cs.create(cbm);
  window.addEventListener('resize', onWindowResize, false);
}


// Animation loop
function animate () {
  requestAnimationFrame( animate );
  onWindowResize();
  cs.update();
  // Render using the effect
  if (cbm.isCardboard) {
    cbm.effect.render( cbm.scene, cbm.camera );
    // Update the controls !important
    cbm.controls.update();
  } else {
    cbm.renderer.render( cbm.scene, cbm.camera );
  }
}


// Handle window resize.
function onWindowResize () {
  cbm.camera.aspect = window.innerWidth / window.innerHeight;
  cbm.camera.updateProjectionMatrix();
  cbm.renderer.setSize(window.innerWidth, window.innerHeight);
  if (cbm.isCardboard) {
    cbm.effect.setSize(window.innerWidth, window.innerHeight);
  }
}


// Set orientation controls -- CARDBOARD ONLY
function setOrientationControls(e) {
  if (! e.alpha) {
    return;
  }
  cbm.controls = new THREE.DeviceOrientationControls(cbm.camera, true);
  cbm.controls.connect();
  cbm.controls.update();
  cbm.element.addEventListener('click', fullscreen, false);
  window.removeEventListener('deviceorientation', setOrientationControls, true);
}


// Go fullscreen
function fullscreen () {
  if (cbm.container.requestFullscreen) {
    cbm.container.requestFullscreen();
  } else if (cbm.container.webkitRequestFullscreen) {
    cbm.container.webkitRequestFullscreen();
  }
}

var cs = new CreateStuff(); // jshint ignore:line
// Initialize and animate
init();
animate();

})();
