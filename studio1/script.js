//Michelle Quach, DES157, Winter 2018
//interactive script for Studio 1: Mad libs

//open console window to print message
console.log("reading");

'use strict';

//define global variables
var results = document.getElementById("results");
var phoneMsg = document.getElementById("phoneMsg");

//capture submit event
document.f.onsubmit = processForm;
document.f.onreset = resetForm;

//define submit process function
function processForm() {
    var name = document.f.name.value;
    var num = document.f.num.value;
    var device = document.f.device.value;
    var fear = document.f.fear.value;

    phoneMsg.innerHTML = "<h3>Welcome <em>" + name +
        "</em>, you've been rated.<br><br> Your social rating is a <em>" +
        num +
        "</em> out of 10 stars. <br><br>That's not a high enough score to leave the System. You will be forever stuck here on your <b>" +
        device +
        "</b> and be tormented by <b>" +
        fear +
        "</b>. <br><br> Maybe next time, you'll pay more attention to your social media ratings and get uploaded onto the Cloud.";

    return false;
}

function resetForm() {
    phoneMsg.innerHTML = "";
    results.getAttribute("class", "hide");
}
