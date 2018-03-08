//Javascript
//Michelle Quach, Winter 2018

//This code is based off of Google VR app's starter code linked in the footer.

"use strict";

//open console window to print message
console.log("reading");


//load variables
var camera, scene, renderer, sphere, cube;
var left_bar, right_bar;
var effect, controls;
var element, container;
var width = window.innerWidth, height = window.innerHeight;

var clock = new THREE.Clock();


//for full screen button
var goFS = document.getElementById("goFS");
document.getElementById("goFS").style.display = 'block';
goFS.addEventListener("click", function() {
    fullscreen(window.document.documentElement);
}, false);

//sets up threejs scene
init();
animate();

function init() {

          left_bar = new ProgressBar.Circle('#guide_circle_left', {
              strokeWidth: 10,
              color: '#5FCCFF',
              trailWidth: 2
          });

          right_bar = new ProgressBar.Circle('#guide_circle_right', {
              strokeWidth: 10,
              color: '#5FCCFF',
              trailWidth: 2
          });

          //Stereo scene
          renderer = new THREE.WebGLRenderer();
          element = renderer.domElement;
          container = document.getElementById('scene');
          container.appendChild(element);

          effect = new THREE.StereoEffect(renderer);

          scene = new THREE.Scene();

          camera = new THREE.PerspectiveCamera(90, 1, 0.001, 700);
          camera.position.set(0, -5, 0);
          scene.add(camera);

          controls = new THREE.OrbitControls(camera, element);
          controls.target.set(
              camera.position.x + 0.1,
              camera.position.y,
              camera.position.z
          );

          function setOrientationControls(e) {
              if (!e.alpha) {
                  return;
              }

              controls = new THREE.DeviceOrientationControls(camera, true);
              controls.connect();
              controls.update();

              element.addEventListener('click', fullscreen, false);

              window.removeEventListener('deviceorientation', setOrientationControls, true);
          }
          window.addEventListener('deviceorientation', setOrientationControls, true);


          // Add lights
          var ambLight = new THREE.AmbientLight( 0x808080 ); // soft white light
          scene.add(ambLight);

          //Add other scene elements
          drawSimpleSkybox();

          window.addEventListener('resize', resize, false);
          setTimeout(resize, 1);
      }

      function drawSimpleSkybox() {
          // define path and box sides images
          var path = 'textures/';
          var sides = [ path + 'px.png', path + 'nx.png', path + 'py.png', path + 'ny.png', path + 'pz.png', path + 'nz.png' ];

          // load images

          var scCube = THREE.ImageUtils.loadTextureCube(sides);


          // prepare skybox material (shader)
          var skyShader = THREE.ShaderLib["cube"];
          skyShader.uniforms["tCube"].value = scCube;
          var skyMaterial = new THREE.ShaderMaterial( {
              fragmentShader: skyShader.fragmentShader, vertexShader: skyShader.vertexShader,
              uniforms: skyShader.uniforms, depthWrite: false, side: THREE.BackSide
          });

          // create Mesh with cube geometry and add to the scene
          var skyBox = new THREE.Mesh(new THREE.BoxGeometry(500, 500, 500), skyMaterial);
          skyMaterial.needsUpdate = true;

          skyBox.UserData = {name:"skyBox"};

          scene.add(skyBox);
      }


      function resize() {
          var width = container.offsetWidth;
          var height = container.offsetHeight;

          camera.aspect = width / height;
          camera.updateProjectionMatrix();

          renderer.setSize(width, height);
          effect.setSize(width, height);
      }

      function update(dt) {
          resize();

          camera.updateProjectionMatrix();

          controls.update(dt);

      }

      function render(dt) {

          effect.render(scene, camera);

      }

      function animate(t) {

          requestAnimationFrame(animate);

          update(clock.getDelta());
          render(clock.getDelta());
      }

      function fullscreen(container) {
          if (container.requestFullscreen) {
              container.requestFullscreen();
          } else if (container.msRequestFullscreen) {
              container.msRequestFullscreen();
          } else if (container.mozRequestFullScreen) {
              container.mozRequestFullScreen();
          } else if (container.webkitRequestFullscreen) {
              container.webkitRequestFullscreen();
          }
      }
