import { scaleXContinuous, scaleYContinuous } from '../scale';

export default (props) => {
  const {
    pg,
    x,
    y,
    size,
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
    pg.noStroke();
    pg.fill(color);
    for (let i = 0; i < n; i += 1) {
      const tx = pg.map(x[i], xRange.min, xRange.max, 0, width - 2 * dx);
      const ty = -pg.map(y[i], yRange.min, yRange.max, 0, height - 2 * dy);
      pg.circle(tx, ty, size);
    }
    pg.pop();
  } else {
    throw new Error('x and y dimensions must match');
  }
};
