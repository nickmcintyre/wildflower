import { scaleXContinuous, scaleYContinuous } from '../scale';

const drawXAxis = (props) => {
  const {
    pg,
    x,
    y,
    width,
    majorTicks,
    minorTicks,
    tickSize,
    axesColor,
  } = props;
  pg.push();
  pg.stroke(axesColor);
  pg.strokeWeight(1);
  pg.translate(x, y);
  pg.line(0, 0, width, 0);
  const { numXTicks, dx } = scaleXContinuous({
    width,
    majorTicks,
    minorTicks,
  });
  for (let i = 0; i <= numXTicks; i += 1) {
    const tickX = dx * (i + 1);
    let tickY;
    if (i % (minorTicks + 1) === 0) {
      tickY = 2 * tickSize;
    } else {
      tickY = tickSize;
    }
    pg.line(tickX, 0, tickX, tickY);
  }
  pg.pop();
};

const drawYAxis = (props) => {
  const {
    pg,
    x,
    y,
    height,
    majorTicks,
    minorTicks,
    tickSize,
    axesColor,
  } = props;
  pg.push();
  pg.stroke(axesColor);
  pg.strokeWeight(1);
  pg.translate(x, y);
  pg.line(0, 0, 0, -height);
  const { numYTicks, dy } = scaleYContinuous({
    height,
    majorTicks,
    minorTicks,
  });
  for (let i = 0; i <= numYTicks; i += 1) {
    const tickY = -dy * (i + 1);
    let tickX;
    if (i % (minorTicks + 1) === 0) {
      tickX = 2 * tickSize;
    } else {
      tickX = tickSize;
    }
    pg.line(-tickX, tickY, 0, tickY);
  }
  pg.pop();
};

export default (props) => {
  drawXAxis(props);
  drawYAxis(props);
};
