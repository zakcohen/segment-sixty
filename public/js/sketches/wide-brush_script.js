/// <reference path="../lib/p5.global-mode.d.ts" />

var USE_SVG = false;

var WIDTH = 600;
var HEIGHT = 600;

var BRUSH_WIDTH = 130;
var BRUSH_GAP = 4;

function setup() {
  if (USE_SVG) {
    let myCanvas = createCanvas(WIDTH, HEIGHT, SVG);
  } else {
    let myCanvas = createCanvas(WIDTH, HEIGHT);
    myCanvas.parent('sketchContainer');
    myCanvas.addClass('sketch');
  }
  noFill();
  stroke(0, 0, 0, 125);
  noSmooth();
}
  
function draw() {
  background(255);

  wideLine(0, BRUSH_WIDTH, WIDTH, BRUSH_WIDTH);
  wideLine(WIDTH, 0, 0, HEIGHT);
  wideLine(0, HEIGHT - BRUSH_WIDTH, WIDTH, HEIGHT - BRUSH_WIDTH);

  


  if (USE_SVG) {
    noLoop();
    save("wide-brush.svg");
  }
}
  
function wideLine(x1, y1, x2, y2) {
  let stepX = (x2 - x1) / dist(x1, y1, x2, y2);
  let stepY = (y2 - y1) / dist(x1, y1, x2, y2);

  let perpX = -stepY * BRUSH_WIDTH;
  let perpY = stepX * BRUSH_WIDTH;

  let steps = dist(x1, y1, x2, y2) / BRUSH_GAP;
  for (var i = 0; i < steps; i++) {
    let midPointX = x1 + stepX * i * BRUSH_GAP;
    let midPointY = y1 + stepY * i * BRUSH_GAP;

    line(
      midPointX - perpX + noise(midPointX, -perpX) * BRUSH_GAP,
      midPointY - perpY + noise(midPointY, -perpY) * BRUSH_GAP,
      midPointX + perpX + noise(midPointX, perpX) * BRUSH_GAP,
      midPointY + perpY + noise(midPointY, perpY) * BRUSH_GAP);
  }
}
