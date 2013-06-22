simple-3d-shader
================
A simple 3d shader for WebGL

**WORK IN PROGRESS**

## Example

```javascript
var shell = require("gl-now")()
var createMesh = require("gl-mesh")
var glm = require("gl-matrix")
var simple3DShader = require("simple-3d-shader")

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
```

## Install

Use [npm](https://npmjs.org/) to install it locally:

    npm install simple-3d-shader
    
Then you can build/run the client using any tool that compiles CommonJS modules, for example [browserify](https://github.com/substack/node-browserify) or [beefy](https://github.com/chrisdickinson/beefy).

## API

```javascript
var simple3DShader = require("simple-3d-shader")
```

### `var shader = simple3DShader(gl)`
Creates a simple 3d shader

* `gl` is a handle to the WebGL context that the shader will be created in.

**Returns** A `gl-shader` object for the shader.

## Credits
(c) 2013 Mikola Lysenko. MIT License
