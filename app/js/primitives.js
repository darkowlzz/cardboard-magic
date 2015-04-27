// Primitives module containing methods for creating primitive objects.

define (function () { // jshint ignore:line
'use strict';

return {

  // Create a cube
  makeBox: function (l, b, h) {
    var geometry = new THREE.BoxGeometry(l, b, h);
    for (var i = 0; i < geometry.faces.length; i +=2) {
      var hex = Math.random() * 0xffffff;
      geometry.faces[i].color.setHex(hex);
      geometry.faces[i+1].color.setHex(hex);
    }

    var material = new THREE.MeshBasicMaterial(
                     {vertexColors: THREE.FaceColors, overdraw: 0.5}
                   );
    var mesh = new THREE.Mesh(geometry, material);
    return mesh;
  },

  makeSphere: function (radius) {
    var sphereGeometry = new THREE.SphereGeometry(radius, 32, 16);
    var sphereMaterial = new THREE.MeshLambertMaterial( {color: 0x8888ff} );
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    return sphere;
  }
};

});
