/// <reference path="../lib/p5.global-mode.d.ts" />

var USE_SVG = false;

function setup() {
  if (USE_SVG) {
    let myCanvas = createCanvas(600, 600, SVG);
  } else {
    let myCanvas = createCanvas(600, 600);
    myCanvas.parent('sketchContainer');
    myCanvas.addClass('sketch');
  }
  noFill();
}
  
function draw() {
  background(255);

  stroke(0, 0, 0, 120);
  for (let i = 0; i < 200; i++) {
      myCurve(300 + 2 * bezierPoint(0, -220, 80, 0, i * 0.005), 550 - 2 * i);
  }

  if (USE_SVG) {
    noLoop();
    save("test.svg");
  }
}
  
function myCurve(x, y) {
  bezier(x, y,
          x,y - 250,
          x + 180, y + 120,
          x + 200, y - 100);
}