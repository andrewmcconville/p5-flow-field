class Path {
  constructor(config) {
    this.segmentCount = config.segmentCount;
    this.startingPoint = config.startingPoint;
    this.magnitude = config.magnitude;
    this.segments = [];

    this.setup();
  }

  setup() {
    this.segments.push(
      new Segment({
        start: this.startingPoint,
        magnitude: this.magnitude,
      })
    );

    for (let i = 1; i < this.segmentCount; i++) {
      this.segments.push(
        new Segment({
          start: createVector(this.segments[i - 1].end.x, this.segments[i - 1].end.y),
          magnitude: this.magnitude,
        })
      );

      if (
        this.segments[i].end.x < 0 || this.segments[i].end.x > windowWidth ||
        this.segments[i].end.y < 0 || this.segments[i].end.y > windowHeight
      ) {
        //console.log('segment off canvas');
        this.segmentCount = i + 1;
      }
    }
  }

  draw() {
    strokeWeight(1);
    beginShape();
    //curveVertex(this.segments[0].start.x, this.segments[0].start.y);
    this.segments.forEach(segment => {
      curveVertex(segment.start.x, segment.start.y);
    });
    //curveVertex(this.segments[this.segments.length - 1].start.x, this.segments[this.segments.length - 1].start.y);
    endShape();

    this.segments.forEach((segment, index) => {
      if (index == 0 || index == this.segments.length - 1) {
        //console.log(index)
      } else {
        segment.draw();
      }
    });
  }
}