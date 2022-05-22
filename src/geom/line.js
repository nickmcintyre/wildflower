import { scaleXContinuous, scaleYContinuous } from '../scale';

export default (props) => {
  const {
    pg,
    x,
    y,
    color,
    ox,
    oy,
    width,
    height,
    majorTicks,
    minorTicks,
    xRange,
    yRange,
  } = props;
  if (
    x instanceof Array
    && y instanceof Array
    && x.length === y.length
  ) {
    pg.push();
    pg.translate(ox, oy);
    const n = x.length;
    const { dx } = scaleXContinuous({
      width,
      majorTicks,
      minorTicks,
    });
    const { dy } = scaleYContinuous({
      height,
      majorTicks,
      minorTicks,
    });
    pg.translate(dx, -dy);
    pg.stroke(color);
    for (let i = 0; i < n - 1; i += 1) {
      const x1 = pg.map(x[i], xRange.min, xRange.max, 0, width - 2 * dx);
      const y1 = -pg.map(y[i], yRange.min, yRange.max, 0, height - 2 * dy);
      const x2 = pg.map(x[i + 1], xRange.min, xRange.max, 0, width - 2 * dx);
      const y2 = -pg.map(y[i + 1], yRange.min, yRange.max, 0, height - 2 * dy);
      pg.line(x1, y1, x2, y2);
    }
    pg.pop();
  } else {
    throw new Error('x and y dimensions must match');
  }
};
