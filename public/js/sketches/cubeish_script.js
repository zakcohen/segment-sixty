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

let textMode = true;

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
  background(0);
  theSurface.blendMode(BLEND);
  theSurface.background(0);

  var progress = (frameCount % 200) / 200;

  if (textMode) {
    let textPosX = map(progress, 0, 1, -TEXT_WIDTH, SURFACE_WIDTH);
    if (progress == 0) {
        textPosY = random(TEXT_HEIGHT / 2, SURFACE_HEIGHT + (TEXT_HEIGHT / 2));
    }
    theSurface.fill(255);
    theSurface.noStroke();
    theSurface.text(TEXT, textPosX, textPosY);
  } else {
    theSurface.blendMode(ADD);
    theSurface.noFill();
    theSurface.strokeWeight(
        map(pSin(frameCount), 0, 1, 0, 20));
    theSurface.stroke(255, 0, 0);
    theSurface.circle(
          SURFACE_WIDTH / 2, SURFACE_HEIGHT / 2,
          pSin(frameCount) * (SURFACE_WIDTH - 20)
    );
    theSurface.stroke(0, 255, 0);
    theSurface.circle(
        SURFACE_WIDTH / 2, SURFACE_HEIGHT / 2,
        pSin(frameCount + 1) * (SURFACE_WIDTH - 20)
    );
    theSurface.stroke(0, 0, 255);
    theSurface.circle(
        SURFACE_WIDTH / 2, SURFACE_HEIGHT / 2,
        pSin(frameCount + 2) * (SURFACE_WIDTH - 20)
    );

    theSurface.stroke(255, 0, 0);
    theSurface.circle(
          SURFACE_WIDTH / 2, SURFACE_HEIGHT / 2,
          pSin(frameCount + 20) * (SURFACE_WIDTH - 20)
    );
    theSurface.stroke(0, 255, 0);
    theSurface.circle(
        SURFACE_WIDTH / 2, SURFACE_HEIGHT / 2,
        pSin(frameCount + 21) * (SURFACE_WIDTH - 20)
    );
    theSurface.stroke(0, 0, 255);
    theSurface.circle(
        SURFACE_WIDTH / 2, SURFACE_HEIGHT / 2,
        pSin(frameCount + 22) * (SURFACE_WIDTH - 20)
    );

    theSurface.stroke(255, 0, 0);
    theSurface.circle(
          SURFACE_WIDTH / 2, SURFACE_HEIGHT / 2,
          pSin(frameCount + 40) * (SURFACE_WIDTH - 20)
    );
    theSurface.stroke(0, 255, 0);
    theSurface.circle(
        SURFACE_WIDTH / 2, SURFACE_HEIGHT / 2,
        pSin(frameCount + 41) * (SURFACE_WIDTH - 20)
    );
    theSurface.stroke(0, 0, 255);
    theSurface.circle(
        SURFACE_WIDTH / 2, SURFACE_HEIGHT / 2,
        pSin(frameCount + 42) * (SURFACE_WIDTH - 20)
    );

    theSurface.stroke(255, 0, 0);
    theSurface.circle(
          SURFACE_WIDTH / 2, SURFACE_HEIGHT / 2,
          pSin(frameCount + 70) * (SURFACE_WIDTH - 20)
    );
    theSurface.stroke(0, 255, 0);
    theSurface.circle(
        SURFACE_WIDTH / 2, SURFACE_HEIGHT / 2,
        pSin(frameCount + 71) * (SURFACE_WIDTH - 20)
    );
    theSurface.stroke(0, 0, 255);
    theSurface.circle(
        SURFACE_WIDTH / 2, SURFACE_HEIGHT / 2,
        pSin(frameCount + 72) * (SURFACE_WIDTH - 20)
    );

    //   theSurface.stroke(128);
    //   theSurface.circle(
    //     SURFACE_WIDTH / 2, SURFACE_HEIGHT / 2,
    //     pCos(frameCount) * SURFACE_WIDTH * sqrt(2)
    //   );

      //theSurface.circle(
      //    SURFACE_WIDTH / 2, SURFACE_HEIGHT / 2,
      //    map(progress, 0, 1, 0, SURFACE_WIDTH * sqrt(2))
      //);
  }
  
  push();
  translate(0, 0, -20);
  rotateX(-45);
  rotateY(-45);
  textured_scoop(theSurface, 150, 150, 150);
  pop();
}

function pSin(angle) {
    return (sin(angle) + 1.0) / 2.0;
}

function pCos(angle) {
    return (cos(angle) + 1.0) / 2.0;
}

function mouseClicked() {
    if (textMode) textMode = false;
    else textMode = true;
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