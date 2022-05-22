// eslint-disable-next-line import/no-extraneous-dependencies
import * as p5 from 'p5';

const { CENTER, ITALIC, PI } = p5.prototype;

const drawTitle = (props) => {
  const {
    pg,
    padding,
    name,
    color,
  } = props;
  pg.push();
  pg.fill(color);
  pg.noStroke();
  pg.translate(padding, padding - pg.textSize());
  pg.text(name, 0, 0);
  pg.pop();
};

const drawXLabel = (props) => {
  const {
    pg,
    ox,
    oy,
    width,
    name,
    color,
  } = props;
  pg.push();
  pg.fill(color);
  pg.noStroke();
  pg.translate(ox + width / 2, oy + 2.5 * pg.textSize());
  pg.textAlign(CENTER, CENTER);
  pg.textStyle(ITALIC);
  pg.text(name, 0, 0);
  pg.pop();
};

const drawYLabel = (props) => {
  const {
    pg,
    ox,
    oy,
    height,
    name,
    color,
  } = props;
  pg.push();
  pg.fill(color);
  pg.noStroke();
  pg.translate(ox - 2.5 * pg.textSize(), oy - height / 2);
  pg.rotate(1.5 * PI);
  pg.textAlign(CENTER, CENTER);
  pg.textStyle(ITALIC);
  pg.text(name, 0, 0);
  pg.pop();
};

export {
  drawTitle,
  drawXLabel,
  drawYLabel,
};
