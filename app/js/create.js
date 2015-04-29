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

    that.sphere1 = Primitives.makeSphere(50);
    that.sphere1.position.x = 350;
    that.sphere1.position.y = 150;
    cbm.scene.add(that.sphere1);

    cbm.socket.on('move event', function (dir) {
      switch (dir) {
        case 'left':
          cbm.camera.translateX(-5);
          break;
        case 'right':
          cbm.camera.translateX(+5);
          break;
        case 'up':
          cbm.camera.translateZ(-5);
          break;
        case 'down':
          cbm.camera.translateZ(+5);
          break;
      }
    });

  },


  // Update (animate) the created objects in this block
  update: function (cbm) {

    // Sample code
    // ===========

    // rotate the cube
    this.cube1.rotation.y += 1;

    // keyboard event listeners
    if (cbm.keyboard.pressed('left')) {
      cbm.socket.emit('move event', 'left');
    }

    if (cbm.keyboard.pressed('right')) {
      cbm.socket.emit('move event', 'right');
    }

    if (cbm.keyboard.pressed('up')) {
      cbm.socket.emit('move event', 'up');
    }

    if (cbm.keyboard.pressed('down')) {
      cbm.socket.emit('move event', 'down');
    }
  }

};

  return CreateStuff;
});
