var shell = require("gl-now")()
var createMesh = require("gl-mesh")
var glm = require("gl-matrix")
var simple3DShader = require("../index.js")

var shader, mesh

shell.on("gl-init", function() {
  shader = simple3DShader(shell.gl)
  mesh = createMesh(gl, require("bunny"))
})

shell.on("gl-render", function(t) {
  //Bind shader
  shader.bind()
  
  //Set camera parameters
  shader.uniforms.projection = glm.mat4.projection()
  shader.uniforms.view = glm.mat4.lookAt()
  shader.unifomrs.model = glm.mat4.identity()
  
  //Draw object
  mesh.bind(shader)
  mesh.draw()
  mesh.unbind()
})