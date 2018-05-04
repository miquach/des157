/*Michelle Quach, Winter 2018

Adapted code from Google Cardboard's starter Code
& Jason Peterson's VR starter code:
https://github.com/brandnewpeterson/WebGL-VR-Starter-Code-Simple-HUD-Selections-*/

/*Note: I do not have a lot of addEventListeners because my website doesn't really use the mouse, but Glenda said it was okay to substitute other interactions through the VR APIs*/

//declare variables
var camera, scene, renderer, sphere, cube;
var left_bar, right_bar;
var effect, controls;
var element, container;
var selectableObjs = [];
var width = window.innerWidth, height = window.innerHeight;
var stars;
var colors = [0xffffff, 0xfea800, 0xfe7e00];

var clock = new THREE.Clock();

var min = { x: 8, y: 8, z: 8 }
var touchTweenTo = new TWEEN.Tween(min);
var max = { x: 35, y: 35, z: 35};

//alert message to encourage uers to switch to mobile
function myAlert() {
    alert("This website is designed for mobile view.\n Please use a mobile device and VR viewer for best results.\n\n Make sure your phone is mounted on your viewer according to the instructions.\n\n\n\n Visit bit.ly/vr-infinity on your cellphone!\n\n\n\n Enjoy! ✧⁺⸜(●′▾‵●)⸝⁺✧");
}

myAlert();

//set up for Tween animation for selectable objects
touchTweenTo.to(min, 800);
touchTweenTo.easing(TWEEN.Easing.Bounce.InOut);
touchTweenTo.repeat(1);
touchTweenTo.start();

var TIME = 1500;

//fullscreen controls (did not work; if I delete this, the whole page disappears)
var goFS = document.getElementById("goFS");
document.getElementById("goFS").style.display = 'hide';
goFS.addEventListener("click", function() {
    fullscreen(window.document.documentElement);
}, false);

//functions for THREEJS scene
init();
animate();

function init() {

    left_bar = new ProgressBar.Circle("#circleleft", {
        strokeWidth: 13,
        duration: TIME,
        color: "#5FCCFF",
        trailWidth: 2
    });

    right_bar = new ProgressBar.Circle("#circleright", {
        strokeWidth: 13,
        duration: TIME,
        color: "#5FCCFF",
        trailWidth: 2
    });

    //Google Cardboard code for dual views
    renderer = new THREE.WebGLRenderer();
    element = renderer.domElement;
    container = document.getElementById("scene");
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


    //lights
    var ambLight = new THREE.AmbientLight( 0x808080 ); // soft white light
    scene.add(ambLight);

    //function for skybox background
    drawSimpleSkybox();
    //function for selectable objects
    drawShapes();

    window.addEventListener('resize', resize, false);
    setTimeout(resize, 1);
}

function drawSimpleSkybox() {
    //load images
    var loader = new THREE.CubeTextureLoader();
    loader.setPath("textures/");

    //set images in skybox
    var scCube = loader.load([
        "px.png", "nx.png",
        "py.png", "ny.png",
        "pz.png", "nz.png"
    ]);

    // prepare skybox material (shader)
    var skyShader = THREE.ShaderLib["cube"];
    skyShader.uniforms["tCube"].value = scCube;
    var skyMaterial = new THREE.ShaderMaterial( {
        fragmentShader: skyShader.fragmentShader, vertexShader: skyShader.vertexShader,
        uniforms: skyShader.uniforms, depthWrite: false, side: THREE.BackSide
    });

    var skyBox = new THREE.Mesh(new THREE.BoxGeometry(500, 500, 500), skyMaterial);
    skyMaterial.needsUpdate = true;

    skyBox.UserData = {name:"skyBox"};

    scene.add(skyBox);
}

function drawShapes() {

    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {

        console.log( item, loaded, total );

    };

    var objLoader = new THREE.OBJLoader( manager );
    objLoader.load( "models/heart_charm.obj", meshloader("models/heart_charm.obj"));
    objLoader.load( "models/moon_charm.obj", meshloader("models/moon_charm.obj"));
    objLoader.load( "models/star_charm.obj", meshloader("models/star_charm.obj"));

    function meshloader(fileName){
        return function(geometry){

            //Place in scene
            var color;
            if (fileName.indexOf("heart") !== -1){
                geometry.scale.set(20, 20, 20);
                geometry.position.x = 100;
                geometry.position.y = 10;
                selectableObjs.push(geometry);
                geometry.userData = {name:"heart", touched:false};
                scene.add(geometry);
            }
            if (fileName.indexOf("moon") !== -1){
                geometry.scale.set(20, 20, 20);
                geometry.position.x = -100;
                geometry.position.y = -10;
                selectableObjs.push(geometry);
                geometry.userData = {name:"moon", touched:false};
                scene.add(geometry);
            }
            if (fileName.indexOf("star") !== -1){
                color = 0xFF6500;
                geometry.scale.set(5, 5, 5);
                geometry.position.z = -40;
                geometry.position.y = 10;
                selectableObjs.push(geometry);
                geometry.userData = {name:"star", touched:false};
                scene.add(geometry);
            }

        }
    }

}

  function getIntersections(objects){
      var raycaster = new THREE.Raycaster();

      var vector = new THREE.Vector3( 0, 0, - 1 );
      vector.applyQuaternion( camera.quaternion );

      raycaster.set( camera.position, vector );

      return raycaster.intersectObjects( objects, true );

  }



function updateHUDTxt(msg){
    x=document.getElementsByClassName("info_text");  // Find the elements
    for(var i = 0; i < x.length; i++){
        x[i].innerText=msg;    // Change the content
    }
}

function getTouchMsg(charm){
    var msg = "Welcome to the Infinity Room Virtual Reality Experience.";

    switch (charm) {
      case "heart":
          msg = msg + " This project is based on Yayoi Kusama's work. Yayoi Kusama is a Japanese contemporary artist who works with conceptual art dealing with identity, feminism, psychology, sexuality, life, and death. As one of the most prolific contemporary artists, Kusama works in minimalism, surrealism, pop art, and abstract expressionism.";
          break;
      case "moon":
          msg = msg + " This room is based on Kusama's 'Aftermath of the Obliteration of Eternity (2009).' Kusama's original work examines the the death and rebirth of identity in the infinite. The flickering lights represent the eternal cycle of death and rebirth.";
          break;
        case "star":
        msg = msg + " This project aims to digitize Kusama's work to bring accessibility to an open-access environment: the web. By utilizing VR and the web, this project allows more people to experience Kusama's immersive artworks and installations.";
        break;

        }
    return msg + " Look around to learn more about this project. "
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

    updateHUDTxt("");

    intersects = getIntersections(selectableObjs);

    if (intersects.length == 0){//nothing being "touched"
        left_bar.set(0.0);//reset any active progress bars to 0
        right_bar.set(0.0);

        scene.traverse (function (object)
        {
            if (object instanceof THREE.Group){
                if (intersects.length == 0){
                    object.userData.touched = false;
                }
            }
        });
    } else {
        intersects[0].object.parent.userData.touched = true;
        msg = getTouchMsg(intersects[0].object.parent.userData.name); //update HUD text to register the touch
        updateHUDTxt(msg);
    }

    effect.render(scene, camera);

}

function animate(t) {

    TWEEN.update();

    touchTweenTo.onUpdate(function() {
        animScale = this;
    });

    scene.traverse (function (object)
    {
        if (object instanceof THREE.Group)
        {
            object.rotation.y = object.rotation.y + 0.005;

            if (object.userData.touched){
                object.scale.x = animScale.x;
                object.scale.y = animScale.y;
                object.scale.z = animScale.z;


                if(left_bar.value() == 0){//don't restart progress bar if already progress
                    left_bar.animate(1.0, {
                    }, function() {
                        postSelectAction(object.userData.name);//add callback to left side progress bar to register completed selection
                    });
                }
                if(right_bar.value() == 0){//don't restart if in progress
                    right_bar.animate(1.0);
                }

            }
        }
    });

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
