/// <reference path="../lib/p5.global-mode.d.ts" />

var USE_SVG = false;

var WIDTH = 600;
var HEIGHT = 600;
var CENTER_X = WIDTH / 2;
var CENTER_Y = HEIGHT / 2; 

var CIRCLE_RADIUS = WIDTH / 4;
var VERTICAL_LINES = 60;
var SEGMENTS = 30;

var verticalLines = [];

function setup() {
  if (USE_SVG) {
    let myCanvas = createCanvas(WIDTH, HEIGHT, SVG);
  } else {
    let myCanvas = createCanvas(WIDTH, HEIGHT);
    myCanvas.parent('sketchContainer');
    myCanvas.addClass('sketch');
  }
  noFill();
  ellipseMode(RADIUS);

  for(var i = 0; i < VERTICAL_LINES; i++) {
    var lineX = -CIRCLE_RADIUS +
        i * ((2 * CIRCLE_RADIUS) / (VERTICAL_LINES - 1));
    var startY = -sqrt(sq(CIRCLE_RADIUS) - sq(lineX));
    var endY = -startY;
    
    var lineLength = abs(endY - startY);
    var segmentLength = lineLength / (2 * SEGMENTS - 1);
    
    verticalLines[i] = {x:lineX, ys:[]};
    
    for (var j = 0; j < SEGMENTS; j++) {
       verticalLines[i].ys[j] = {
         start: startY + (j * 2 * segmentLength),
         end: startY + (j * 2 + 1) * segmentLength};
    }
  }
}

function draw() {
  background(255);
  strokeWeight(1);
  stroke(0);

  translate(CENTER_X, CENTER_Y);
  circle(0, 0, CIRCLE_RADIUS);
  for (var i = 0; i < VERTICAL_LINES; i++) {
    var x = verticalLines[i].x;
    for (var j = 0; j < SEGMENTS; j++) {
      line(
        x,
        verticalLines[i].ys[j].start,
        x,
        verticalLines[i].ys[j].end);
    }
  }

  if (USE_SVG) {
    noLoop();
    save("circle-ticks.svg");
  }
}