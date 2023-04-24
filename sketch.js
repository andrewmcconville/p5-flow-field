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
  edgePadding = 64;
  pathCount = 200;
  paths = [];

  // colPixels = windowWidth;
  // rowPixels = windowHeight;
  // cols = 64;
  // rows = 64;
  // colScale = colPixels / cols;
  // rowScale = rowPixels / rows;

  createCanvas(windowWidth, windowHeight);

  sampleImageCanvas = createGraphics(windowWidth, windowHeight);
  sampleImageCanvas.image(sampleImage, 0, 0, windowWidth, windowHeight);

  noFill();
  noStroke();
  stroke(200, 0, 0);

  for(let i = 0; i < pathCount; i++) {
    paths.push(
      new Path({
        startingPoint: createVector(random(edgePadding, windowWidth - edgePadding), random(edgePadding, windowHeight - edgePadding)),
        segmentCount: floor(random(5, 20)),
        magnitude: floor(random(8, 24)),
      })
    );
  }

  paths.forEach((path, index) => {
    if(path.segments.length < 5) {
      path.segments = [];
    }
  });

  //console.log(paths.length)

  for(let i = paths.length - 1; i > 0; i--) {
    if(paths[i].segments.length == 0) {
      paths.splice(i, 1);
    }
  }

  //console.log(paths.length)

  // let total = 0;
  // paths.forEach(path => {
  //   path.segments.forEach(segment => {
  //     total++;
  //   });
  // });
  // console.log(total);
}

function draw() {
  background(255);
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