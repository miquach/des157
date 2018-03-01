//Javascript
//Michelle Quach, Winter 2018

"use strict";

//open console window to print message
console.log("reading");

//declare variables
var overlay = document.getElementById("landing");
var close = document.getElementById("close")

//function for pre-screen
function intro() {
    landing.style.display = "block";
}

close.addEventListener("click", function() {
  landing.style.display = "none";
});
