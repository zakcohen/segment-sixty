function setup() {
    createCanvas(600, 600);
    noFill();
  }
  
function draw() {
background(255);

stroke(0, 0, 0, 120);
for (let i = 0; i < 200; i++) {
    myCurve(300 + 2 * bezierPoint(0, -220, 80, 0, i * 0.005), 550 - 2 * i);
}
}
  
function myCurve(x, y) {
bezier(x, y,
        x,y - 250,
        x + 180, y + 120,
        x + 200, y - 100);
}