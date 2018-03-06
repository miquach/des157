//Javascript
//Michelle Quach, Winter 2018

"use strict";

//open console window to print message
console.log("reading");

//load variables
//sets up threejs scene
var camera, scene, renderer, sphere, cube;
var leftLoadingBar, rightLoadingBar;
var effect, controls;
var element, container;
var scCube;
var obj = [];
var clock = new THREE.Clock();

init();
animate();

function init() {
  renderer = new THREE.WebGLRenderer();
  element = renderer.domElement;
  container = document.getElementById('example');
  container.appendChild(element);

  effect = new THREE.StereoEffect(renderer);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(90, 1, 0.001, 700);
  camera.position.set(0, 10, 0);
  scene.add(camera);

  controls = new THREE.OrbitControls(camera, element);
  controls.target.set(
    camera.position.x + 0.1,
    camera.position.y,
    camera.position.z
  );
  controls.noZoom = true;
  controls.noPan = true;

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


  var light = new THREE.HemisphereLight(0x777777, 0x000000, 0.6);
  scene.add(light);

  var texture = new THREE.TextureLoader().load(
    'textures/checker.png'
  );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat = new THREE.Vector2(50, 50);
  texture.anisotropy = renderer.getMaxAnisotropy();

  var material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xffffff,
    shininess: 20,
    shading: THREE.FlatShading,
    map: texture
  });

  var geometry = new THREE.PlaneGeometry(1000, 1000);

  var mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;
  scene.add(mesh);

  window.addEventListener('resize', resize, false);
  setTimeout(resize, 1);
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

function fullscreen() {
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

/*

//sets up tween animations
var min= {x: 100, y: 100, z: 100};
var touchTweenTo = new TWEEN.Tween(min);
var max= {x: 120, y:120, z:120};

touchTweenTo.to(max, 200);
touchTweenTo.easing(TWEEN.Easing.Bounce.InOut);
touchTweenTo.repeat(Infinity);
touchTweenTo.start();

var selectionTime = 1800;

//confirmation screen
//document.getElementById("selectionConfirm").style.display="none";

//threejs scene

//initialize functions
init();
animate();

function init() {

  leftLoadingBar= new ProgressBar.Circle ("#guideCircleLeft", {
    strokeWidth: 13,
    easing: "easeInOut",
    duration: selectionTime,
    color: "0xFEEC38",
    trailWidth: 2,
    svgStyle: null
  });

  rightLoadingBar= new ProgressBar.Circle ("#guideCircleRight", {
    strokeWidth: 13,
    easing: "easeInOut",
    duration: selectionTime,
    color: "0xFEEC38",
    trailWidth: 2,
    svgStyle: null
  });

  renderer = new THREE.WebGLRenderer();
  element = renderer.domElement;
  container = document.getElementById('example');
  container.appendChild(element);

  effect = new THREE.StereoEffect(renderer);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(90, 1, 0.001, 700);
  camera.position.set(0, 10, 0);
  scene.add(camera);

  controls = new THREE.OrbitControls(camera, element);
  //controls.rotateUp(Math.PI / 4);
  controls.target.set(
    camera.position.x + 0.1,
    camera.position.y,
    camera.position.z
  );
  controls.noZoom = true;
  controls.noPan = true;

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


  var light = new THREE.HemisphereLight(0x666666, 0xffffff, 0.6);
  scene.add(light);

  var texture = new THREE.TextureLoader().load ("textures/checker.png");
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat = new THREE.Vector2(50, 50);
  texture.anisotropy = renderer.getMaxAnisotropy();

  var material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xffffff,
    shininess: 80,
    shading: THREE.FlatShading,
    map: texture
  });

  var geometry = new THREE.PlaneGeometry(1000, 1000);

  var mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;
  scene.add(mesh);

  window.addEventListener('resize', resize, false);
  setTimeout(resize, 1);

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

function drawShapes() {

        var manager = new THREE.LoadingManager();
        manager.onProgress = function ( item, loaded, total ) {

            console.log( item, loaded, total );

        };

        var objLoader = new THREE.OBJLoader( manager );
        objLoader.load( "models/star_charm.obj", meshloader("models/star_charm.obj"));

        function meshloader(fileName){
            return function(geometry){

                //Place in scene
                var color;
                if (fileName.indexOf("star") !== -1){
                    color = 0xFF6500;
                    geometry.scale.set(100, 100, 100);
                    geometry.position.z = -25;
                    geometry.position.y = 10;
                    selectableObjs.push(geometry);
                    geometry.userData = {name:"star", touched:false};
                    scene.add(geometry);
                }
                //Apply material
                geometry.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        var material = new THREE.MeshPhongMaterial(
                            { color: color,
                                side: THREE.DoubleSide,
                                emissive: 0x000000,
                                envMap: scCube
                            }
                        );
                        child.material = material;
                    }
                });

            }
        }

    }

    //What happens after an object is selected
    function postSelectAction(selectedObjectName){
        console.log(
            "The " +
            selectedObjectName +
             " was selected by user. Use this function to create appropriate scene transition."
         );

    }

    function getIntersections(objects){
        var raycaster = new THREE.Raycaster();

        var vector = new THREE.Vector3( 0, 0, - 1 );
        vector.applyQuaternion( camera.quaternion );

        raycaster.set( camera.position, vector );

        return raycaster.intersectObjects( objects, true );

    }

    function updateHUDTxt(msg){
        x=document.getElementsByClassName("info");  // Find the elements
        for(var i = 0; i < x.length; i++){
            x[i].innerText=msg;    // Change the content
        }
    }

    function getTouchMsg(charm){
        var msg = "That's a " + charm + ", which has the power to ";

        switch (charm) {
            case "star":
                msg = msg + "make things fly (but you already have that).";
                msg = msg.replace(charm, "orange " + charm);
                break;

            }

        return msg + " Keep looking at it to select it."
    }
    */
