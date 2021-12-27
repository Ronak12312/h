function setup() {
  canvas = createCanvas(250, 250);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier("MobileNet",modelloaded);
}
function modelloaded(){
  console.log("ready to launch");
}
function draw(){
  image(video,0,0,250,250);
  classifier.classify(video,gotresults);
}
pr=""
function gotresults(error,results){
if(error){
  console.error(error);
}
else{
  if((results[0].confidence > 0.5)&&(results[0].label != pr)){
    console.log(results);
    pr=results[0].label;
    s=window.speechSynthesis;
    sd="Object detected is"+results[0].label;
    u=new SpeechSynthesisUtterance(sd);
    s.speak(u);
    document.getElementById("1").innerHTML=results[0].label;
    document.getElementById("2").innerHTML=results[0].confidence.toFixed(3);
  }
}
}