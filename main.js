song = "";
song2 = "";
leftWristY = 0;
rightWristY = 0;
played = "false";
songIsplaying = "false";
song2Isplaying = "false";

function preload()
{
    song = loadSound('music.mp3');
    song2 = loadSound('npc.mp3')
}

function setup()
{
    canvas = createCanvas(500, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw()
{
    image(video, 0, 0, 500, 500);
}

function play()
{
    played = "true";
}

function modelLoaded()
{
    console.log('de')
}

function changesong()
{
    if (leftWristY<500 && songIsplaying == "false")
    {
        song2Isplaying = "false";
        song2.stop()
        song.play()
        songIsplaying = "true";
    }
    if (rightWristY<500 && song2Isplaying == "false")
    {
        songIsplaying = "false";
        song.stop()
        song2.play()
        song2Isplaying = "true";
    }
}

function gotPoses(results)
{
    if (results.length > 0)
    {
        console.log(results);
        leftWristY = results[0].pose.leftWrist.y;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Y of left wrist is " + leftWristY + " and Y of right wrist is " + rightWristY);
        // changesong()
        if (played == "true")
        {
            changesong()
        }
    }
}