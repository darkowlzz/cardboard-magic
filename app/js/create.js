define (['primitives'], function (Primitives) { // jshint ignore:line
'use strict';

function CreateStuff () {}; // jshint ignore:line

CreateStuff.prototype = {

  // Create objects in this block
  create: function (cbm) {

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
    this.cube1 = Primitives.makeBox(200, 200, 200);
    this.cube1.position.y = 150;
    cbm.scene.add(this.cube1);

    this.sphere1 = Primitives.makeSphere(50);
    this.sphere1.position.x = 350;
    this.sphere1.position.y = 150;
    cbm.scene.add(this.sphere1);
  },


  // Update (animate) the created objects in this block
  update: function () {

    // Sample code
    // ===========

    // rotate the cube
    this.cube1.rotation.y += 1;
  }

};

  return CreateStuff;
});
