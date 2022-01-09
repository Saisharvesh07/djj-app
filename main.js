song = "";

function preload() {
    song = loadSound("music.mp3");
}

rightWristX = 0;
rightWristY = 0;


leftWristX = 0;
leftWristY = 0;


scoreRightWrist = 0;
scoreLeftWrist = 0;


function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCanvas(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized')
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWrist = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY  = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWrist = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY  = " + rightWristY);

    }
}


function draw() {
    image(video, 0, 0, 600, 500);
    fill("#f7003a");
    stroke("#f7003a");
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = "speed = 0.5x";
            song.rate(0.5);
        } else if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("speed").innerHTML = "speed = 1.5x";
            song.rate(1.5);
        } else if (rightWristY > 300 && rightWristY <= 400) {
            document.getElementById("speed").innerHTML = "speed = 2x";
            song.rate(2);
        } else if (rightWristY > 400 && rightWristY <= 500) {
            document.getElementById("speed").innerHTML = "speed = 2.5";
            song.rate(2);
        }
    }
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals / 500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}


function play() {
    song.play(1);
    song.setvolume(1);
    song.rate(1);
}