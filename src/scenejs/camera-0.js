register('camera-0','scenejs', 'SceneJS Camera',
  function(canvasId, contextId) {
    var z = 0.0;
    SceneJS.createScene({
      type: 'scene',
      id: 'Scene',
      canvasId: canvasId,
      flags: { backfaces: false },
      nodes: [{
        type: 'library',
        nodes: [{
          type: 'geometry',
          coreId: 'Cube-mesh',
          primitive: 'triangles',
          positions: [
             0.1, 0.1,-0.1 + z,   0.1,-0.1,-0.1 + z,  -0.1,-0.1,-0.1 + z,
            -0.1, 0.1,-0.1 + z,   0.1, 0.1, 0.1 + z,   0.1,-0.1, 0.1 + z,
            -0.1,-0.1, 0.1 + z,  -0.1, 0.1, 0.1 + z,   0.1, 0.1,-0.1 + z,
             0.1, 0.1, 0.1 + z,   0.1,-0.1, 0.1 + z,   0.1,-0.1,-0.1 + z,
             0.1,-0.1,-0.1 + z,   0.1,-0.1, 0.1 + z,  -0.1,-0.1, 0.1 + z,
            -0.1,-0.1,-0.1 + z,  -0.1,-0.1,-0.1 + z,  -0.1,-0.1, 0.1 + z,
            -0.1, 0.1, 0.1 + z,  -0.1, 0.1,-0.1 + z,   0.1, 0.1, 0.1 + z,
             0.1, 0.1,-0.1 + z,  -0.1, 0.1,-0.1 + z,  -0.1, 0.1, 0.1 + z
          ],
          indices: [
             0, 1, 2,   0, 2, 3,
             4, 7, 6,   4, 6, 5,
             8, 9,10,   8,10,11,
            12,13,14,  12,14,15,
            16,17,18,  16,18,19,
            20,21,22,  20,22,23 
          ]
        }]
      },
      {
        type: 'lookAt',
        eye: { x: 10.0, y: 10.0, z: 10.0 },
        look: { x: 0.0, y: 0.0, z: 0.0 },
        up: { x: 0.0, y: 1.0, z: 0.0 },
        nodes: [{
          type: 'camera',
          optics: {
            type: 'perspective',
            far: 100.0,
            near: 0.1,
            aspect: 1.0,
            fovy: 27.6380627952
          },
          nodes: [{
            type: 'renderer',
            clear: { color: true, depth: true, stencil: false },
            clearColor: { r: 0.0, g: 0.0, b: 0.0 },
            nodes: [{
              type: 'geometry',
              coreId: 'Cube-mesh'
            }]
          }]
        }]
      }]
    });
    SceneJS.scene('Scene').start();
  }
);
