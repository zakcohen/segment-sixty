/// <reference path="../lib/p5.global-mode.d.ts" />

var USE_SVG = false;

var WIDTH = 512;
var HEIGHT = 512;
var CENTER_X = WIDTH / 2;
var CENTER_Y = HEIGHT / 2; 

var COUNT = 160;
var TEXT_SIZE = 50;
var PADDING = 10;

var t = 0;

function setup() {
  if (USE_SVG) {
    let myCanvas = createCanvas(WIDTH, HEIGHT, SVG);
  } else {
    let myCanvas = createCanvas(WIDTH, HEIGHT);
    myCanvas.parent('sketchContainer');
    myCanvas.addClass('sketch');
  }


  textAlign(CENTER, CENTER);
  textSize(TEXT_SIZE);
}

function drawNums(x, y) {
  text("0 1 2 3 4 5 6 7 8 9", CENTER_X + x, CENTER_Y + y);
}

function draw() {
  //noLoop();
  blendMode(BLEND);
  background(0);

  blendMode(ADD);

  t += 0.001;

  var offset = t;
  var offset2 = t;
  for(var j = 0; j < COUNT; j++) {
    fill(10, 1, 1);
    drawNums(0, j);
    drawNums(0, -j)

    offset += 0.01;
    offset2 += 0.002;

    fill(1, 8, 1);
    drawNums(map(noise(offset + 0.001), 0, 1.0, -j, j), j);
    drawNums(map(noise(offset2 - 0.001), 0, 1.0, -j, j), -j);
    
    fill(1, 1, 4);
    drawNums(map(noise(offset2 + 0.001), 0, 1.0, -j, j), j);
    drawNums(map(noise(offset - 0.001), 0, 1.0, -j, j), -j);

  }

  if (USE_SVG) {
    noLoop();
    save("gen-10.svg");
  }
}