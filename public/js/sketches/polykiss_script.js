/// <reference path="../lib/p5.global-mode.d.ts" />

var USE_SVG = false;

var WIDTH = 600;
var HEIGHT = 600;
var CENTER_X = WIDTH / 2;
var CENTER_Y = HEIGHT / 2; 

var CIRCLE_RADIUS = WIDTH / 4;
var VERTICAL_LINES = 60;
var SEGMENTS = 30;


function setup() {
  if (USE_SVG) {
    let myCanvas = createCanvas(WIDTH, HEIGHT, SVG);
  } else {
    let myCanvas = createCanvas(WIDTH, HEIGHT);
    myCanvas.parent('sketchContainer');
    myCanvas.addClass('sketch');
  }
  noFill();
}

function draw() {
  background(255);
  strokeWeight(0.3);
  stroke(0);

  let progress = map(sin(millis() * 0.001), -1, 1, 0, 1);
  let startSize = lerp(3, 100, progress);
  let lineCount = lerp(400, 50, progress);

  noFill();
  for (var i = 3; i < lineCount; i++) {
    polygon(CENTER_X - radiusForPoints(startSize, i), CENTER_Y, startSize, i);
  }

  fill(0);
  rect(CENTER_X, 0, CENTER_X, HEIGHT);

  noFill();
  stroke(255);

  push();
  translate(CENTER_X, CENTER_Y);
  rotate(PI);
  translate(-CENTER_X, -CENTER_Y);
  for (var i = 3; i < lineCount; i++) {
    polygon(CENTER_X - radiusForPoints(startSize, i), CENTER_Y, startSize, i);
  }
  pop();

  if (USE_SVG) {
    noLoop();
    save("polykiss.svg");
  }
}

function polygon(x, y, sideLength, npoints) {
  let angle = TWO_PI / npoints;
  let radius = radiusForPoints(sideLength, npoints);
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function radiusForPoints(sideLength, npoints) {
  return sideLength / (2.0 * sin(PI / npoints));
}