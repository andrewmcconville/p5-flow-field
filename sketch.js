let rows;
let cols;
let grid;
let color;
let midPoint;
let endPoint;

function setup() {
  rows = 32;
  cols = 18;
  grid = 30;
  createCanvas(cols * grid, rows * grid);
  noStroke();
  pixelDensity(4);
}

function draw() {
  background(220);

  for(let row = 0; row < rows; row++ ) {
    for(let col = 0; col < cols; col++) {
      push();
      fill(0 + row * 8);
      rect(col * grid, row * grid, grid, grid);
      pop();
    }
  }

  for(let row = 0; row < rows; row++ ) {
    for(let col = 0; col < cols; col++) {
      color = get(col * grid + 2, row * grid + 2);
      color = map(color[0], 0, 255, -PI, PI);

      midPoint = createVector(col * grid, row * grid);
      midPoint.add(grid / 2, grid / 2);
      endPoint = createVector(0, 1);
      endPoint.setMag(12);
      endPoint.setHeading(color);
      endPoint.add(midPoint);

      push();
      stroke(0);
      strokeWeight(1);
      line(midPoint.x, midPoint.y, endPoint.x, endPoint.y);
      strokeWeight(6);
      point(midPoint.x, midPoint.y);
      strokeWeight(3);
      point(endPoint.x, endPoint.y);
      pop();
    }
  }

  //noLoop();
}
