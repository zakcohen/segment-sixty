/// <reference path="../lib/p5.global-mode.d.ts" />

var SHOULD_SAVE = false;

var DBG = false;
var FORCE_SQ = false;

var createMode = false;

var WIDTH = 512;
var HEIGHT = 512;
var CENTER_X = WIDTH / 2;
var CENTER_Y = HEIGHT / 2; 

var NUM_POINTS = 10;
var GRID_WIDTH = 10;
var GRID_HEIGHT = 10;

var DIRECTIONS = [
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1]
];

var verts = [];

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

  buildShape();
  smooth();
}

function buildShape() {

  if (FORCE_SQ) {
    verts = [
      [1,1],
      [5,1],
      [5,5],
      [1,5]
    ];
    return;
  }

  // Pick a start point
  verts[0] = [
    floor(random(GRID_WIDTH)), 
    floor(random(GRID_HEIGHT))
  ];

  // Pick some intermediate points
  for(var i = 1; i < NUM_POINTS - 1; i++) {
    var direction = random(DIRECTIONS);
    var prevPoint = verts[i - 1];

    var dist;
    for (dist = 1; dist < GRID_WIDTH; dist++) {
      var testPoint = [
        prevPoint[0] + direction[0] * dist,
        prevPoint[1] + direction[1] * dist
      ];
      if (testPoint[0] < 0
        || testPoint[0] > GRID_WIDTH
        || testPoint[1] < 0
        || testPoint[1] > GRID_HEIGHT) {
        dist--;
        break;
      }
    }


    var mag = floor(random(1, dist));
    verts[i] = [
      verts[i - 1][0] + direction[0] * mag,
      verts[i - 1][1] + direction[1] * mag
    ];
  }

  // Pick a good endpoint that can close the shape
  let shuffledDirs = shuffle(DIRECTIONS);
  var found = false;

  for(var dir = 0; dir < shuffledDirs.length; dir++) {
    var direction = shuffledDirs[dir];

    var mag = 0;
    while (!found && mag < 10) {
      var proposedX = verts[NUM_POINTS - 2][0] + direction[0] * mag;
      var proposedY = verts[NUM_POINTS - 2][1] + direction[1] * mag;

      if (canClose(proposedX, proposedY)) {
        verts[NUM_POINTS - 1] = [proposedX, proposedY];
        found = true;
        console.log("found one " + verts.length);
      }
      mag++;
    }
  }

  if (!found) {
    console.log("Didn't find a good closer");
  }
}

function canClose(pointX, pointY) {
  if (pointX < 0 || pointX > GRID_WIDTH || pointY < 0 || pointY > GRID_HEIGHT) {
    return false;
  }

  var pToStartX = verts[0][0] - pointX;
  var pToStartY = verts[0][1] - pointY;

  var isClosing = pToStartX == 0 || pToStartY == 0 || abs(pToStartX) == abs(pToStartY);
  console.log(pToStartX + " " + pToStartY + " canClose:" + isClosing);

  return isClosing;
}

function draw() {
  background(255);

  if (verts.length >= 2) {
    fill(50);
    noStroke();
    drawRoundedPath();
  } 

  if (createMode) {
    fill(50, 5, 100);
    var snappedMouse = gridToScreen(...screenToGrid(mouseX, mouseY));
    console.log(snappedMouse);
    circle(...snappedMouse, 20);
  }

  if (SHOULD_SAVE) {
    save("aphex-jones-" + Date.now() + ".svg");

    SHOULD_SAVE = false;
    window.location.reload(false);
  }
}

function keyPressed() {
  // "s"
  if (keyCode == 83) {
    SHOULD_SAVE = true;
    createMode = false;
    setCanvas();
    return;
  }

  // "c"
  if (keyCode == 67) {
    createMode = true;
    verts = [];
    return;
  }
}

function mouseClicked() {
  if (createMode) {
    verts[verts.length] = screenToGrid(mouseX, mouseY);
  } else {
    buildShape();
  }
}

// Path rounding
function computeStep(x1, y1, x2, y2, radius) {
  let pointDistance = dist(x1, y1, x2, y2);

  var stepX = x2 - x1;
  var stepY = y2 - y1;

  var drawSegment;
  if (pointDistance <= radius * 2) {
    stepX *= 0.5;
    stepY *= 0.5;
    drawSegment = false;
  } else {
    stepX *= radius / pointDistance;
    stepY *= radius / pointDistance;
    drawSegment = true;
  }

  return [drawSegment, stepX, stepY];
}

function screenToGrid(x, y) {
  return [
    floor(map(x, 0, WIDTH, 0, GRID_WIDTH)),
    floor(map(y, 0, HEIGHT, 0, GRID_HEIGHT))
  ];
}

function gridToScreen(x, y) {
  return [
    map(x, 0, GRID_WIDTH, 0, WIDTH),
    map(y, 0, GRID_HEIGHT, 0, HEIGHT)
   ];
}

function drawRoundedPath() {
  const scaledVerts = verts.map(x => gridToScreen(x[0], x[1]));

  stroke(50);
  strokeWeight(1);
  beginShape();

  let radius = 20;
  

  var firstStep;
  for (var i = 0; i < scaledVerts.length; i++) {
    var startPoint = scaledVerts[i % scaledVerts.length];
    var endPoint = scaledVerts[(i + 1) % scaledVerts.length];

    var [drawSegment, stepX, stepY] = computeStep(
      startPoint[0], startPoint[1], endPoint[0], endPoint[1], radius);

    if (i == 0) {
      vertex(startPoint[0] + stepX, startPoint[1] + stepY);
      firstStep = [stepX, stepY];
    } else {
      quadraticVertex(startPoint[0], startPoint[1], startPoint[0] + stepX, startPoint[1] + stepY);
    }

    if (drawSegment) {
      vertex(endPoint[0] - stepX, endPoint[1] - stepY);
    }

    if (i == scaledVerts.length - 1) {
      quadraticVertex(scaledVerts[0][0], scaledVerts[0][1], scaledVerts[0][0] + firstStep[0], scaledVerts[0][1] + firstStep[1]);
    }
  }
  endShape();

  if (DBG) {
    fill(255, 0, 0);
    stroke(255, 0, 255);
    scaledVerts.forEach(function(value, i) {
      text(i,value[0], value[1]);
      point(value[0], value[1]);
    });
  }
}