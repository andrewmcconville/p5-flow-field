let cols;
let rows;
let sampleImage;
let sampleImageCanvas;
let edgePadding;
let pathCount;
let paths;

function preload() {
  sampleImage = loadImage('sampleImage.png');
}

function setup() {
  overScan = 200;
  pathCount = 200;
  paths = [];

  colPixels = windowWidth;
  rowPixels = windowHeight;
  cols = 32;
  rows = 32;
  colScale = colPixels / cols;
  rowScale = rowPixels / rows;

  createCanvas(windowWidth, windowHeight);

  sampleImageCanvas = createGraphics(windowWidth + overScan * 2, windowHeight + overScan * 2);
  sampleImageCanvas.image(sampleImage, 0, 0, windowWidth + overScan * 2, windowHeight + overScan * 2);

  noFill();
  noStroke();
  stroke(200, 0, 0);

  for(let i = 0; i < pathCount; i++) {
    paths.push(
      new Path({
        startingPoint: createVector(random(0, windowWidth), random(0, windowHeight)),
        segmentCount: floor(random(7, 40)),
        magnitude: floor(random(8, 24)),
      })
    );
  }

  // for(let row = 0; row < rows; row++ ) {
  //   for(let col = 0; col < cols; col++) {
  //     paths.push(
  //       new Path({
  //         startingPoint: createVector(col * colScale, row * rowScale),
  //         segmentCount: 30,
  //         magnitude: 10,
  //       })
  //     );
  //   }
  // }

  // let total = 0;
  // paths.forEach(path => {
  //   path.segments.forEach(segment => {
  //     total++;
  //   });
  // });
  // console.log(total);
}

function draw() {
  //background(255);
  //image(sampleImage, 0, 0, colPixels, rowPixels);
  //drawGrid();
  //drawGridHeadings();

  paths.forEach(path => {
    path.draw();
  });

  noLoop();
}

function drawGrid() {
  for(let row = 0; row < rows; row++ ) {
    for(let col = 0; col < cols; col++) {
      push();
      fill(0 + row * (rowScale / (rowPixels / 256)));
      rect(col * colScale, row * rowScale, colScale + 1, rowScale + 1);
      pop();
    }
  }
}

function drawGridHeadings() {
  let color;
  let midPoint;
  let endPoint;
  let magnitude = 8;

  for(let row = 0; row < rows; row++ ) {
    for(let col = 0; col < cols; col++) {
      color = sampleImageCanvas.get(col * colScale + 2, row * rowScale + 2);
      color = map(color[0], 0, 255, -PI, PI);

      midPoint = createVector(col * colScale, row * rowScale);
      midPoint.add(colScale / 2, rowScale / 2);

      endPoint = createVector(0, 1);
      endPoint.setMag(magnitude);
      endPoint.setHeading(color);
      endPoint.add(midPoint);

      push();
      stroke(0);
      strokeWeight(4);
      point(midPoint.x, midPoint.y);
      strokeWeight(2);
      point(endPoint.x, endPoint.y);
      strokeWeight(1);
      line(midPoint.x, midPoint.y, endPoint.x, endPoint.y);
      pop();
    }
  }
}