var shell = require("gl-now")()
var createMesh = require("gl-mesh")
var glm = require("gl-matrix")
var simple3DShader = require("../index.js")

var shader, mesh

shell.on("gl-init", function() {
  shader = simple3DShader(shell.gl)
  mesh = createMesh(shell.gl, require("bunny"))
})

shell.on("gl-render", function(t) {
  //Bind shader
  shader.bind()
  
  //Set camera parameters
  var A = new Float32Array(16), B = new Float32Array(16)
  shader.uniforms.projection = glm.mat4.perspective(A, Math.PI/4.0, shell.width/shell.height, 0.1, 1000.0)
  shader.uniforms.view = glm.mat4.lookAt(A, [0, 3, 20], [0, 3, 0], [0,1,0])
  glm.mat4.identity(A)
  shader.uniforms.model = glm.mat4.rotateY(B, A, 0.001 * Date.now())
  
  shader.attributes.color = [1, 0.7, 0.3]
  
  //Draw object
  mesh.bind(shader)
  mesh.draw()
  mesh.unbind()
})