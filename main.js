song = "";
status = "";
objects = [];
function preload(){
song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("The model is loaded!");
    status = true;
    
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function draw(){
    image(video,0,0,380,380);

    if(status != ""){
        objectDetector.detect(video , gotResult);
        for(i = 0; i < objects.length; i++){

            document.getElementById("status").innerHTML = "Status: Object Detected";

            fill("#fc0a0a");
            accuracy = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + accuracy + "%" , objects[i].x + 20, objects[i].y + 20);
            noFill();
            stroke("#fc0a0a")
            rect(objects[i].x , objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == "person"){
                document.getElementById("baby").innerHTML = "Baby found!";
                song.stop();
            }
            else{
            document.getElementById("baby").innerHTML = "BABY NOT FOUND!";
            song.play();
            }  
        }
        if(objects.length == 0){
            document.getElementById("baby").innerHTML = "BABY NOT FOUND!";
            song.play();
        }
    }
}