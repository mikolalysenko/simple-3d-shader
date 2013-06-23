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
  var scratch = new Float32Array(16)
  shader.uniforms.projection = glm.mat4.perspective(scratch, 45, shell.width/shell.height, 0.1, 1000.0)
  shader.uniforms.view = glm.mat4.lookAt(scratch, [0, 0, -10], [0,0,0], [0,1,0])
  shader.uniforms.model = glm.mat4.identity(scratch)
  
  //Draw object
  mesh.bind(shader)
  mesh.draw()
  mesh.unbind()
})