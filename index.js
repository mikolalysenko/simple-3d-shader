"use strict"

var createShader = require("gl-shader")

module.exports = function createSimple2DShader(gl) {
return createShader(gl,
"attribute vec3 position;\
attribute vec3 color;\
uniform mat4 model;\
uniform mat4 view;\
uniform mat4 projection;\
varying vec3 fragColor;\
void main() {\
  gl_Position = model * view * projection * vec4(position, 1.0);\
  fragColor = color;\
}",
"precision highp float;\
varying vec3 fragColor;\
void main() {\
  gl_FragColor = vec4(fragColor, 1.0);\
}")
}
