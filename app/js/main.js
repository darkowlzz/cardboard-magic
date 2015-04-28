require.config({
  baseUrl: 'js',
  paths: {
    THREE: 'vendor/three.min',
    StereoEffect: 'vendor/effects/StereoEffect',
    DeviceOrientationControls: 'vendor/controls/DeviceOrientationControls',
    OrbitControls: 'vendor/controls/OrbitControls',
    KeyboardState: 'vendor/threex.keyboardstate',
    socketio: 'vendor/socket.io'
  },
  shim: {
    THREE: {
      exports: 'THREE'
    },
    StereoEffect: {
      deps: ['THREE']
    },
    DeviceOrientationControls: {
      deps: ['THREE']
    },
    OrbitControls: {
      deps: ['THREE']
    },
    KeyboardState: {
      exports: 'THREEx'
    },
    socketio: {
      exports: 'io'
    }
  }
});

require(
[
  'THREE', 'create', 'KeyboardState', 'socketio', 'StereoEffect',
  'DeviceOrientationControls', 'OrbitControls'
], function (THREE, CreateStuff, THREEx, io) {
'use strict';

// cardboardmagic
var cbm = {};

// For cardboard app
cbm.isCardboard = true;

cbm.socket = io();

function initialSetup () {
  // Create a scene
  cbm.scene = new THREE.Scene();

  // Create a camera
  var SCREEN_WIDTH = window.innerWidth,
      SCREEN_HEIGHT = window.innerHeight,
      VIEW_ANGLE = 120,
      ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
      NEAR = 1, FAR = 1400;
  cbm.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR );
  // Add the camera to the scene
  cbm.scene.add(cbm.camera);
  cbm.camera.position.y = 150;
  cbm.camera.position.z = 500;

  // Create a container 
  cbm.container = document.createElement('div');
  document.body.appendChild(cbm.container);

  // Create a renderer
  cbm.renderer = new THREE.WebGLRenderer();
  cbm.renderer.setClearColor(0xf0f0f0);
  cbm.renderer.setSize( window.innerWidth, window.innerHeight );
  cbm.element = cbm.renderer.domElement;

  // Add the renderer to the container
  cbm.container.appendChild( cbm.renderer.domElement );

  // Add Stereo effect -- CARDBOARD ONLY
  if (cbm.isCardboard) {
    cbm.effect = new THREE.StereoEffect(cbm.renderer);
    cbm.effect.setSize( window.innerWidth, window.innerHeight );
  }

  // Create Orbit Controls
  cbm.controls = new THREE.OrbitControls(cbm.camera, cbm.element);
  // Raise the controller
  cbm.controls.rotateUp(Math.PI / 4);
  if (cbm.isCardboard) { // disable zooming in cardboard
    cbm.controls.noZoom = true;
    cbm.controls.noPan = true;

    window.addEventListener('deviceorientation', setOrientationControls, true);
  }

  // Create keyboard listener
  cbm.keyboard = new THREEx.KeyboardState();
}


function init () {
  initialSetup();
  cs.create(cbm);
  window.addEventListener('resize', onWindowResize, false);
}


// Animation loop
function animate () {
  requestAnimationFrame( animate );
  onWindowResize();
  cs.update(cbm);
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

});
