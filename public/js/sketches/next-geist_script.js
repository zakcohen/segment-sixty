/// <reference path="../lib/p5.global-mode.d.ts" />

var SHOULD_SAVE = false;

var DBG = false;

var loopy = false;

var createMode = false;

var WIDTH = 512;
var HEIGHT = 512;
var CENTER_X = WIDTH / 2;
var CENTER_Y = HEIGHT / 2; 

var noiseOff = 0;

function setCanvas() {
  if (SHOULD_SAVE) {
    let myCanvas = createCanvas(WIDTH, HEIGHT, SVG);
  } else {
    let myCanvas = createCanvas(WIDTH, HEIGHT);
    myCanvas.parent('sketchContainer');
    myCanvas.addClass('sketch');
  }
}

function setup() {
  setCanvas();
  smooth();
  noLoop();
}

function draw() {
  background(255);

  strokeWeight(4);
  stroke(33, 112, 238);
  noFill();

  var normalSize = 24;

  for (var i = 1; i < 20; i++) {
    for (var j = 1; j < 20; j++) {
      rect(
        i * normalSize * 2 + scaleNoise(noiseOff, i, -1, 1),
        j * normalSize * 2 + scaleNoise(noiseOff, j, -1, 1),
        normalSize + scaleNoise(noiseOff, i + j, 0, 4),
        normalSize + scaleNoise(noiseOff, i * j, 0, 2),
        normalSize / 2);
    }
  }
  noiseOff += 0.01;

  if (SHOULD_SAVE) {
    save("next-geist-" + Date.now() + ".svg");

    SHOULD_SAVE = false;
    window.location.reload(false);
  }
}

function scaleNoise(n1, n2, start, end) {
  return map(noise(n1, n2), 0, 1, start, end);
}

function toggleLoop() {
  if (loopy) {
    noLoop();
    loopy = false;
  } else {
    loop();
    loopy = true;
  }
}

function keyPressed() {
  toggleLoop();
}

function mouseClicked() {
  toggleLoop();
}