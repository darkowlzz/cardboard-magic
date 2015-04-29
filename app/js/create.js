define (['primitives'], function (Primitives) { // jshint ignore:line
'use strict';

function CreateStuff () {}; // jshint ignore:line

CreateStuff.prototype = {

  // Create objects in this block
  create: function (cbm) {

    var that = this;

    // Sample code, delete them and create your own stuff
    // ====================================================

    // Light
    var light = new THREE.HemisphereLight(0x777777, 0x000000, 0.6);
    cbm.scene.add(light);

    // Texture for the plane
    var texture = new THREE.ImageUtils.loadTexture('images/checker.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat = new THREE.Vector2(50, 50);
    texture.anisotropy = cbm.renderer.getMaxAnisotropy();

    // Material for the plane
    var material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0xffffff,
      shininess: 20,
      shading: THREE.FlatShading,
      map: texture
    });

    // Geometry for the plane
    var geometry = new THREE.PlaneBufferGeometry(2000, 2000);

    // Plane mesh object
    var mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    cbm.scene.add(mesh);

    // create a cube and place it in the scene
    that.cube1 = Primitives.makeBox(200, 200, 200);
    that.cube1.position.y = 150;
    cbm.scene.add(that.cube1);

    // create a sphere and place it in the scene
    that.sphere1 = Primitives.makeSphere(50);
    that.sphere1.position.x = 350;
    that.sphere1.position.y = 150;
    cbm.scene.add(that.sphere1);

    cbm.socket.on('move event', function (dir) {
      switch (dir) {
        case 'left':
          cbm.moveLeft = true;
          break;
        case 'right':
          cbm.moveRight = true;
          break;
        case 'up':
          cbm.moveForward = true;
          break;
        case 'down':
          cbm.moveBackward = true;
          break;
        case 'jump':
          if (cbm.canJump === true) {
            cbm.velocity.y += 350;
          }
          cbm.canJump = false;
          break;
      }
    });

    cbm.socket.on('end move event', function (dir) {
      switch (dir) {
        case 'left':
          cbm.moveLeft = false;
          break;
        case 'right':
          cbm.moveRight = false;
          break;
        case 'up':
          cbm.moveForward = false;
          break;
        case 'down':
          cbm.moveBackward = false;
          break;
      }
    });


    cbm.onKeyDown = function (event) {
      console.log(event.keyCode);
      switch (event.keyCode) {
        case 38: // up
        case 87: // w
          cbm.socket.emit('move event', 'up');
          break;

        case 37: // left
        case 65: // a
          cbm.socket.emit('move event', 'left');
          break;

        case 40: // down
        case 83: // s
          cbm.socket.emit('move event', 'down');
          break;

        case 39: // right
        case 68: // d
          cbm.socket.emit('move event', 'right');
          break;

        case 32: // space
          cbm.socket.emit('move event', 'jump');
          break;
      }
    };

    cbm.onKeyUp = function (event) {
      switch (event.keyCode) {
        case 38: // up
        case 87: // w
          cbm.socket.emit('end move event', 'up');
          break;

        case 37: // left
        case 65: // a
          cbm.socket.emit('end move event', 'left');
          break;

        case 40: // down
        case 83: // s
          cbm.socket.emit('end move event', 'down');
          break;

        case 39: // right
        case 68: // d
          cbm.socket.emit('end move event', 'right');
          break;
      }
    };

    cbm.keyboard.domElement.addEventListener('keydown', cbm.onKeyDown, false);
    cbm.keyboard.domElement.addEventListener('keyup', cbm.onKeyUp, false);
  },


  // Update (animate) the created objects in this block
  update: function (cbm) {

    // Sample code
    // ===========

    // rotate the cube
    this.cube1.rotation.y += 1;

    var time = window.performance.now();
    var delta = (time - cbm.prevTime) / 1000;

    //cbm.velocity.x -= cbm.velocity.x * 10.0 * delta;
    //cbm.velocity.z -= cbm.velocity.z * 10.0 * delta;
    cbm.velocity.y -= 9.8 * 100.0 * delta; // gravitational g = 9.8, mass= 100

    if (cbm.moveForward) {
      cbm.velocity.z = -5;
    }
    if (cbm.moveBackward) {
      cbm.velocity.z = 5;
    }

    if (cbm.moveLeft) {
      cbm.velocity.x = -5;
    }
    if (cbm.moveRight) {
      cbm.velocity.x = 5;
    }

    cbm.camera.translateX(cbm.velocity.x);
    cbm.camera.translateY(cbm.velocity.y * delta);
    cbm.camera.translateZ(cbm.velocity.z);

    if (cbm.camera.position.y < 90) {
      cbm.velocity.y = 0;
      cbm.camera.position.y = 90;
      cbm.canJump = true;
    }

    cbm.prevTime = time;
  }

};

  return CreateStuff;
});
