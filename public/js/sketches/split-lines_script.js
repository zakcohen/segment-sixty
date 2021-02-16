/// <reference path="../lib/p5.global-mode.d.ts" />

var USE_SVG = true;

var WIDTH = 512;
var HEIGHT = 512;
var CENTER_X = WIDTH / 2;
var CENTER_Y = HEIGHT / 2; 

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
  strokeWeight(1);
  stroke(0);

  let LINES = 9;
  let LINE_HEIGHT = HEIGHT / LINES;

  for(var j = 0; j < LINES; j++) {
    let gap = 2 ** j;
    for (var i = 0; i < WIDTH; i += (2 * gap)) {
        for (var b = 0; b < gap; b++) {
          line(i + b, j  * LINE_HEIGHT, i + b, (j + 1) * LINE_HEIGHT);
        }
    }
  }

//rect(0, 0, WIDTH, HEIGHT);

  if (USE_SVG) {
    noLoop();
    save("split-lines.svg");
  }
}