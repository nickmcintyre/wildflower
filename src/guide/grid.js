import { scaleXContinuous, scaleYContinuous } from '../scale';

const drawXGrid = (props) => {
  const {
    pg,
    x,
    y,
    width,
    height,
    majorTicks,
    minorTicks,
    gridColor,
  } = props;
  pg.push();
  pg.stroke(gridColor);
  pg.strokeWeight(1);
  pg.translate(x, y);
  const { numXTicks, dx } = scaleXContinuous({
    width,
    majorTicks,
    minorTicks,
  });
  for (let i = 0; i <= numXTicks; i += 1) {
    const tickX = dx * (i + 1);
    if (i % (minorTicks + 1) === 0) {
      pg.line(tickX, -1, tickX, -height);
    }
  }
  pg.pop();
};

const drawYGrid = (props) => {
  const {
    pg,
    x,
    y,
    width,
    height,
    majorTicks,
    minorTicks,
    gridColor,
  } = props;
  pg.push();
  pg.stroke(gridColor);
  pg.strokeWeight(1);
  pg.translate(x, y);
  const { numYTicks, dy } = scaleYContinuous({
    height,
    majorTicks,
    minorTicks,
  });
  for (let i = 0; i <= numYTicks; i += 1) {
    const tickY = -dy * (i + 1);
    if (i % (minorTicks + 1) === 0) {
      pg.line(1, tickY, width, tickY);
    }
  }
  pg.pop();
};

export default (props) => {
  drawXGrid(props);
  drawYGrid(props);
};
