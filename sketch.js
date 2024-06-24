let handPose;
let video;
let hands = [];


function preload() {
    // Load the handPose model
    handPose = ml5.handPose();
  }

var canvas; // Declare canvas variable

// JavaScript for streaming video from webcam
// const video = document.querySelector('#myVidPlayer');
// var w, h;


// video.style.position = "absolute"; // Ensure proper positioning of the video element
// video.style.top = "0";
// video.style.right = "0";

// window.navigator.mediaDevices.getUserMedia({ video: true})
//     .then(stream => {
//         video.srcObject = stream;
//         video.onloadedmetadata = (e) => {
//             video.play();
//             w = video.videoWidth;
//             h = video.videoHeight;
//         };
//     });


function setup() {
    // Create a canvas with 70% of the window width and 100% of the window height
    canvas = createCanvas(windowWidth * 0.7, windowHeight);
    canvas.parent('canvasContainer'); // Attach the canvas to the left div

    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
    // start detecting hands from the webcam video
    handPose.detectStart(video, gotHands);
}

function draw() {
    // Your p5.js drawing code here
    background(0);
    push();
    scale(-1, 1);
    // image(video, 0, 0, -width, height);
    pop();
    // For example:
    for (let i = 0; i < hands.length; i++) {
        let hand = hands[i];
        controlX = hand.middle_finger_pip.x;
        controlY = hand.middle_finger_pip.y;
        console.log("x: " + controlX);
        console.log("y: " + controlY);
        fill('red');
        circle(width-controlX, controlY, 80)
        
      }
}

// Callback function for when handPose outputs data
function gotHands(results) {
    // save the output to the hands variable
    hands = results;
}

// Adjust the canvas size when the window is resized
function windowResized() {
    resizeCanvas(windowWidth * 0.7, windowHeight);
}

// ml5.js for hand tracking can be integrated here
// Example:

