//captures and streams the video from the webcam

var canvas = document.querySelector("canvas");
    var context = canvas.getContext("2d");
    const video = document.querySelector('#myVidPlayer');

    var w, h;
    canvas.style.display = "none";

    window.navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
            video.srcObject = stream;
            video.onloadedmetadata = (e) => {
                video.play();
                
                w = video.videoWidth;
                h = video.videoHeight
                
                canvas.width = w;
                canvas.height = h;
            };
    	})

//ml5.js used for tracking the hand

let predictions = [];

const options = {
    flipHorizontal: true,
    maxContinuousChecks: Infinity,
    detectionConfidence: 0.8, 
    scoreThreshold: 0.75,
    iouThreshold: 0.3,
    }

const handpose = ml5.handpose(video, options, modelLoaded);

// When the model is loaded
function modelLoaded() {
    console.log('Model Loaded!');
}

// Listen to new 'hand' events
handpose.on('hand', results => {
    predictions = results;
    console.log(predictions);
});