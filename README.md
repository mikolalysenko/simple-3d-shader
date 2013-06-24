simple-3d-shader
================
A simple 3d shader for WebGL

## Example

[Try it in your browser](http://mikolalysenko.github.io/simple-3d-shader/)

```javascript
var shell = require("gl-now")()
var createMesh = require("gl-mesh")
var glm = require("gl-matrix")
var simple3DShader = require("simple-3d-shader")

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
  
  //Set color
  shader.attributes.color = [1, 0.7, 0.3]
  
  //Draw object
  mesh.bind(shader)
  mesh.draw()
  mesh.unbind()
})
```

Here is what it should look like assuming everything worked:

<img src="https://raw.github.com/mikolalysenko/simple-3d-shader/master/images/screenshot.png">


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
