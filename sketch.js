let rows;
let cols;
let multiplier;
let point1;
let point2;
let angle;

function setup() {
  //frameRate(10);
  createCanvas(windowWidth, windowHeight);
  //noStroke();
  angle = PI/3;
  rows = 9;
  cols = 9;
  grid = 50;
}

function draw() {
  background(220);
  angle += 0.01;

  for(let row = 0; row < rows; row++ ) {
    for(let col = 0; col < cols; col++) {
      push();
      fill(100 + col * 10);
      rect(row * grid, col * grid, grid, grid);
      pop();
    }
  }

  //loadPixels();

  for(let row = 0; row < rows; row++ ) {
    for(let col = 0; col < cols; col++) {
      point1 = createVector(row * grid, col * grid);
      point1.add(grid / 2, grid / 2);
      point2 = point1.copy();

      point1.setMag(point1.mag() - grid / 4);
      point2.setMag(point2.mag() + grid / 4);

      push();
      strokeWeight(1);
      line(point1.x, point1.y, point2.x, point2.y);
      strokeWeight(8);
      point(point1.x, point1.y);
      strokeWeight(4);
      point(point2.x, point2.y);
      pop();
    }
  }

  console.log(map(128, 0, 255, -PI, PI));

  push();
  strokeWeight(20);
  let midpoint = createVector(250, 250);
  let start = createVector(1, 0);
  let end = createVector(1, 0);

  start.setMag(50);
  start.setHeading(angle);

  end.setMag(50);
  end.setHeading(angle + PI);

  start.add(midpoint);
  end.add(midpoint);

  point(midpoint.x, midpoint.y);
  point(start.x, start.y);
  point(end.x, end.y);

  strokeWeight(1);
  line(start.x, start.y, end.x, end.y)
  pop();

  //noLoop();
}
