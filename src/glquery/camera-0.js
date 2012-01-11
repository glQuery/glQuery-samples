register('camera-0','glquery', 'glQuery Camera',
  function(canvasId, contextId) {
    // Initialize WebGL context
    var canvas = document.getElementById(canvasId);
    var context = canvas.getContext(contextId);
    context.viewport(0, 0, canvas.width, canvas.height);
    context.enable(context.DEPTH_TEST);
    context.clearColor(0.0, 0.0, 0.0, 1.0);
    context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);

    // Initialize shaders
    var vertexShader = context.createShader(context.VERTEX_SHADER);
    var fragmentShader = context.createShader(context.FRAGMENT_SHADER);
    context.shaderSource(vertexShader,
      "attribute vec3 position;\n" +
      "uniform mat4 view;\n" +
      "uniform mat4 projection;\n" +
      "void main(void) {\n" +
      "  gl_Position = projection * view * vec4(position, 1.0);\n" +
      "}");
    context.shaderSource(fragmentShader, 
      "#ifdef GL_ES\n" +
      "precision highp float;\n" +
      "#endif\n" +
      "void main(void) {\n" +
      "  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n" +
      "}\n");
    context.compileShader(vertexShader);
    context.compileShader(fragmentShader);
    var shaderProgram = context.createProgram();
    context.attachShader(shaderProgram, vertexShader);
    context.attachShader(shaderProgram, fragmentShader);
    context.linkProgram(shaderProgram);

    // Initialize buffers
    var z = 0.0;
    var positions = [
       0.1, 0.1,-0.1 + z,   0.1,-0.1,-0.1 + z,  -0.1,-0.1,-0.1 + z,
      -0.1, 0.1,-0.1 + z,   0.1, 0.1, 0.1 + z,   0.1,-0.1, 0.1 + z,
      -0.1,-0.1, 0.1 + z,  -0.1, 0.1, 0.1 + z,   0.1, 0.1,-0.1 + z,
       0.1, 0.1, 0.1 + z,   0.1,-0.1, 0.1 + z,   0.1,-0.1,-0.1 + z,
       0.1,-0.1,-0.1 + z,   0.1,-0.1, 0.1 + z,  -0.1,-0.1, 0.1 + z,
      -0.1,-0.1,-0.1 + z,  -0.1,-0.1,-0.1 + z,  -0.1,-0.1, 0.1 + z,
      -0.1, 0.1, 0.1 + z,  -0.1, 0.1,-0.1 + z,   0.1, 0.1, 0.1 + z,
       0.1, 0.1,-0.1 + z,  -0.1, 0.1,-0.1 + z,  -0.1, 0.1, 0.1 + z
    ],
    indices = [
       0, 1, 2,   0, 2, 3,
       4, 7, 6,   4, 6, 5,
       8, 9,10,   8,10,11,
      12,13,14,  12,14,15,
      16,17,18,  16,18,19,
      20,21,22,  20,22,23 
    ];

    var vbo = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, vbo);
    context.bufferData(context.ARRAY_BUFFER, new Float32Array(positions), context.STATIC_DRAW);

    var ibo = context.createBuffer();
    context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, ibo);
    context.bufferData(context.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), context.STATIC_DRAW);

    //* TEST: Draw the scene with glQuery
    var gl = glQuery;
    gl.scene({'main': ''})
    .shaderProgram(shaderProgram)
    .vertexAttrib('position', vbo, 9*8, gl.FLOAT, 3, false, 0, 0)
    .vertexElem(ibo, 6*6, gl.UNSIGNED_SHORT, 0)
    .uniform('view', gl.setMatrix4LookAt([10.0,10.0,10.0], [0.0,0.0,0.0], [0.0,1.0,0.0]))
    //.uniform('view', gl.setMatrix4Identity())
    .uniform('projection', gl.setMatrix4Ortho(-1.0, 1.0, -1.0, 1.0, 0.1, 100.0))
    //.uniform('projection', gl.setMatrix4Identity())
    .triangles()
    .render(context);

    console.log(gl.setMatrix4LookAt([10.0,10.0,10.0], [0.0,0.0,0.0], [0.0,1.0,0.0]));
    console.log(gl.setMatrix4Ortho(-1.0, 1.0, -1.0, 1.0, 0.1, 100.0));
  }
);
