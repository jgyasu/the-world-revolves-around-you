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
    if (results.length > 0) {
        // Assuming there's only one hand detected (for simplicity)
        let landmarks = results[0].landmarks; // Get landmarks of the first detected hand
        
        // Log the x and y coordinates of a specific landmark (e.g., thumb tip)
        let thumbTipX = landmarks[4][0]; // x coordinate of thumb tip
        let thumbTipY = landmarks[4][1]; // y coordinate of thumb tip
        
        console.log(`Thumb tip coordinates - X: ${thumbTipX}, Y: ${thumbTipY}`);
        
        // You can access other landmarks similarly, e.g.,
        // Index finger tip: landmarks[8]
        // Middle finger tip: landmarks[12]
        // Ring finger tip: landmarks[16]
        // Little finger tip: landmarks[20]
        
        // Or loop through all landmarks to log all coordinates
        /*
        for (let i = 0; i < landmarks.length; i++) {
            console.log(`Landmark ${i} - X: ${landmarks[i][0]}, Y: ${landmarks[i][1]}`);
        }
        */
    }
});
