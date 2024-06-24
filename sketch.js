var canvas; // Declare canvas variable

function setup() {
    // Create a canvas with 70% of the window width and 100% of the window height
    canvas = createCanvas(windowWidth * 0.7, windowHeight);
    canvas.parent('canvasContainer'); // Attach the canvas to the left div
    background(0);
}

function draw() {
    // Your p5.js drawing code here
    // For example:
    ellipse(mouseX, mouseY, 50, 50); // Example: draws a circle at the mouse position
}

// Adjust the canvas size when the window is resized
function windowResized() {
    resizeCanvas(windowWidth * 0.7, windowHeight);
}

// JavaScript for streaming video from webcam
const video = document.querySelector('#myVidPlayer');
var w, h;

video.style.position = "absolute"; // Ensure proper positioning of the video element
video.style.top = "0";
video.style.right = "0";

window.navigator.mediaDevices.getUserMedia({ video: true})
    .then(stream => {
        video.srcObject = stream;
        video.onloadedmetadata = (e) => {
            video.play();
            w = video.videoWidth;
            h = video.videoHeight;
        };
    });

// ml5.js for hand tracking can be integrated here
// Example:
// const handpose = ml5.handpose(video, modelLoaded);
// function modelLoaded() {
//     console.log('Model loaded!');
// }
