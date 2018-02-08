//Javascript
//Michelle Quach, Winter 2018

"use strict";

//open console window to print message
console.log("reading");

//declare variables
//declare objects
var nomNom = document.getElementById("nomNom");
var nomNomInfo = document.getElementById("nomNomInfo");
var highlighters = document.getElementById("highlighters");
var highlightersInfo = document.getElementById("highlightersInfo");
var grid = document.getElementById("grid");
var gridInfo = document.getElementById("gridInfo");
var pin = document.getElementById("pin");
var pinInfo = document.getElementById("pinInfo");
var poster = document.getElementById("poster");
var posterInfo = document.getElementById("posterInfo");
var donald = document.getElementById("donald");
var donaldInfo = document.getElementById("donaldInfo");
//declare closers
var close = document.getElementById("close");
var close1 = document.getElementById("close1");
var close2 = document.getElementById("close2");
var close3 = document.getElementById("close3");
var close4 = document.getElementById("close4");
var close5 = document.getElementById("close5");

//add event listeners for each description block
nomNom.addEventListener("click", function() {
    nomNomInfo.style.display = "block";
});
highlighters.addEventListener("click", function() {
    highlightersInfo.style.display = "block";
});
grid.addEventListener("click", function() {
    gridInfo.style.display = "block";
});
pin.addEventListener("click", function() {
    pinInfo.style.display = "block";
});
poster.addEventListener("click", function() {
    posterInfo.style.display = "block";
});
donald.addEventListener("click", function() {
    donaldInfo.style.display = "block";
});

//declare closers to close description blocks
close.addEventListener("click", function() {
    nomNomInfo.style.display = "none";
});
close1.addEventListener("click", function() {
    highlightersInfo.style.display = "none";
});
close2.addEventListener("click", function() {
    gridInfo.style.display = "none";
});
close3.addEventListener("click", function() {
    pinInfo.style.display = "none";
});
close4.addEventListener("click", function() {
    posterInfo.style.display = "none";
});
close5.addEventListener("click", function() {
    donaldInfo.style.display = "none";
});
