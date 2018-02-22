//Javascript
//Michelle Quach, Winter 2018

"use strict";

//open console window to print message
console.log("reading");

//declare variables
var overlay = document.getElementById("intro");
var close = document.getElementById("close")

//function for pre-screen
function intro() {
    intro.style.display = "block";
}

close.addEventListener("click", function() {
    overlay.style.display = "none";
});

//three.js
//set variables for perspective stars
var camera, controls, scene, renderer;
var stars, sun;
var colors = [0xffffff, 0xCCF7FF, 0xFFF7DE];

//declare functions
init();
animate();
render();

function init() {
    scene = new THREE.Scene();

    //camera positioning controls
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.5, 1000);
    camera.lookAt(scene.position);
    camera.position.z = 500;

    //renderer for full window size
    renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // lights
    var ambientLight = new THREE.AmbientLight();
    scene.add(ambientLight);

    drawStars();
    drawSun();

    document.getElementById("galaxy").appendChild(renderer.domElement);
    window.addEventListener('resize', onResize);

    //set background image
}

//for resizing windows
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

//animation function for stars to move
function animate() {
    requestAnimationFrame(animate);
    render();
}

//renderer for rotation
function render() {
    stars.rotation.x += 0.001;
    stars.rotation.y -= 0.001;
    sun.rotation.y += 0.003;
    renderer.render(scene, camera);
}

//draws the stars
function drawStars() {
    stars = new THREE.Group();
    scene.add(stars);

    var geometry = new THREE.TetrahedronGeometry(2, 5);
    for (var i = 0; i < 1300; i++) {
        var material = new THREE.MeshPhongMaterial({
            color: colors[Math.floor(Math.random() * colors.length)]
        });
        //positions the stars
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = (Math.random() - 0.5) * 1500;
        mesh.position.y = (Math.random() - 0.5) * 1500;
        mesh.position.z = (Math.random() - 0.5) * 1500;
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
        stars.add(mesh);
    }
}

function drawSun() {
    sun = new THREE.Group();
}

//for camera/video
function videoCapture() {
  var camera = navigator.mediaDevices.getUserMedia({video: true });

  camera.then(function(mediaStream) {
    var video = document.getElementById("video");
    video.srcObject = mediaStream;
    video.onloaded = function() {
    video.play();
    };
  });}
videoCapture();
