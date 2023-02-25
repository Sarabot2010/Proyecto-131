function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd' ,modelLoaded);
    document.getElementById("status").innerHTML = "Estatus: detectando objectos";
}
img = "";
status = "";
objects = [];
function preload(){
    img = loadImage('dog_cat.jpg');
}
function draw() {
   /* image(img, 0, 0, 640, 420);
    fill("#FF4174");
    text("Perro", 80, 80);
    fill("#2128FF")
    text("Gato", 300, 100)
    noFill();
    stroke("#FC7FA0");
    rect(30, 60, 400, 345);
    stroke("#21A7FF")
    rect(200, 70, 380, 330);*/
    if(status!="") {
        for(i=0;i<objects.lenght;i++){
            document.getElementById("status").innerHTML = "Estatus: objeto detectado";
            fill("#FF4000");
            porcentaje = floor(objects[i].confidence * 100);
            text(objects[i].label + " "+porcentaje + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#FF4000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }

}
function modelLoaded() {
    console.log("Modelo cargado");
    status = true;
    objectDetector.detect(img,gotResult);
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }else {
        console.log(results);
        objects= results;
    }
}