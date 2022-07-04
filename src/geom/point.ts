import { SortedData } from '../data';
import { scaleXContinuous, scaleYContinuous } from '../scale';
import { Props } from '../utils';

export default (props: Props) => {
  const {
    pg,
    dataset,
    x,
    y,
    size,
    originX,
    originY,
    width,
    height,
    layersPalette,
  } = props;
  pg.push();
  pg.translate(originX, originY);
  const xTicks: number[] = scaleXContinuous(props);
  const yTicks: number[] = scaleYContinuous(props);
  const dx = xTicks[1] - xTicks[0];
  const dy = yTicks[1] - yTicks[0];
  pg.translate(dx, -dy);
  pg.noStroke();
  pg.fill(layersPalette[0]);
  const sorted: SortedData = dataset.get(x, y);
  const { data, xRange, yRange } = sorted;
  for (let i = 0; i < data.x.length; i += 1) {
    const tx = pg.map(data.x[i], xRange.min, xRange.max, 0, width - 2 * dx);
    const ty = -pg.map(data.y[i], yRange.min, yRange.max, 0, height - 2 * dy);
    pg.circle(tx, ty, size);
  }
  pg.pop();
};
