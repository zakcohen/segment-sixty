/// <reference path="../lib/p5.global-mode.d.ts" />

var WIDTH = 600;
var HEIGHT = 600;
var CENTER_X = WIDTH / 2;
var CENTER_Y = HEIGHT / 2; 

var SURFACE_WIDTH = 200;
var SURFACE_HEIGHT = 200;

let theSurface;
let TEXT_WIDTH;

let TEXT_HEIGHT = 30;
var textPosY = TEXT_HEIGHT;
let TEXT = "BENDY";

function setup() {
  let myCanvas = createCanvas(WIDTH, HEIGHT, WEBGL);
  myCanvas.parent('sketchContainer');
  myCanvas.addClass('sketch');

  theSurface = createGraphics(SURFACE_WIDTH, SURFACE_HEIGHT);
  textureMode(NORMAL);
  angleMode(DEGREES);
  ortho();

  theSurface.textSize(TEXT_HEIGHT);
  TEXT_WIDTH = theSurface.textWidth(TEXT);
}

function draw() {
  background(255);
  orbitControl();
  theSurface.background(0);

  var horizontalProgress = (frameCount % 200) / 200;

  let textPosX = map(horizontalProgress, 0, 1, -TEXT_WIDTH, SURFACE_WIDTH);
  if (horizontalProgress == 0) {
      textPosY = random(TEXT_HEIGHT / 2, SURFACE_HEIGHT + (TEXT_HEIGHT / 2));
  }


  theSurface.fill(255);
  theSurface.noStroke();
  theSurface.text(TEXT, textPosX, textPosY);
  
  push();
  translate(0, 0, -20);
  rotateX(-45);
  rotateY(-45);
  textured_scoop(theSurface, 150, 150, 150);
  pop();
}

function textured_scoop(tex, width, height, depth) {
    texture(tex);
    //normalMaterial();
    beginShape(TRIANGLES);
    let w = width / 2;
    let h = height / 2;
    let d = depth / 2;
    // face 1
    vertex(-w, -h, -d, 0, 0);
    vertex(w, -h, -d, 0.5, 0);
    vertex(w, -h, d, 0.5, 0.5);
    
    vertex(w, -h, d, 0.5, 0.5);
    vertex(-w, -h, d, 0, 0.5);
    vertex(-w, -h, -d, 0, 0);

    // face 2
    vertex(-w, -h, d, 0, 0.5);
    vertex(w, -h, d, 0.5, 0.5);
    vertex(-w, h, d, 0, 1.0);

    vertex(-w, h, d, 0, 1.0);
    vertex(w, -h, d, 0.5, 0.5);
    vertex(w, h, d, 1.0, 1.0);

    // face 3
    vertex(w, h, d, 1.0, 1.0);
    vertex(w, -h, d, 0.5, 0.5);
    vertex(w, h, -d, 1.0, 0);

    vertex(w, h, -d, 1.0, 0);
    vertex(w, -h, d, 0.5, 0.5);
    vertex(w, -h, -d, 0.5, 0);

    endShape();
  }