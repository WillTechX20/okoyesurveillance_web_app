var numberofObjectsDetectedDiv=document.querySelector('.number_of_objects_detected');
var statusDiv=document.querySelector('.status');
var video=null;
var statusBoolean=false;
var canvas=null;
var objectDetector=null;
var detectedObjects=[];
function preload(){
    video=createVideo('videos/video.mp4');
    video.hide();
}

function setup(){
    canvas=createCanvas(480, 380);
    canvas.center();
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    detectedObjects=results;
}

function draw(){
    image(video, 0, 0, 480, 380);
    
    if(statusBoolean){
        objectDetector.detect(video, gotResult);

        for(i=0; i<detectedObjects.length; i++){
         statusDiv.innerText='Status: Object(s) Detected';
        Div.innerText='Number of Objects Detected: '+detectedObjects.length;
            fill('red');
            var percent=toString(floor(detectedObjects[i].confidence*100))+'%';
            Text(detectedObjects[i].label+''+percent, detectedObjects[i].x+15, detectedObjects[i].y+15)
            noFill();
            stroke('red');
            rect(detectedObjects[i].x, detectedObjects[i].y, detectedObjects[i].width, detectedObjects[i].height);
        }
    }
}

function modelLoaded(){
    console.log('Model Loaded!');
    statusBoolean=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function startVideoSurveillance(){
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
 statusDiv.innerText='Status: Detecting Object(s)';
}
